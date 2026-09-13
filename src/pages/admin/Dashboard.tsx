import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Users, Trophy, Inbox, IdCard, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { requireSupabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { PageHeader, Card, QueryState } from '@/components/admin/AdminUI';

interface Counts {
  events: number;
  team_members: number;
  sportify_winners: number;
  applications: number;
  newApplications: number;
  members: number;
}

const TILES = [
  { key: 'events', label: 'Events', to: '/admin/events', icon: CalendarDays },
  { key: 'team_members', label: 'Core team', to: '/admin/team', icon: Users },
  { key: 'sportify_winners', label: 'Sportify winners', to: '/admin/sportify-winners', icon: Trophy },
  { key: 'applications', label: 'Applications', to: '/admin/applications', icon: Inbox },
  { key: 'members', label: 'Members', to: '/admin/members', icon: IdCard },
] as const;

const Dashboard: React.FC = () => {
  const { profile } = useAuth();

  const counts = useQuery({
    queryKey: ['admin', 'counts'],
    queryFn: async (): Promise<Counts> => {
      const client = requireSupabase();
      const head = { count: 'exact' as const, head: true };

      const [events, team, winners, apps, newApps, members] = await Promise.all([
        client.from('events').select('*', head),
        client.from('team_members').select('*', head),
        client.from('sportify_winners').select('*', head),
        client.from('applications').select('*', head),
        client.from('applications').select('*', head).eq('status', 'new'),
        client.from('members').select('*', head),
      ]);

      return {
        events: events.count ?? 0,
        team_members: team.count ?? 0,
        sportify_winners: winners.count ?? 0,
        applications: apps.count ?? 0,
        newApplications: newApps.count ?? 0,
        members: members.count ?? 0,
      };
    },
  });

  return (
    <div>
      <PageHeader
        title={`Welcome${profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}`}
        description="Manage the public site content and review incoming applications."
      />

      <QueryState
        isLoading={counts.isLoading}
        error={counts.error}
        isEmpty={false}
        emptyLabel=""
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {TILES.map(({ key, label, to, icon: Icon }) => (
            <Link key={key} to={to} className="group">
              <Card className="p-5 h-full transition-colors group-hover:border-ngo-blue/50">
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-5 h-5 text-ngo-blue" />
                  <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-ngo-blue transition-colors" />
                </div>
                <p className="text-3xl font-bold text-white">{counts.data?.[key] ?? 0}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
                {key === 'applications' && (counts.data?.newApplications ?? 0) > 0 && (
                  <p className="text-xs text-amber-400 mt-2">
                    {counts.data?.newApplications} awaiting review
                  </p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </QueryState>
    </div>
  );
};

export default Dashboard;
