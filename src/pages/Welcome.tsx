import React from 'react';
import Layout from '../components/Layout';
import AnimatedSection from '../components/AnimatedSection';
import EventCard from '../components/EventCard';
import { useEvents } from '@/hooks/useContent';
import { resolveImageUrl } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

/** "June 15, 2023", or a range when the event spans days. */
function formatEventDate(start: string | null, end: string | null): string {
  if (!start) return 'Date to be announced';
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  return end && end !== start ? `${fmt(start)} – ${fmt(end)}` : fmt(start);
}

const Welcome: React.FC = () => {
  const { data: events = [], isLoading } = useEvents('past');

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-gradient-to-b from-ngo-blue/20 to-transparent relative">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Events</h1>
            <p className="text-lg text-gray-700">Discover how we serve the community.</p>
          </AnimatedSection>
        </div>
      </div>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 text-ngo-blue animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <AnimatedSection key={event.id} delay={index * 0.1} animation="scale-in">
                  <EventCard
                    title={event.title}
                    date={formatEventDate(event.starts_on, event.ends_on)}
                    image={resolveImageUrl(event.image_path)}
                    description={event.description ?? ''}
                    location={event.location ?? ''}
                  />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Welcome;