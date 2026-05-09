
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-ngo-dark text-white pt-16 pb-8">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           <div className="space-y-4">
//             <Link to="/" className="flex items-center space-x-2">
//               <span className="inline-block h-8 w-8 rounded-full bg-ngo-blue"></span>
//               <span className="font-display text-xl font-bold">Basements Social Forum</span>
//             </Link>
//             <p className="text-gray-400 max-w-xs">
//               Empowering communities in Wardha through social initiatives, education, and cultural engagement.
//             </p>
//           </div>
          
//           <div>
//             <h3 className="font-display text-xl mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/" className="text-gray-400 hover:text-ngo-blue transition-colors">Home</Link>
//               </li>
//               <li>
//                 <Link to="/welcome" className="text-gray-400 hover:text-ngo-blue transition-colors">Events</Link>
//               </li>
//               {/* <li>
//                 <Link to="/recruitment" className="text-gray-400 hover:text-ngo-blue transition-colors">Join Our Team</Link>
//               </li>
//               <li>
//                 <Link to="/login" className="text-gray-400 hover:text-ngo-blue transition-colors">Member Login</Link>
//               </li> */}
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="font-display text-xl mb-4">Contact Us</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li>Wardha, India</li>
//               <li>thebasements2021@gmail.com</li>
//               <li>+91 8888450455</li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-500 text-sm">
//             © {new Date().getFullYear()} The Basements Social Forum. All rights reserved.
//           </p>
//           <div className="flex space-x-6 mt-4 md:mt-0">
//             <a href="https://www.facebook.com/people/The-Basements/100086494540817/" className="text-gray-400 hover:text-ngo-blue transition-colors">
//               Facebook
//             </a>
//             <a href="https://x.com/the_basements?s=09" className="text-gray-400 hover:text-ngo-blue transition-colors">
//               Twitter
//             </a>
//             <a href="https://www.instagram.com/the_basements_?igshid=MzRIODBiNWFIZA" className="text-gray-400 hover:text-ngo-blue transition-colors">
//               Instagram
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;






import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react'; // Added icons

const Footer = () => {
  return (
    <footer className="bg-ngo-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="inline-block h-8 w-8 rounded-full bg-ngo-blue"></span>
              <span className="font-display text-xl font-bold">Basements Social Forum</span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Empowering communities in Wardha through social initiatives, education, and cultural engagement.
            </p>
          </div>
          
          <div>
            <h3 className="font-display text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-ngo-blue transition-colors">Home</Link>
              </li>
               <li>
                <Link to="/about" className="text-gray-400 hover:text-ngo-blue transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/welcome" className="text-gray-400 hover:text-ngo-blue transition-colors">Events</Link>
              </li>
                 <li>
                <Link to="/coreTeam" className="text-gray-400 hover:text-ngo-blue transition-colors">Core Team 2026</Link>
              </li>
              <li>
                <Link to="/upcoming-events" className="text-gray-400 hover:text-ngo-blue transition-colors">Upcoming Events</Link>
              </li>
              {/* <li>
                <Link to="/recruitment" className="text-gray-400 hover:text-ngo-blue transition-colors">Join Our Team</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-ngo-blue transition-colors">Member Login</Link>
              </li> */}
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-xl mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Wardha, India</li>
              <li>thebasements2021@gmail.com</li>
              <li>+91 8888450455</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} The Basements Social Forum. All rights reserved.
          </p>
          <div className="order-1 md:order-2 group cursor-default">
            <p className="text-lg font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_12px_rgba(236,72,153,0.8)] group-hover:drop-shadow-[0_0_25px_rgba(236,72,153,1)] transition-all duration-500 animate-pulse">
              Made with love by Chaitu
            </p>
          </div>
          
          {/* Illuminated Social Links Section */}
         <div className="flex flex-wrap gap-6 mt-6 md:mt-0">
            
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/people/The-Basements/100086494540817/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Made text-blue-500 permanent */}
              <Facebook className="w-5 h-5 text-blue-500 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] group-hover:brightness-125" />
              <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">Facebook</span>
            </a>
            
            {/* Twitter */}
            <a 
              href="https://x.com/the_basements?s=09" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Made text-sky-400 permanent */}
              <Twitter className="w-5 h-5 text-sky-400 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] group-hover:brightness-125" />
              <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">Twitter</span>
            </a>
            
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/the_basements_?igshid=MzRIODBiNWFIZA" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Made text-pink-500 permanent */}
              <Instagram className="w-5 h-5 text-pink-500 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)] group-hover:brightness-125" />
              <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">Instagram</span>
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;