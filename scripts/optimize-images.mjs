#!/usr/bin/env node
/**
 * Compress and resize the photos in public/.
 *
 * The originals were straight off phones and cameras — 83 MB in total, with
 * single files over 13 MB, all of it downloaded by every visitor. On the
 * mobile connections most of our audience uses, that was the site's worst
 * performance problem.
 *
 * Rewrites files IN PLACE, preserving filenames so no markup or database
 * row needs to change. Run it again after adding new photos; already-small
 * files are skipped.
 *
 * Usage:
 *   node scripts/optimize-images.mjs --dry-run   report what would change
 *   node scripts/optimize-images.mjs             rewrite public/ in place
 */

import sharp from 'sharp';
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

/**
 * The largest any image renders on this site is a full-width hero; 1600px
 * covers that on a retina display with room to spare. Team portraits render
 * at roughly 320px, event cards at 400px.
 */
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 85;
/** Files at or below this are already fine; recompressing only loses quality. */
const SKIP_UNDER_BYTES = 120 * 1024;

const DRY_RUN = process.argv.includes('--dry-run');

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);

async function optimize(file) {
  const path = join(PUBLIC_DIR, file);
  const before = statSync(path).size;
  const ext = extname(file).toLowerCase();

  if (before <= SKIP_UNDER_BYTES) return { file, before, after: before, skipped: true };

  // Read into a buffer first. On Windows sharp keeps the source file open
  // lazily, and writing back to the same path then fails with EUNKNOWN.
  const input = readFileSync(path);
  const image = sharp(input, { failOn: 'none' });
  const meta = await image.metadata();

  let pipeline = image.rotate(); // honour EXIF orientation before stripping it
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  pipeline =
    ext === '.png'
      ? pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 })
      : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });

  const output = await pipeline.toBuffer();

  // Never make a file bigger than it started.
  if (output.length >= before) return { file, before, after: before, skipped: true };

  if (!DRY_RUN) writeFileSync(path, output);
  return { file, before, after: output.length, skipped: false };
}

async function main() {
  const files = readdirSync(PUBLIC_DIR).filter((f) =>
    ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase()),
  );

  console.log(`${files.length} images in public/${DRY_RUN ? ' (dry run)' : ''}\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  const changed = [];

  for (const file of files) {
    try {
      const result = await optimize(file);
      totalBefore += result.before;
      totalAfter += result.after;
      if (!result.skipped) changed.push(result);
    } catch (err) {
      console.error(`  ! ${file}: ${err.message}`);
    }
  }

  changed.sort((a, b) => b.before - a.before);
  for (const { file, before, after } of changed) {
    const saved = Math.round((1 - after / before) * 100);
    console.log(`  ${file.padEnd(34)} ${mb(before).padStart(7)} MB -> ${mb(after).padStart(6)} MB  (-${saved}%)`);
  }

  console.log(
    `\nTotal: ${mb(totalBefore)} MB -> ${mb(totalAfter)} MB ` +
      `(saved ${mb(totalBefore - totalAfter)} MB, ${Math.round((1 - totalAfter / totalBefore) * 100)}%)`,
  );
  if (DRY_RUN) console.log('Dry run: nothing written.');
}

main().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});
