import React from 'react';
import { HashLink } from 'react-router-hash-link';

function Footer() {
  return (
   <footer id="footer" className="bg-zinc-950 border-t border-white/5 pt-16 pb-8 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand & Disclaimer Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">
              <span className="text-blue-500">Supers</span> Esports
            </h2>
            <p className="text-zinc-500 text-xs font-bold leading-relaxed uppercase tracking-wider">
              The ultimate destination for competitive mobile gaming. Join, compete, and conquer.
            </p>
            {/* LEGAL DISCLAIMER - Very Important */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[9px] text-zinc-500 font-bold leading-tight uppercase italic">
                Disclaimer: Supers Esports is an independent platform and is NOT affiliated with, authorized, or endorsed by Garena or Free Fire. All game assets and logos belong to their respective owners.
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col space-y-4 md:items-center">
            <h3 className="text-sm font-black uppercase italic tracking-widest text-zinc-400">Navigation</h3>
            <ul className="space-y-3 text-xs font-black uppercase tracking-widest">
              <li><HashLink smooth to="/#" className="hover:text-blue-500 transition-colors">Home</HashLink></li>
              <li><HashLink smooth to="/#tournaments" className="hover:text-blue-500 transition-colors">Tournaments</HashLink></li>
              <li><HashLink smooth to="/#leaderboard" className="hover:text-blue-500 transition-colors">Leaderboard</HashLink></li>
              <li><HashLink smooth to="/#community" className="hover:text-blue-500 transition-colors">Join Us</HashLink></li>
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div className="space-y-6 md:text-right">
            <h3 className="text-sm font-black uppercase italic tracking-widest text-zinc-400">Support</h3>
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest">Email: support@supersesports.com</p>
              <p className="text-xs font-black uppercase tracking-widest text-blue-500">Contact via WhatsApp for faster help</p>
            </div>
            {/* Minimal Social Icons */}
            <div className="flex gap-4 md:justify-end">
              {/* YouTube Link */}
              <a 
                href="https://youtube.com/@rohitxthakurr" // <-- Yahan apna YT channel ka link daalo
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-red-600 hover:scale-105 transition-all"
              >
                 <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" className="w-5 h-5 invert" alt="YT" />
              </a>

              {/* WhatsApp Link */}
              <a 
                href="https://whatsapp.com/channel/0029VbBYTHiGzzKL3FOueE47" // <-- Yahan Apna 10-digit number daalo (Country code '91' ke sath, bina space/plus ke)
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-green-500 hover:scale-105 transition-all"
              >
                 <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" className="w-5 h-5 invert" alt="WA" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            © 2026 SUPERS ESPORTS • DEVELOPED BY <span className="text-zinc-400">ROHIT</span>
          </p>
          <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Terms of service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;