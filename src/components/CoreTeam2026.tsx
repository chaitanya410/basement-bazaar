// import React from 'react';
// import { Sparkles, Star, Award } from 'lucide-react';
// import Navbar from './Navbar';

// const CoreTeam2026 = () => {
//   // 6 Members dummy data
//   const team = [
//     {
//       id: 1,
//       name: 'Aarav Sharma',
//       role: 'President',
//       bio: 'Visionary leader driving innovation and community engagement with passion.',
//       image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
//       rotation: 'rotate-6', // Angled right
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]', // Blue glow
//     },
//     {
//       id: 2,
//       name: 'Isha Patel',
//       role: 'Vice President',
//       bio: 'Empowering teams through collaborative strategies and empathetic mentorship.',
//       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
//       rotation: '-rotate-6', // Angled left
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]', // Pink glow
//     },
//     {
//       id: 3,
//       name: 'Rohan Verma',
//       role: 'Head of Operations',
//       bio: 'Master of efficiency, turning grand visions into smooth, actionable realities.',
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
//       rotation: 'rotate-3',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]', // Lime glow
//     },
//     {
//       id: 4,
//       name: 'Ananya Iyer',
//       role: 'Strategic Partnerships',
//       bio: 'Building bridges and fostering relationships that amplify our collective impact.',
//       image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
//       rotation: '-rotate-3',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]', // Purple glow
//     },
//     {
//       id: 5,
//       name: 'Vikram Singh',
//       role: 'Community Outreach',
//       bio: 'The heartbeat of our grassroots movement, connecting people with purpose.',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
//       rotation: 'rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]', // Orange glow
//         },
//     {
//       id: 6,
//       name: 'Saira Khan',
//       role: 'Creative Director',
//       bio: 'Weaving artistry into advocacy, ensuring our message is vibrant and unforgettable.',
//       image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop',
//       rotation: '-rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]', // Green glow
//     },
//   ];

//   return (
//     <section className="py-24 bg-[#030303] relative overflow-hidden">
//       <Navbar />

//       {/* Background Animated Bokeh/Light Effects */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-[128px] animate-pulse"></div>
//         <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[128px] animate-pulse delay-700"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full blur-[128px] animate-pulse delay-1000"></div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        
//         {/* Section Header */}
//         <div className="text-center mb-20 relative">
//           <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
//             <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />
//             <span className="text-sm font-medium text-gray-300 uppercase tracking-widest">New Chapter</span>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
//             Introducing Our <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
//               New Core Team of 2026
//             </span>
//           </h2>
//           <div className="w-40 h-1.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 mx-auto rounded-full shadow-[0_0_10px_rgba(236,72,153,0.7)]"></div>
//         </div>

//         {/* Members List - One below another */}
//         <div className="space-y-16">
//           {team.map((member, index) => (
//             <div 
//               key={member.id}
//               className={`group flex flex-col md:flex-row items-center gap-10 md:gap-16 p-8 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 ${member.glowColor} ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
//             >
              
//               {/* Angled Photo Container */}
//               <div className={`relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0 ${member.rotation}`}>
//                 {/* Decorative glowing ring */}
//                 <div className="absolute -inset-2 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/10 to-white/20"></div>
                
//                 <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl">
//                   <img 
//                     src={member.image} 
//                     alt={member.name} 
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                 </div>
                
//                 {/* Decorative Star Icon on photo */}
//                 <div className="absolute bottom-2 right-2 p-2.5 rounded-full bg-gray-950 border-2 border-white shadow-lg text-yellow-400">
//                   <Star className="w-5 h-5 fill-yellow-400" />
//                 </div>
//               </div>

//               {/* Content Container */}
//               <div className={`flex-grow text-center ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
//                 <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 mb-4`}>
//                     <Award className="w-4 h-4 text-fuchsia-400"/>
//                     <span className="text-sm font-semibold tracking-wide uppercase">{member.role}</span>
//                 </div>

//                 <h3 className="text-4xl font-bold text-white mb-5 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
//                   {member.name}
//                 </h3>

//                 {/* NICE CURSIVE WRITING BIO */}
//                 <p className="font-cursive text-3xl md:text-4xl text-gray-300 leading-snug tracking-wide transition-colors duration-300 group-hover:text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
//                   "{member.bio}"
//                 </p>
//               </div>

//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default CoreTeam2026;



import React from 'react';
import { Sparkles, Star, Award, Linkedin, Twitter, Mail } from 'lucide-react';
import Navbar from './Navbar';

const CoreTeam2026 = () => {
  // Expanded data with "focus" areas to fill space beautifully
  const team = [
    {
      id: 1,
      name: 'Aarav Sharma',
      role: 'President',
      bio: 'Visionary leader driving innovation and community engagement with passion.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
      rotation: 'rotate-6', 
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]', 
      focus: ['Public Speaking', 'Strategic Vision', 'Team Building']
    },
    {
      id: 2,
      name: 'Isha Patel',
      role: 'Vice President',
      bio: 'Empowering teams through collaborative strategies and empathetic mentorship.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
      rotation: '-rotate-6', 
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]', 
      focus: ['Mentorship', 'Operations', 'Conflict Resolution']
    },
    {
      id: 3,
      name: 'Rohan Verma',
      role: 'Head of Operations',
      bio: 'Master of efficiency, turning grand visions into smooth, actionable realities.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
      rotation: 'rotate-3',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]', 
      focus: ['Logistics', 'Event Planning', 'Resource Management']
    },
    {
      id: 4,
      name: 'Ananya Iyer',
      role: 'Strategic Partnerships',
      bio: 'Building bridges and fostering relationships that amplify our collective impact.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      rotation: '-rotate-3',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]', 
      focus: ['Networking', 'Sponsorships', 'PR']
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Community Outreach',
      bio: 'The heartbeat of our grassroots movement, connecting people with purpose.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      rotation: 'rotate-6',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]', 
      focus: ['Volunteer Coordination', 'Field Work', 'Advocacy']
        },
    {
      id: 6,
      name: 'Saira Khan',
      role: 'Creative Director',
      bio: 'Weaving artistry into advocacy, ensuring our message is vibrant and unforgettable.',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop',
      rotation: '-rotate-6',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]', 
      focus: ['Brand Identity', 'Social Media', 'Content Creation']
    },
  ];

  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden">
      <Navbar />

      {/* NEW: Subtle Technical Grid Background to fill empty space */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Background Animated Bokeh/Light Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[128px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full blur-[128px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24 relative">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />
            <span className="text-sm font-medium text-gray-300 uppercase tracking-widest">New Chapter</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
            Introducing Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              New Core Team of 2026
            </span>
          </h2>
          <div className="w-40 h-1.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 mx-auto rounded-full shadow-[0_0_10px_rgba(236,72,153,0.7)] mb-8"></div>
          
          {/* NEW: Subtitle to anchor the header */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Meet the dedicated minds steering The Basements Social Forum into the future. A perfect blend of creativity, strategy, and relentless passion for our community.
          </p>
        </div>

        {/* Members List - One below another */}
        <div className="space-y-16">
          {team.map((member, index) => (
            <div 
              key={member.id}
              className={`group flex flex-col md:flex-row items-center gap-10 md:gap-16 p-8 md:p-12 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 backdrop-blur-sm ${member.glowColor} ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* Angled Photo Container */}
              <div className={`relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0 ${member.rotation}`}>
                <div className="absolute -inset-2 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/10 to-white/20"></div>
                
                <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/90 shadow-xl">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute bottom-4 right-4 p-3 rounded-full bg-gray-950 border-2 border-white/50 shadow-[0_0_15px_rgba(250,204,21,0.5)] text-yellow-400">
                  <Star className="w-5 h-5 fill-yellow-400" />
                </div>
              </div>

              {/* Content Container */}
              <div className={`flex-grow text-center ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'} flex flex-col justify-center`}>
                
                <div className={`inline-flex items-center justify-center md:justify-start gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 mb-5 w-fit ${index % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                    <Award className="w-4 h-4 text-fuchsia-400"/>
                    <span className="text-xs font-bold tracking-widest uppercase">{member.role}</span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {member.name}
                </h3>

                {/* Cursive Bio */}
                <p className="font-cursive text-3xl md:text-4xl text-gray-300 leading-snug tracking-wide transition-colors duration-300 group-hover:text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-8">
                  "{member.bio}"
                </p>

                {/* NEW: Expertise Tags */}
                <div className={`flex flex-wrap gap-2 justify-center ${index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'} mb-8`}>
                  {member.focus.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-sm font-medium text-gray-400 transition-all duration-300 group-hover:border-white/30 group-hover:text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* NEW: Social Icons */}
                <div className={`flex items-center gap-5 justify-center ${index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 border border-transparent transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/50 border border-transparent transition-all duration-300">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-pink-500/20 hover:border-pink-500/50 border border-transparent transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreTeam2026;