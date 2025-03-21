
import React from 'react';
import Layout from '../components/Layout';
import AnimatedSection from '../components/AnimatedSection';
import EventCard from '../components/EventCard';
import Doodle from '../components/Doodle';

const Welcome: React.FC = () => {
  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Community Health Camp',
      date: 'June 15, 2023',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop',
      description: 'Free health checkups and consultations for the community with focus on preventive healthcare and wellness.',
      location: 'Central Park, Wardha',
    },
    {
      id: 2,
      title: 'Environmental Cleanup Drive',
      date: 'July 8, 2023',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop',
      description: 'Join us in cleaning local parks and streets to promote environmental awareness and community responsibility.',
      location: 'Riverside Area, Wardha',
    },
    {
      id: 3,
      title: 'Youth Leadership Workshop',
      date: 'July 22, 2023',
      image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop',
      description: 'Empowering young individuals with leadership skills, communication techniques, and community engagement strategies.',
      location: 'Community Center, Wardha',
    },
    {
      id: 4,
      title: 'Cultural Festival',
      date: 'August 5-6, 2023',
      image: 'https://images.unsplash.com/photo-1526781100743-e933168649bb?q=80&w=2069&auto=format&fit=crop',
      description: 'Celebrating the diverse cultural heritage of our community through music, dance, food, and traditional arts.',
      location: 'Town Square, Wardha',
    },
    {
      id: 5,
      title: 'Educational Fair',
      date: 'September 12, 2023',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop',
      description: 'An interactive fair showcasing educational opportunities, scholarship programs, and career guidance for students.',
      location: 'Public School Grounds, Wardha',
    },
    {
      id: 6,
      title: 'Senior Citizens Gathering',
      date: 'October 1, 2023',
      image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?q=80&w=2070&auto=format&fit=crop',
      description: 'A special event honoring the elderly in our community with entertainment, health services, and companionship.',
      location: 'Golden Age Center, Wardha',
    },
  ];

  // Past events data
  const pastEvents = [
    {
      id: 7,
      title: 'Digital Literacy Workshop',
      date: 'March 10, 2023',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
      description: 'Teaching essential digital skills to community members of all ages, focusing on internet safety and basic computer usage.',
      location: 'Tech Hub, Wardha',
    },
    {
      id: 8,
      title: 'Women Empowerment Seminar',
      date: 'April 8, 2023',
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop',
      description: 'A seminar focused on empowering women through financial literacy, entrepreneurship, and leadership development.',
      location: 'Community Hall, Wardha',
    },
    {
      id: 9,
      title: 'Tree Planting Initiative',
      date: 'May 5, 2023',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop',
      description: 'Enhancing urban green spaces by planting trees throughout the city with community participation.',
      location: 'Various Locations, Wardha',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="pt-24 pb-12 md:pb-16 bg-gradient-to-b from-ngo-blue/20 to-transparent relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10">
          <Doodle className="w-64 h-64 text-ngo-blue" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Our Events & Activities</h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Discover the various ways we engage with and serve our community. Join us in our mission to create positive impact.
            </p>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Upcoming Events Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
            <div className="w-20 h-1 bg-ngo-blue mb-8"></div>
            <p className="text-gray-600 max-w-3xl">
              Join us for these upcoming events and be part of the positive change in our community. Everyone is welcome!
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <AnimatedSection key={event.id} delay={index * 0.1} animation="scale-in">
                <EventCard {...event} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Past Events Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Past Events</h2>
            <div className="w-20 h-1 bg-ngo-blue mb-8"></div>
            <p className="text-gray-600 max-w-3xl">
              A look back at some of our most impactful events and initiatives that have made a difference in Wardha.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <AnimatedSection key={event.id} delay={index * 0.1} animation="scale-in">
                <EventCard {...event} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Photo Gallery */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Event Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Moments captured from our various community events and activities.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div 
                  key={item} 
                  className="group relative overflow-hidden aspect-square rounded-lg shadow-md"
                >
                  <img 
                    src={`https://source.unsplash.com/random/600x600?community&sig=${item + 10}`} 
                    alt={`Gallery Image ${item}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">Event Moment</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-ngo-blue/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Want to Contribute?</h2>
            <p className="text-gray-600 mb-8">
              If you're interested in volunteering for our events or supporting our initiatives, we'd love to have you join our team!
            </p>
            <a href="/recruitment" className="btn-ngo">
              Become a Volunteer
            </a>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Welcome;
