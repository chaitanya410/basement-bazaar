
import React from 'react';
import Layout from '../components/Layout';
import RecruitmentForm from '../components/RecruitmentForm';
import AnimatedSection from '../components/AnimatedSection';
import { Check } from 'lucide-react';

const Recruitment: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <AnimatedSection animation="slide-up" delay={0.1}>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We're looking for passionate individuals who want to make a difference in the Wardha community. Apply now to become part of our team.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-in" delay={0.3}>
              <h2 className="text-xl font-semibold mb-4">Benefits of joining us:</h2>
              <ul className="space-y-4">
                {[
                  'Make a positive impact in the community',
                  'Develop leadership and organizational skills',
                  'Network with like-minded individuals',
                  'Opportunity to learn and grow personally and professionally'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 bg-ngo-blue rounded-full p-1 flex-shrink-0">
                      <Check size={14} className="text-white" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
          
          <AnimatedSection animation="fade-in" delay={0.5}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Application Form</h2>
              <RecruitmentForm />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Recruitment;
