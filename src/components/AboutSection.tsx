
import React from 'react';
import { Heart, Globe, Users, Sparkles } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
// import { Footer } from 'react-day-picker';


const AboutSection = () => {
  // Placeholder data for the team using the names of your actual core members
  const teamMembers = [
    { name: 'Ujwal Masne', role: 'Founder', image: 'LordMasne.jpeg' },
    { name: 'Riddhi Selkar', role: 'Founder', image: 'RiddhiSelkar.jpeg' },
    { name: 'Chaitanya Ubale', role: 'Founder', image: 'ChaitanyaUpdated.jpg' },
    { name: 'Arpit Gandole', role: 'Core Member', image: 'ArpitBhai.jpeg' },
    { name: 'Rohan Pande', role: 'Core Member', image: 'Rohan.jpeg' },
    { name: 'Nayan Mankar', role: 'Core Member', image: 'nayan.jpeg' },
    { name: 'Rashmi Dahake', role: 'Core Member', image: 'Rashmi.jpeg' },
    { name: 'Aryan Buchunde', role: 'Core Member', image: 'aryan.jpeg' },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 font-sans">
      <Navbar/>
      {/* 1. EMOTIONAL HERO / VISION & MISSION */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000" 
            alt="Children smiling" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white dark:from-gray-950 dark:via-gray-950/80 dark:to-gray-950"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <span className="text-ngo-blue font-semibold tracking-wider uppercase text-sm mb-4 block animate-fade-in">
            Our Purpose
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight">
            Intending to be of service <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
              for the Progeny.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed italic">
            "The Basement functions on the ground to edify the underprivileged part of the society. We have bonded to do someone a good turn."
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 md:p-12 text-left border border-gray-100 dark:border-gray-800 relative transform transition hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 bg-blue-500 text-white p-4 rounded-full shadow-lg">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              The Basement has been set up with a vision to provide a helping hand to the needful. Primarily, with the basic and essential obscure knowledge in the field of education alongside other fundamental interpersonal skills to help them shape a better future for themselves. Our focus is set on to bring a change with our actions; A change that is desired; A change that is worthwhile; And a change that is indispensable. Having the chief aim of providing educational aid, The Basements has also been lined up to be able to do some voluntary work for the welfare of the community and always pitch in for the conservation and protection of the mother nature. We would strive to accomplish this acute mission.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WORKING MODEL (Image Left, Text Right) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-teal-400 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                alt="Team working together" 
                className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full transform group-hover:scale-[1.02] transition duration-500"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium mb-6">
                <Users className="w-4 h-4" /> Working Model
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Growing Together Through Structured Harmony
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-6">
                Besides doing a thing good to the underprivileged section of society we are also trying to do the overall development of the volunteers, here at The Basements. Thus we try to work our things out by creating a hierarchy model for the various different domains we work in, that should add values and new skills to our members.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                The highest authority in the hierarchy sets up a plan and assigns the group members some respective portions. A system working like this always provides the expected result within time... Also, such system creates and inculcates a habit of being able to work in coordination. The group leads for each activity are reshuffled after a certain decided amount of time taking into account the individual’s performance. Thus it encourages a growth mind-set in everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FUTURE IMPACT (Text Left, Image Right) */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium mb-6">
                <Globe className="w-4 h-4" /> Future Impact
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Helping Them Look Beyond the Whole Sky
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-6">
                NGOs are initiatives that make a society. ‘The basements’ is the initiative of college students who want to bring a change in the society primarily through education and more. Even in this generation, students can only measure a pinch of the sky. But the contributors at the basements have a large aim.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-6">
                Our Future-Opportunities drives help students to choose the right career for life with proper guiding light. We try to inculcate them with life-skills that shall shape their personality. At Basements, we have set up a library with an objective to supply books to the seekers. With this, Basements offer to create opportunities for learning; support literacy and education; and also help shape the new ideas and perspectives that are center to a developing and innovative society.
              </p>
            </div>
            <div className="relative group order-1 lg:order-2">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-400 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000" 
                alt="Library and future learning" 
                className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full transform group-hover:scale-[1.02] transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FACES BEHIND THE CAUSE (Optional emotional touch) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The Faces Behind The Cause
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            A vision is only as strong as the people who execute it. Meet the core minds driving the changes at The Basements Social Forum.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                  {/* <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  /> */}
                {/* Replaced object-cover with object-contain and added a subtle background */}
<img 
  src={member.image} 
  alt={member.name} 
  // Replaced object-top with object-[50%_20%]
  className="w-full h-full object-cover object-[50%_20%] transform group-hover:scale-110 transition duration-500"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h4>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default AboutSection;