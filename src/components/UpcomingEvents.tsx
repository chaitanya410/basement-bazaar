import React from 'react';
import { Calendar, MapPin, Trophy, Zap, ArrowRight, Timer } from 'lucide-react';
// Import your poster here. Adjust the path based on your folder structure!
import sportifyPoster from '/sportifyPoster.jpeg'; 
import Navbar from './Navbar';
import Footer from './Footer';

const UpcomingEvents = () => {
  return (
    <section className="min-h-screen bg-[#050505] py-20 relative overflow-hidden font-sans">
       <Navbar />

      {/* Background Ambient Glows (Illuminated effect) */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-lime-400/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Zap className="w-4 h-4 text-lime-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-300 uppercase tracking-widest">Next Big Thing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-purple-500">Events</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-lime-400 to-purple-500 rounded-full"></div>
        </div>

        {/* District-App Style Event Card */}
        <div className="group relative rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-4 md:p-8 hover:border-white/[0.1] transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Subtle hover glow behind the card */}
          <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: The Poster */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(163,230,53,0.15)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition-shadow duration-500 border border-white/10">
                <img 
                  src={sportifyPoster} 
                  alt="Sportify Event Poster" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
                  Registration Open
                </div>
              </div>
            </div>

            {/* Right Column: Event Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <h3 className="text-4xl md:text-6xl font-black text-white mb-2 italic tracking-tight">
                SPORTIFY
              </h3>
              <p className="text-xl md:text-2xl text-lime-400 font-bold mb-6 tracking-wide">
                Clash of the Champions
              </p>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                The Basements Social Forum brings you the most electrifying sports festival of the year! 
                Whether you rule the cricket pitch, dominate the Badminton court, or strike lightning on the PickleBall court and show your precision on carrom boards. 
                Sportify is your battleground. Gather your squad, feel the adrenaline, and compete for ultimate glory under the stadium lights. 
              </p>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
                    <Calendar className="w-6 h-6" />
                  </div>
                   <div>
                    <p className="text-sm text-gray-500">Auction</p>
                    <p className="font-semibold text-white">May 15</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sportify Will Be Out</p>
                    <p className="font-semibold text-white">May 23rd - 24th</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <div className="p-3 bg-lime-500/20 text-lime-400 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="font-semibold text-white">Will be out soon</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prize Pool</p>
                    <p className="font-semibold text-white">Exciting Rewards</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <div className="p-3 bg-orange-500/20 text-orange-400 rounded-lg">
                    <Timer className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-semibold text-white">Register by 14th May</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-auto">
               <a 
  href="https://docs.google.com/forms/d/e/1FAIpQLSfizskxxrEjn9sf1c46GhYnTnrSWP7YogynPWHqFSDW8UypbA/viewform"
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-lime-400 to-lime-500 text-black font-bold py-4 px-8 rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:scale-[1.02] transition-all duration-300"
>
  Register Now
  <ArrowRight className="w-5 h-5" />
</a>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 text-white border border-white/20 font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300">
                  View Rulebook
                </button>
              </div>

            </div>
          </div>
        </div>
       
      </div>
      <Footer/>
    </section>
  );
};

export default UpcomingEvents;