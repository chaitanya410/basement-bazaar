
import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';
import { Link } from 'react-router-dom';
import Doodle from '../components/Doodle';

const Index: React.FC = () => {
  const impactStats = [
    { number: '50+', label: 'Social Programs' },
    { number: '2500+', label: 'Lives Impacted' },
    { number: '15+', label: 'Years of Service' },
    { number: '100+', label: 'Active Volunteers' },
  ];

  return (
    <Layout>
      <Hero />
      
      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Since our founding, we've made significant strides in improving the community of Wardha through various initiatives and programs.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <AnimatedSection key={stat.label} className="text-center" delay={index * 0.1}>
                <div className="bg-white rounded-lg shadow-md p-6 h-full">
                  <h3 className="text-3xl sm:text-4xl font-bold text-ngo-blue mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <AnimatedSection className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">About The Basements Social Forum</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2008, The Basements Social Forum has been at the forefront of community development in Wardha. Our mission is to bridge social gaps, provide educational opportunities, and foster cultural harmony.
              </p>
              <p className="text-gray-600 mb-6">
                We believe in creating sustainable change through collaborative efforts, innovative programs, and responsive community engagement. Our team of dedicated volunteers works tirelessly to address the evolving needs of our community.
              </p>
              <Link to="/welcome" className="btn-ngo">
                Learn More About Us
              </Link>
            </AnimatedSection>
            
            <AnimatedSection className="md:w-1/2 mb-10 md:mb-0 order-1 md:order-2" animation="slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-ngo-blue/20 rounded-lg translate-x-4 translate-y-4"></div>
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop" 
                    alt="Team working together" 
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
                <Doodle className="absolute -bottom-10 -left-10 w-32 h-32 text-ngo-blue" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Events Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us for our upcoming events and be part of the change in our community. Everyone is welcome!
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 relative">
                    <img 
                      src={`https://source.unsplash.com/random/400x300?community&sig=${item}`} 
                      alt="Event" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white text-lg font-bold">Upcoming Event {item}</h3>
                      <p className="text-white/80 text-sm">Coming Soon</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/welcome" className="btn-ngo">
                View All Events
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-ngo-blue/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Join our team of passionate volunteers and contribute to creating positive change in Wardha. Together, we can build a brighter future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/recruitment" className="btn-ngo">
                Join Our Team
              </Link>
              <Link to="/login" className="btn-ngo-outline">
                Member Login
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
