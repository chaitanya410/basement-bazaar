import React from 'react';
import { Sparkles, Star, Award, Linkedin, Twitter, Mail } from 'lucide-react';
import Navbar from './Navbar'; // Adjust path if needed
import Footer from './Footer';
import { useTeam } from '@/hooks/useContent';
import { resolveImageUrl } from '@/lib/supabase';

/**
 * Per-card presentation, cycled by position. Kept in code rather than the
 * database: it is layout, not content, and the CMS should not have to know
 * about Tailwind classes.
 */
const CARD_STYLES = [
  { rotation: 'rotate-6', glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]' },
  { rotation: '-rotate-6', glow: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]' },
  { rotation: 'rotate-3', glow: 'group-hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]' },
  { rotation: 'rotate-6', glow: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]' },
  { rotation: '-rotate-3', glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]' },
  { rotation: '-rotate-6', glow: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]' },
];

const CoreTeam2026 = () => {
  const { data: team = [], isLoading } = useTeam(2026);

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
        {isLoading && (
          <p className="text-center text-gray-500 py-20">Loading the team…</p>
        )}
        <div className="space-y-20 md:space-y-32">
          {team.map((member, index) => (
            <div 
              key={member.id}
              className={`group relative flex flex-col md:flex-row items-center gap-12 md:gap-20 p-8 md:p-14 rounded-[2.5rem] bg-white/[0.015] hover:bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 backdrop-blur-sm shadow-2xl ${CARD_STYLES[index % CARD_STYLES.length].glow} ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* NEW: Giant Typographic Watermark (01, 02, etc.) */}
              <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 !== 0 ? 'md:-left-12' : 'md:-right-12'} text-[12rem] md:text-[20rem] font-black text-white/[0.02] pointer-events-none select-none z-0 group-hover:text-white/[0.04] group-hover:scale-105 transition-all duration-700`}>
                {String(index + 1).padStart(2, '0')}
              </div> 

              {/* Angled Photo Container */}
              <div className={`relative flex-shrink-0 z-10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0 ${CARD_STYLES[index % CARD_STYLES.length].rotation}`}>
                <div className="absolute -inset-3 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/20 to-transparent"></div>
                
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-[6px] border-white/90 shadow-2xl">
  <img 
    src={resolveImageUrl(member.image_path)} 
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
                  {(member.focus ?? []).map((skill, i) => (
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
      <Footer/>
    </section>
  );
};

export default CoreTeam2026;