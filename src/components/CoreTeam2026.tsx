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



// import React from 'react';
// import { Sparkles, Star, Award, Linkedin, Twitter, Mail } from 'lucide-react';
// import Navbar from './Navbar';

// const CoreTeam2026 = () => {
//   // Expanded data with "focus" areas to fill space beautifully
//   const team = [
//     {
//       id: 1,
//       name: 'Aarav Sharma',
//       role: 'President',
//       bio: 'Visionary leader driving innovation and community engagement with passion.',
//       image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
//       rotation: 'rotate-6', 
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]', 
//       focus: ['Public Speaking', 'Strategic Vision', 'Team Building']
//     },
//     {
//       id: 2,
//       name: 'Isha Patel',
//       role: 'Vice President',
//       bio: 'Empowering teams through collaborative strategies and empathetic mentorship.',
//       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
//       rotation: '-rotate-6', 
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]', 
//       focus: ['Mentorship', 'Operations', 'Conflict Resolution']
//     },
//     {
//       id: 3,
//       name: 'Rohan Verma',
//       role: 'Head of Operations',
//       bio: 'Master of efficiency, turning grand visions into smooth, actionable realities.',
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
//       rotation: 'rotate-3',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]', 
//       focus: ['Logistics', 'Event Planning', 'Resource Management']
//     },
//     {
//       id: 4,
//       name: 'Ananya Iyer',
//       role: 'Strategic Partnerships',
//       bio: 'Building bridges and fostering relationships that amplify our collective impact.',
//       image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
//       rotation: '-rotate-3',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]', 
//       focus: ['Networking', 'Sponsorships', 'PR']
//     },
//     {
//       id: 5,
//       name: 'Vikram Singh',
//       role: 'Community Outreach',
//       bio: 'The heartbeat of our grassroots movement, connecting people with purpose.',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
//       rotation: 'rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]', 
//       focus: ['Volunteer Coordination', 'Field Work', 'Advocacy']
//         },
//     {
//       id: 6,
//       name: 'Saira Khan',
//       role: 'Creative Director',
//       bio: 'Weaving artistry into advocacy, ensuring our message is vibrant and unforgettable.',
//       image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop',
//       rotation: '-rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]', 
//       focus: ['Brand Identity', 'Social Media', 'Content Creation']
//     },
//   ];

//   return (
//     <section className="py-24 bg-[#030303] relative overflow-hidden">
//       <Navbar />

//       {/* NEW: Subtle Technical Grid Background to fill empty space */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>

//       {/* Background Animated Bokeh/Light Effects */}
//       <div className="absolute inset-0 opacity-20 pointer-events-none">
//         <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-[128px] animate-pulse"></div>
//         <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[128px] animate-pulse delay-700"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full blur-[128px] animate-pulse delay-1000"></div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        
//         {/* Section Header */}
//         <div className="text-center mb-24 relative">
//           <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
//             <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />
//             <span className="text-sm font-medium text-gray-300 uppercase tracking-widest">New Chapter</span>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
//             Introducing Our <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
//               New Core Team of 2026
//             </span>
//           </h2>
//           <div className="w-40 h-1.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 mx-auto rounded-full shadow-[0_0_10px_rgba(236,72,153,0.7)] mb-8"></div>
          
//           {/* NEW: Subtitle to anchor the header */}
//           <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
//             Meet the dedicated minds steering The Basements Social Forum into the future. A perfect blend of creativity, strategy, and relentless passion for our community.
//           </p>
//         </div>

//         {/* Members List - One below another */}
//         <div className="space-y-16">
//           {team.map((member, index) => (
//             <div 
//               key={member.id}
//               className={`group flex flex-col md:flex-row items-center gap-10 md:gap-16 p-8 md:p-12 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 backdrop-blur-sm ${member.glowColor} ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
//             >
              
//               {/* Angled Photo Container */}
//               <div className={`relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0 ${member.rotation}`}>
//                 <div className="absolute -inset-2 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/10 to-white/20"></div>
                
//                 <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/90 shadow-xl">
//                   <img 
//                     src={member.image} 
//                     alt={member.name} 
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                 </div>
                
//                 <div className="absolute bottom-4 right-4 p-3 rounded-full bg-gray-950 border-2 border-white/50 shadow-[0_0_15px_rgba(250,204,21,0.5)] text-yellow-400">
//                   <Star className="w-5 h-5 fill-yellow-400" />
//                 </div>
//               </div>

//               {/* Content Container */}
//               <div className={`flex-grow text-center ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'} flex flex-col justify-center`}>
                
//                 <div className={`inline-flex items-center justify-center md:justify-start gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 mb-5 w-fit ${index % 2 !== 0 ? 'md:ml-auto' : ''}`}>
//                     <Award className="w-4 h-4 text-fuchsia-400"/>
//                     <span className="text-xs font-bold tracking-widest uppercase">{member.role}</span>
//                 </div>

//                 <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
//                   {member.name}
//                 </h3>

//                 {/* Cursive Bio */}
//                 <p className="font-cursive text-3xl md:text-4xl text-gray-300 leading-snug tracking-wide transition-colors duration-300 group-hover:text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-8">
//                   "{member.bio}"
//                 </p>

//                 {/* NEW: Expertise Tags */}
//                 <div className={`flex flex-wrap gap-2 justify-center ${index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'} mb-8`}>
//                   {member.focus.map((skill, i) => (
//                     <span 
//                       key={i} 
//                       className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-sm font-medium text-gray-400 transition-all duration-300 group-hover:border-white/30 group-hover:text-gray-200"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>

//                 {/* NEW: Social Icons */}
//                 <div className={`flex items-center gap-5 justify-center ${index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'}`}>
//                   <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 border border-transparent transition-all duration-300">
//                     <Linkedin className="w-5 h-5" />
//                   </a>
//                   <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/50 border border-transparent transition-all duration-300">
//                     <Twitter className="w-5 h-5" />
//                   </a>
//                   <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-pink-500/20 hover:border-pink-500/50 border border-transparent transition-all duration-300">
//                     <Mail className="w-5 h-5" />
//                   </a>
//                 </div>

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
import Navbar from './Navbar'; // Adjust path if needed

const CoreTeam2026 = () => {
//   const team = [
//     {
//       id: 1,
//       name: 'Moin Chavhan',
//       role: 'President',
//       bio: 'Visionary leader driving innovation and community engagement with passion.',
//       image: 'MoinChavhanUpdated.jpg',
//       rotation: 'rotate-6', 
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]', 
//       focus: ['Public Speaking', 'Strategic Vision', 'Team Building']
//     },
//     {
//       id: 2,
//       name: 'Priyanka Modak',
//       role: 'Vice President',
//       bio: 'Empowering teams through collaborative strategies and empathetic mentorship.',
//       image: 'PriyankaUpdated2.jpeg',
//       rotation: '-rotate-6', 
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]', 
//       focus: ['Mentorship', 'Operations', 'Conflict Resolution']
//     },
//     {
//       id: 3,
//       name: 'Sameer Hete',
//       role: 'Head of Operations',
//       bio: 'Master of efficiency, turning grand visions into smooth, actionable realities.',
//       image: 'sameerHeteUpdated.jpeg',
//       rotation: 'rotate-3',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]', 
//       focus: ['Logistics', 'Event Planning', 'Resource Management']
//     },
//      {
//       id: 4,
//       name: 'Yutiksha Khobragade',
//       role: 'Community Outreach',
//       bio: 'The heartbeat of our grassroots movement, connecting people with purpose.',
//       image: 'YUTIKSHA.jpg',
//       rotation: 'rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]', 
//       focus: ['Volunteer Coordination', 'Field Work', 'Advocacy']
//         },
//     {
//       id: 5,
//       name: 'Govind Mishra',
//       role: 'Strategic Partnerships',
//       bio: 'Building bridges and fostering relationships that amplify our collective impact.',
//       image: 'GovindMishra.jpeg',
//       rotation: '-rotate-3',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]', 
//       focus: ['Networking', 'Sponsorships', 'PR']
//     },
   
//     {
//       id: 6,
//       name: 'Shravani Patil',
//       role: 'Creative Director',
//       bio: 'Weaving artistry into advocacy, ensuring our message is vibrant and unforgettable.',
//       image: 'ShravaniPatil.jpg',
//       rotation: '-rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]', 
//       focus: ['Brand Identity', 'Social Media', 'Content Creation']
//     },
//     {
//       id: 7,
//       name: 'Rakshit',
//       role: 'Creative Director',
//       bio: 'Weaving artistry into advocacy, ensuring our message is vibrant and unforgettable.',
//       image: 'Rakshit.jpeg',
//       rotation: '-rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]', 
//       focus: ['Brand Identity', 'Social Media', 'Content Creation']
//     },
    
    
//      {
//       id: 8,
//       name: 'Viraj Joshi',
//       role: 'Creative Director',
//       bio: 'Weaving artistry into advocacy, ensuring our message is vibrant and unforgettable.',
//       image: 'VirajJoshi.jpeg',
//       rotation: '-rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]', 
//       focus: ['Brand Identity', 'Social Media', 'Content Creation']
//     },
//      {
//       id: 9,
//       name: 'Shravani Chaudhari',
//       role: 'Creative Director',
//       bio: 'Weaving artistry into advocacy, ensuring our message is vibrant and unforgettable.',
//       image: 'ShravaniChaudhari.jpeg',
//       rotation: '-rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]', 
//       focus: ['Brand Identity', 'Social Media', 'Content Creation']
//     },
//      {
//       id: 10,
//       name: 'Sanket Bhute',
//       role: 'Creative Director',
//       bio: 'Weaving artistry into advocacy, ensuring our message is vibrant and unforgettable.',
//       image: 'sanketBhuteFace.jpeg',
//       rotation: '-rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]', 
//       focus: ['Brand Identity', 'Social Media', 'Content Creation']
//     },

//     {
//       id: 11,
//       name: 'Parag Kankariya',
//       role: 'Creative Director',
//       bio: 'Weaving artistry into advocacy, ensuring our message is vibrant and unforgettable.',
//       image: 'ParagKankariya.jpeg',
//       rotation: '-rotate-6',
//       glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]', 
//       focus: ['Brand Identity', 'Social Media', 'Content Creation']
//     },
    

//   ];


const team = [
    {
      id: 1, // Restored ID 1
      name: 'Moin Chavhan',
      role: 'President',
      bio: 'Visionary leader driving innovation and community engagement with passion.',
      image: 'MoinChavhanUpdated.jpg',
      rotation: 'rotate-6', 
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]', 
      focus: ['Public Speaking', 'Strategic Vision', 'Team Building']
    },
    {
      id: 2,
      name: 'Priyanka Modak',
      role: 'Video & Photography Head',
      bio: 'Capturing the soul of our events through a lens and bringing our stories to life.',
      image: 'PriyankaUpdated2.jpeg',
      rotation: '-rotate-6', 
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]', 
      focus: ['Cinematography', 'Visual Storytelling', 'Editing']
    },
    {
      id: 3,
      name: 'Sameer Hete',
      role: 'Antarnaad Head',
      bio: 'Orchestrating the rhythm of Antarnaad and curating unforgettable cultural experiences.',
      image: 'sameerHeteUpdated.jpeg',
      rotation: 'rotate-3',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]', 
      focus: ['Cultural Events', 'Curation', 'Artist Management']
    },
     {
      id: 4,
      name: 'Yutiksha Khobragade',
      role: 'Wardha Reads Head',
      bio: 'Championing literacy and sparking the absolute joy of reading across our community.',
      image: 'YUTIKSHA.jpg',
      rotation: 'rotate-6',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]', 
      focus: ['Literacy Drives', 'Community Library', 'Public Engagement']
        },
    {
      id: 5,
      name: 'Govind Mishra',
      role: 'Event Manager & Sponsorships',
      bio: 'The strategic engine behind our events, securing partnerships that fuel our mission.',
      image: 'GovindMishra.jpeg',
      rotation: '-rotate-3',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]', 
      focus: ['Sponsorships', 'Event Logistics', 'Corporate Relations']
    },
    {
      id: 6,
      name: 'Shravani Patil',
      role: 'Wardha Reads Head',
      bio: 'Nurturing a culture of knowledge sharing and making literature accessible to all.',
      image: 'ShravaniPatil.jpg',
      rotation: '-rotate-6',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]', 
      focus: ['Book Drives', 'Educational Outreach', 'Community Building']
    },
    {
      id: 7,
      name: 'Rakshit',
      role: 'Digital Backend Head',
      bio: 'The unseen architect powering our digital presence and streamlining technical operations.',
      image: 'Rakshit.jpeg',
      rotation: '-rotate-6',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]', 
      focus: ['Web Development', 'System Architecture', 'Data Management']
    },
     {
      id: 8,
      name: 'Viraj Joshi',
      role: 'Public Relations Head',
      bio: 'Crafting our public narrative and ensuring our voice resonates loud and clear.',
      image: 'VirajJoshi.jpeg',
      rotation: '-rotate-6',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]', 
      focus: ['Media Relations', 'Communications', 'Brand Voice']
    },
     {
      id: 9,
      name: 'Shravani Chaudhari',
      role: 'Event Manager',
      bio: 'Master of logistics, turning ambitious blueprints into flawlessly executed gatherings.',
      image: 'ShravaniChaudhari.jpeg',
      rotation: '-rotate-6',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]', 
      focus: ['Event Planning', 'Operations', 'Team Coordination']
    },
     {
      id: 10,
      name: 'Sanket Bhute',
      role: 'Video & Photography Head',
      bio: 'Framing our most impactful moments and preserving our legacy in high definition.',
      image: 'sanketBhuteFace.jpeg',
      rotation: '-rotate-6',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]', 
      focus: ['Photography', 'Post-Production', 'Creative Direction']
    },
    {
      id: 11,
      name: 'Parag Kankariya',
      role: 'PR & Sponsorship Head',
      bio: 'Bridging the gap between our vision and the partners who help make it a reality.',
      image: 'ParagKankariya.jpeg',
      rotation: '-rotate-6',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]', 
      focus: ['Public Relations', 'Fundraising', 'Strategic Partnerships']
    },
  ];

  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden font-sans">
      <Navbar />

      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* NEW: Abstract Floating Elements to fill dead space */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[5%] text-white/[0.03] font-mono text-6xl animate-pulse">+</div>
        <div className="absolute top-[45%] right-[8%] text-white/[0.03] font-mono text-6xl animate-pulse delay-500">+</div>
        <div className="absolute bottom-[20%] left-[10%] text-white/[0.03] font-mono text-6xl animate-pulse delay-1000">+</div>
        <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-fuchsia-500/50 rounded-full blur-[2px] animate-ping"></div>
        <div className="absolute bottom-[40%] left-[25%] w-3 h-3 bg-cyan-500/50 rounded-full blur-[2px] animate-ping delay-700"></div>
      </div>

      {/* Background Animated Bokeh/Light Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[128px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full blur-[128px] animate-pulse delay-1000"></div>
      </div>

      {/* Expanded Max-Width from 5xl to 6xl to fill screen better */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-28 relative">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />
            <span className="text-sm font-bold text-gray-200 uppercase tracking-[0.2em]">New Chapter</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
            Introducing Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              New Core Team of 2026
            </span>
          </h2>
          <div className="w-48 h-1.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 mx-auto rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)] mb-10"></div>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Meet the dedicated minds steering The Basements Social Forum into the future. A perfect blend of creativity, strategy, and relentless passion for our community.
          </p>
        </div>

        {/* Members List */}
        <div className="space-y-20 md:space-y-32">
          {team.map((member, index) => (
            <div 
              key={member.id}
              className={`group relative flex flex-col md:flex-row items-center gap-12 md:gap-20 p-8 md:p-14 rounded-[2.5rem] bg-white/[0.015] hover:bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 backdrop-blur-sm shadow-2xl ${member.glowColor} ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* NEW: Giant Typographic Watermark (01, 02, etc.) */}
              <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 !== 0 ? 'md:-left-12' : 'md:-right-12'} text-[12rem] md:text-[20rem] font-black text-white/[0.02] pointer-events-none select-none z-0 group-hover:text-white/[0.04] group-hover:scale-105 transition-all duration-700`}>
                0{member.id}
              </div>

              {/* Angled Photo Container */}
              <div className={`relative flex-shrink-0 z-10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0 ${member.rotation}`}>
                <div className="absolute -inset-3 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/20 to-transparent"></div>
                
                {/* <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-[6px] border-white/90 shadow-2xl">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div> */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-[6px] border-white/90 shadow-2xl">
  <img 
    src={member.image} 
    alt={member.name} 
    // Added "object-top" right after "object-cover"
    // className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
    className="w-full h-full object-contain object-top bg-white/5 transition-transform duration-1000 group-hover:scale-110"
  />
</div>
                
                <div className="absolute bottom-6 right-6 p-4 rounded-full bg-gray-950 border-2 border-white/50 shadow-[0_0_20px_rgba(250,204,21,0.6)] text-yellow-400 group-hover:rotate-12 transition-transform duration-500">
                  <Star className="w-6 h-6 fill-yellow-400" />
                </div>
              </div>

              {/* Content Container */}
              <div className={`flex-grow relative z-10 text-center ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'} flex flex-col justify-center`}>
                
                <div className={`inline-flex items-center justify-center md:justify-start gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 mb-6 w-fit ${index % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                    <Award className="w-4 h-4 text-fuchsia-400"/>
                    <span className="text-sm font-bold tracking-[0.15em] uppercase">{member.role}</span>
                </div>

                <h3 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all duration-300">
                  {member.name}
                </h3>

                {/* Cursive Bio */}
                <p className="font-cursive text-4xl md:text-5xl text-gray-400 leading-tight tracking-wide transition-colors duration-500 group-hover:text-gray-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-10">
                  "{member.bio}"
                </p>

                {/* Expertise Tags */}
                <div className={`flex flex-wrap gap-3 justify-center ${index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'} mb-10`}>
                  {member.focus.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 text-sm font-medium text-gray-400 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.08] group-hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Icons */}
                <div className={`flex items-center gap-6 justify-center ${index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <a href="#" className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-transparent transition-all duration-300 hover:-translate-y-1">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] border border-transparent transition-all duration-300 hover:-translate-y-1">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-pink-500/20 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] border border-transparent transition-all duration-300 hover:-translate-y-1">
                    <Mail className="w-6 h-6" />
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