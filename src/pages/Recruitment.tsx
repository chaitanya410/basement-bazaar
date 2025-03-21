
import React from 'react';
import Layout from '../components/Layout';
import RecruitmentForm from '../components/RecruitmentForm';
import AnimatedSection from '../components/AnimatedSection';
import Doodle from '../components/Doodle';

const Recruitment: React.FC = () => {
  const benefits = [
    "Make a meaningful impact in your community",
    "Develop leadership and organizational skills",
    "Network with like-minded individuals",
    "Gain experience in social work and community development",
    "Access to training and professional development opportunities",
    "Be part of a passionate and dedicated team"
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Become a volunteer at The Basements Social Forum and help us make a difference in Wardha.
            </p>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Main content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <AnimatedSection className="space-y-8" animation="slide-in">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Why Join Us?</h2>
                  <p className="text-gray-600 mb-6">
                    As a volunteer with The Basements Social Forum, you'll be part of a dedicated team working to create positive change in our community. We welcome individuals of all backgrounds and skill sets who share our passion for social impact.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3">Benefits of Joining</h3>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-ngo-blue mr-2">•</span>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-ngo-blue/20 rounded-lg translate-x-4 translate-y-4"></div>
                  <div className="relative rounded-lg overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                      alt="Team collaboration" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </AnimatedSection>
            </div>
            
            <div className="lg:col-span-3">
              <AnimatedSection animation="scale-in">
                <h2 className="text-3xl font-bold mb-6">Application Form</h2>
                <RecruitmentForm />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Volunteers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from some of our team members about their experience working with The Basements Social Forum.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Joining The Basements Social Forum has been one of the most rewarding experiences of my life. I've grown personally and professionally while making a real difference.",
                name: "Priya Sharma",
                role: "Education Program Volunteer",
                avatar: "https://randomuser.me/api/portraits/women/33.jpg"
              },
              {
                quote: "The team here is incredible. Everyone is passionate about making Wardha a better place, and the sense of community among volunteers is something special.",
                name: "Rahul Singh",
                role: "Community Outreach Coordinator",
                avatar: "https://randomuser.me/api/portraits/men/54.jpg"
              },
              {
                quote: "As someone with limited free time, I appreciate how the organization accommodates various schedules. Even contributing a few hours monthly feels impactful.",
                name: "Anika Patel",
                role: "Event Planning Volunteer",
                avatar: "https://randomuser.me/api/portraits/women/66.jpg"
              }
            ].map((testimonial, index) => (
              <AnimatedSection key={index} animation="fade-in" delay={index * 0.2}>
                <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                  <p className="text-gray-600 mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about volunteering with us? Find answers to commonly asked questions below.
            </p>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the minimum time commitment required?",
                answer: "We're flexible with time commitments and have roles requiring as little as 4 hours per month. We'll work with your schedule to find a suitable role."
              },
              {
                question: "Do I need specific qualifications to volunteer?",
                answer: "While some positions may require specific skills, many don't. We value enthusiasm, reliability, and a passion for community service above all."
              },
              {
                question: "Can students apply to volunteer?",
                answer: "Absolutely! We welcome student volunteers and can provide documentation for service hours or internship requirements."
              },
              {
                question: "Is there an orientation or training process?",
                answer: "Yes, all new volunteers attend an orientation session and receive role-specific training. Ongoing support is provided throughout your volunteering journey."
              }
            ].map((faq, index) => (
              <AnimatedSection key={index} animation="slide-up" delay={index * 0.1}>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-ngo-dark">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Recruitment;
