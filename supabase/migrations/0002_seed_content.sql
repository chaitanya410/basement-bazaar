-- Seed the CMS with the content that was previously hard-coded in components.
--
-- Idempotent: re-running updates existing rows rather than duplicating them.
-- Public website content ONLY. Member and application records are personal
-- information and are never seeded from this repository -- import those with
-- scripts/import-members.mjs, which reads a local file that is gitignored.

-- Events --------------------------------------------------------------------

insert into public.events
  (slug, title, description, status, starts_on, ends_on, location, image_path, registration_url, display_order)
values
  ('community-health-camp', 'Community Health Camp', 'Free health checkups and consultations.', 'past', '2023-06-15', null, 'Central Park, Wardha', 'PlantationDrive.jpg', null, 1),
  ('environmental-cleanup', 'Environmental Cleanup', 'Join us in cleaning local parks.', 'past', '2023-07-08', null, 'Riverside Area, Wardha', 'BasementsCleaning.jpg', null, 2),
  ('youth-leadership', 'Youth Leadership', 'Empowering young individuals.', 'past', '2023-07-22', null, 'Community Center, Wardha', 'blanketDonation.JPG', null, 3),
  ('cultural-festival', 'Cultural Festival', 'Celebrating diverse heritage.', 'past', '2023-08-05', '2023-08-06', 'Town Square, Wardha', 'healthCheckup.jpg', null, 4),
  ('educational-fair', 'Educational Fair', 'Showcasing opportunities.', 'past', '2023-09-12', null, 'Public School, Wardha', 'NitalOrphanage.jpg', null, 5),
  ('senior-citizens', 'Senior Citizens', 'Honoring the elderly.', 'past', '2023-10-01', null, 'Golden Age Center, Wardha', 'policeCheriness.jpg', null, 6),
  ('cubs-rally', 'Cubs Rally', 'Community engagement.', 'past', '2023-10-01', null, 'Wardha', 'sosCubsRally.jpg', null, 7),
  ('bird-feeders', 'Bird Feeders', 'Nature conservation.', 'past', '2023-10-01', null, 'Wardha', 'BirdFeeders.jpg', null, 8),
  ('river-cleaning', 'River Cleaning', 'Environmental drive.', 'past', '2023-10-01', null, 'Dham River', 'DhamRiverCleaning.jpg', null, 9),
  ('health-checkup', 'Health Checkup', 'Medical services.', 'past', '2023-10-01', null, 'Wardha', 'HealthCheckup (1).jpg', null, 10),
  ('dog-feeding', 'Dog Feeding', 'Animal welfare.', 'past', '2023-10-01', null, 'Wardha', 'dogFeedingSanskruti.jpg', null, 11),
  ('cleaning-drive', 'Cleaning Drive', 'Urban cleanliness.', 'past', '2023-10-01', null, 'Wardha', 'cleaningDrive1.jpg', null, 12),
  ('g20-meet', 'G20 Meet', 'Discussion forum.', 'past', '2023-10-01', null, 'Wardha', 'G20Meet.jpg', null, 13),
  ('sportify', 'Sportify — Clash of the Champions', 'The Basements Social Forum brings you the most electrifying sports festival of the year. Cricket, Badminton, PickleBall and Carrom — gather your squad, feel the adrenaline, and compete for ultimate glory under the stadium lights.', 'upcoming', null, null, 'Wardha', 'sportifyPoster.jpeg', 'https://docs.google.com/forms/d/e/1FAIpQLSfizskxxrEjn9sf1c46GhYnTnrSWP7YogynPWHqFSDW8UypbA/viewform', 1)
on conflict (slug) do update set
  title            = excluded.title,
  description      = excluded.description,
  status           = excluded.status,
  starts_on        = excluded.starts_on,
  ends_on          = excluded.ends_on,
  location         = excluded.location,
  image_path       = excluded.image_path,
  registration_url = excluded.registration_url,
  display_order    = excluded.display_order;

-- Team ----------------------------------------------------------------------
-- A person has no natural key, so this seeds only when the table is empty.
-- Later edits made in the admin CMS must not be overwritten by a re-run.

insert into public.team_members (name, role, year, category, image_path, bio, focus, display_order)
select * from (values
  ('Ujwal Masne', 'Founder', 2021, 'founder', 'LordMasne.jpeg', null, '{}'::text[], 1),
  ('Riddhi Selkar', 'Founder', 2021, 'founder', 'RiddhiSelkar.jpeg', null, '{}'::text[], 2),
  ('Chaitanya Ubale', 'Founder', 2021, 'founder', 'ChaitanyaUpdated.jpg', null, '{}'::text[], 3),
  ('Arpit Gandole', 'Core Member', 2021, 'core', 'ArpitBhai.jpeg', null, '{}'::text[], 4),
  ('Rohan Pande', 'Core Member', 2021, 'core', 'Rohan.jpeg', null, '{}'::text[], 5),
  ('Nayan Mankar', 'Core Member', 2021, 'core', 'nayan.jpeg', null, '{}'::text[], 6),
  ('Rashmi Dahake', 'Core Member', 2021, 'core', 'Rashmi.jpeg', null, '{}'::text[], 7),
  ('Aryan Buchunde', 'Core Member', 2021, 'core', 'aryan.jpeg', null, '{}'::text[], 8),
  ('Moin Chavhan', 'President', 2026, 'core', 'MoinChavhanUpdated.jpg', 'Visionary leader driving innovation and community engagement with passion.', array['Public Speaking', 'Strategic Vision', 'Team Building']::text[], 1),
  ('Priyanka Modak', 'Video & Photography Head', 2026, 'core', 'PriyankaUpdated2.jpeg', 'Capturing the soul of our events through a lens and bringing our stories to life.', array['Cinematography', 'Visual Storytelling', 'Editing']::text[], 2),
  ('Sameer Hete', 'Antarnaad Head', 2026, 'core', 'sameerHeteUpdated.jpeg', 'Orchestrating the rhythm of Antarnaad and curating unforgettable cultural experiences.', array['Cultural Events', 'Curation', 'Artist Management']::text[], 3),
  ('Yutiksha Khobragade', 'Wardha Reads Head', 2026, 'core', 'YUTIKSHA.jpg', 'Championing literacy and sparking the absolute joy of reading across our community.', array['Literacy Drives', 'Community Library', 'Public Engagement']::text[], 4),
  ('Govind Mishra', 'Event Manager & Sponsorships', 2026, 'core', 'GovindMishra.jpeg', 'The strategic engine behind our events, securing partnerships that fuel our mission.', array['Sponsorships', 'Event Logistics', 'Corporate Relations']::text[], 5),
  ('Shravani Patil', 'Wardha Reads Head', 2026, 'core', 'ShravaniPatil.jpg', 'Nurturing a culture of knowledge sharing and making literature accessible to all.', array['Book Drives', 'Educational Outreach', 'Community Building']::text[], 6),
  ('Rakshit', 'Digital Backend Head', 2026, 'core', 'Rakshit.jpeg', 'The unseen architect powering our digital presence and streamlining technical operations.', array['Web Development', 'System Architecture', 'Data Management']::text[], 7),
  ('Viraj Joshi', 'Public Relations Head', 2026, 'core', 'VirajJoshi.jpeg', 'Crafting our public narrative and ensuring our voice resonates loud and clear.', array['Media Relations', 'Communications', 'Brand Voice']::text[], 8),
  ('Shravani Chaudhari', 'Event Manager', 2026, 'core', 'ShravaniChaudhari.jpeg', 'Master of logistics, turning ambitious blueprints into flawlessly executed gatherings.', array['Event Planning', 'Operations', 'Team Coordination']::text[], 9),
  ('Sanket Bhute', 'Video & Photography Head', 2026, 'core', 'sanketBhuteFace.jpeg', 'Framing our most impactful moments and preserving our legacy in high definition.', array['Photography', 'Post-Production', 'Creative Direction']::text[], 10),
  ('Parag Kankariya', 'PR & Sponsorship Head', 2026, 'core', 'ParagKankariya.jpeg', 'Bridging the gap between our vision and the partners who help make it a reality.', array['Public Relations', 'Fundraising', 'Strategic Partnerships']::text[], 11)
) as seed(name, role, year, category, image_path, bio, focus, display_order)
where not exists (select 1 from public.team_members);
