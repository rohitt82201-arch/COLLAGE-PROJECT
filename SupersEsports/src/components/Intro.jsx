import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

function Intro() {
  const cards = [
    { id: 1, title: "UPCOMING TOURNAMENTS", info: "Join now and win Prizes", color: "bg-blue-600", link: "/#tournaments" },
    { id: 2, title: "TOP PLAYERS", info: "Check out the leaderboard", color: "bg-purple-600", link: "/#leaderboard" },
    { id: 3, title: "JOIN COMMUNITY", info: "Join Us On Other Platforms", color: "bg-indigo-600", link: "/#community" },
    { 
      id: 4, 
      title: "WATCH LIVE", 
      info: "Watch live games on our YOUTUBE CHANNEL", 
      color: "bg-red-500", 
      link: "https://youtube.com/@rohitxthakurr", 
      isExternal: true 
    },
    { id: 5, title: "FAST PAYOUTS", info: "Get your winning amount within 24 hours directly to UPI.", color: "bg-green-500", link: "/#footer" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    // FIX 1: 'min-h-screen' aur 'justify-between' ko bilkul saaf kar diya. 
    // Padding ko 'pt-28 md:pt-32 pb-6' kiya taaki navbar ke niche space tight rahe aur bottom me gap na bane.
    <section 
      id="home" 
      className="w-full bg-white px-4 sm:px-6 md:px-12 pt-28 md:pt-32 pb-6 block text-zinc-950"
    >
      {/* Main Framework Content */}
      {/* FIX 2: 'my-auto' hata diya taaki flexbox vertical spacing inject na kare */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-6 lg:gap-16 items-center max-w-7xl w-full mx-auto">
        
        {/* LEFT SIDE: Content + Supported Game Modes */}
        <div className="text-center md:text-left flex flex-col justify-center md:col-span-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none uppercase italic text-zinc-950 tracking-tighter">
            Let's Fight For <br />
            <span className="bg-linear-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent italic">
              Booyah!
            </span>{" "}
            Together
          </h1>
          
          <p className="text-zinc-500 font-black mt-4 max-w-md mx-auto md:mx-0 uppercase tracking-[0.2em] text-xs sm:text-sm leading-relaxed border-l-4 border-blue-600 pl-4">
            Supers Esports — Built to Dominate — Join Now, Win More.
          </p>

          {/* Game Format Tags */}
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            {["Solo", "Duo", "Squad", "Classic BR", "Clash Squad"].map((mode) => (
              <span key={mode} className="text-[10px] font-black uppercase tracking-wider bg-zinc-100 text-zinc-800 px-3 py-1 rounded-md border border-zinc-200/60">
                ⚡ {mode}
              </span>
            ))}
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <HashLink 
              smooth 
              to="/#tournaments"
              className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-black uppercase italic hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 text-center text-sm tracking-wider"
            >
              JOIN TOURNAMENT
            </HashLink>

            <HashLink 
              smooth 
              to="/#community"
              className="border-2 border-zinc-950 px-8 py-3.5 rounded-xl hover:bg-zinc-950 hover:text-white text-zinc-950 font-black uppercase italic bg-white transition-all hover:-translate-y-0.5 active:translate-y-0 text-center text-sm tracking-wider"
            >
              Join US →
            </HashLink>
          </div>
        </div>

        {/* RIGHT SIDE: Animated Shuffle Cards */}
        <div className="flex justify-center items-center w-full md:col-span-6">
          {/* FIX 3: min-h ko thoda optimize kiya taaki layout tight baithe */}
          <div 
            className={`w-full max-w-none min-h-55 sm:min-h-65 p-6 sm:p-8 rounded-4xl text-white shadow-2xl transition-all duration-700 ease-in-out transform flex flex-col justify-between
              ${cards[currentIndex].color} hover:scale-[1.01] border border-white/10`}
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Discover</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-2 mb-3 leading-none italic uppercase tracking-tight">
                {cards[currentIndex].title}
              </h2>
              <p className="font-bold text-xs sm:text-sm opacity-90 uppercase tracking-wide leading-snug max-w-xl">
                {cards[currentIndex].info}
              </p>
              
              <div className="mt-4 sm:mt-6 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white transition-all duration-500 w-1/3 animate-pulse"></div>
              </div>
            </div>

            <div className="mt-4">
              {cards[currentIndex].isExternal ? (
                <a 
                  href={cards[currentIndex].link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-center bg-white text-black font-black py-3 px-8 rounded-xl hover:bg-zinc-200 transition-all shadow-xl uppercase italic text-[10px] tracking-widest w-full sm:w-auto"
                >
                  WATCH NOW <span>→</span>
                </a>
              ) : (
                <HashLink 
                  smooth 
                  to={cards[currentIndex].link}
                  className="inline-block text-center bg-white text-black font-black py-3 px-8 rounded-xl hover:bg-zinc-200 transition-all shadow-xl uppercase italic text-[10px] tracking-widest w-full sm:w-auto"
                >
                  EXPLORE NOW <span>→</span>
                </HashLink>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* FIXED FOOTER MARGINS: Tightened Spacing */}
      {/* FIX 4: mt-12 ko mt-4 kiya aur bottom padding blocks ko control kiya taaki next component upar khinch jaye */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 mt-15">
        
        {/* Recent Live Winners Bar */}
        <div className="w-full bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-2 flex items-center overflow-hidden text-[11px] font-bold text-zinc-700">
          <span className="bg-red-500 text-white text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded mr-3 animate-pulse shrink-0">
            LATEST WINNERS
          </span>
          <marquee className="uppercase tracking-wide text-zinc-600">
            🔥 TR_ROHIT99 won ₹320 in Solo Match #1043 • ⚔️ TEAM_DEADLY secured Booyah! winning ₹1,200 • 💰 Payout processed for ALEX_FF via UPI • 🛡️ Fair Play Anti-Cheat logs clean for current season
          </marquee>
        </div>

        {/* Bottom Trust Badges */}
        {/* FIX 5: Padding-top 10 ko pt-4 kiya aur pb-8 ko pb-2 kiya */}
        <div className="hidden pb-2 pt-8  md:flex justify-between  items-center border-t border-zinc-200/60">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-blue-600 italic">50+</span>
            <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest leading-none">Tournaments<br/><span className="text-zinc-950">Hosted</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-purple-600 italic">10K+</span>
            <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest leading-none">Active<br/><span className="text-zinc-950">Gamers</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-emerald-600 italic">24H</span>
            <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest leading-none">Guaranteed<br/><span className="text-zinc-950">Payouts</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-orange-500 italic">FREE FIRE</span>
            <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest leading-none">Dedicated<br/><span className="text-zinc-950">Platform</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;