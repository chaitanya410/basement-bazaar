import React, { useMemo } from 'react';
import { Trophy, Medal, Award, Star, Loader2, Hourglass } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSportifyWinners } from '@/hooks/useContent';
import { POSITION_LABELS } from '@/data/sportifyWinners';
import { resolveImageUrl } from '@/lib/supabase';
import type { SportifyWinner, WinnerPosition } from '@/types/database';

const POSITION_ICON: Record<WinnerPosition, React.ElementType> = {
  winner: Trophy,
  runner_up: Medal,
  third: Award,
  special: Star,
};

const POSITION_STYLE: Record<WinnerPosition, string> = {
  winner: 'from-amber-400 to-yellow-600 text-amber-300 border-amber-500/30',
  runner_up: 'from-slate-300 to-slate-500 text-slate-300 border-slate-400/30',
  third: 'from-orange-400 to-orange-700 text-orange-300 border-orange-500/30',
  special: 'from-lime-400 to-emerald-600 text-lime-300 border-lime-500/30',
};

const ORDER: WinnerPosition[] = ['winner', 'runner_up', 'third', 'special'];

const WinnerCard: React.FC<{ winner: SportifyWinner }> = ({ winner }) => {
  const Icon = POSITION_ICON[winner.position];
  const style = POSITION_STYLE[winner.position];

  return (
    <div
      className={`group relative rounded-2xl bg-white/[0.03] border ${style.split(' ').pop()} backdrop-blur-xl p-6 hover:bg-white/[0.06] transition-all duration-300`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${style} bg-opacity-20 shrink-0`}>
          <Icon className="w-6 h-6 text-gray-950" />
        </div>

        <div className="min-w-0 flex-1">
          <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${style.split(' ')[2]}`}>
            {POSITION_LABELS[winner.position]}
          </p>
          <h3 className="text-xl font-bold text-white truncate">
            {winner.team_name || winner.award_title || winner.sport}
          </h3>
          {winner.player_names && (
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{winner.player_names}</p>
          )}
          {winner.notes && <p className="text-xs text-gray-600 mt-2">{winner.notes}</p>}
        </div>
      </div>

      {winner.image_path && (
        <img
          src={resolveImageUrl(winner.image_path)}
          alt={winner.team_name ?? winner.sport}
          loading="lazy"
          className="mt-5 w-full h-44 object-cover rounded-xl border border-white/10"
        />
      )}
    </div>
  );
};

const SportifyWinners: React.FC = () => {
  const { data, isLoading } = useSportifyWinners();

  /** Group by edition year, then by sport, each in podium order. */
  const grouped = useMemo(() => {
    const byYear = new Map<number, Map<string, SportifyWinner[]>>();

    for (const w of data ?? []) {
      if (!byYear.has(w.edition_year)) byYear.set(w.edition_year, new Map());
      const bySport = byYear.get(w.edition_year)!;
      if (!bySport.has(w.sport)) bySport.set(w.sport, []);
      bySport.get(w.sport)!.push(w);
    }

    for (const bySport of byYear.values()) {
      for (const list of bySport.values()) {
        list.sort(
          (a, b) =>
            ORDER.indexOf(a.position) - ORDER.indexOf(b.position) ||
            a.display_order - b.display_order,
        );
      }
    }

    return [...byYear.entries()].sort((a, b) => b[0] - a[0]);
  }, [data]);

  return (
    <section className="min-h-screen bg-[#050505] py-20 relative overflow-hidden font-sans">
      <Navbar />

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="mb-16 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-gray-300 uppercase tracking-widest">
              Hall of Fame
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Sportify{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-500">
              Winners
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Champions of Clash of the Champions — the squads and players who took the
            trophy home.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-purple-500 rounded-full mt-6" />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          </div>
        ) : grouped.length === 0 ? (
          <div className="rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-12 md:p-20 text-center">
            <Hourglass className="w-12 h-12 text-gray-700 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-3">Results coming soon</h2>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Sportify has not been decided yet. Winners will appear here the moment
              the results are in.
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {grouped.map(([year, bySport]) => (
              <div key={year}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-black text-white italic tracking-tight">{year}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                </div>

                <div className="space-y-12">
                  {[...bySport.entries()].map(([sport, winners]) => (
                    <div key={sport}>
                      <h3 className="text-lg font-bold text-lime-400 uppercase tracking-wider mb-5">
                        {sport}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {winners.map((w) => <WinnerCard key={w.id} winner={w} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </section>
  );
};

export default SportifyWinners;
