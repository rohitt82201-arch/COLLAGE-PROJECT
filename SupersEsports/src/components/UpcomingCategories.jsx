import React from 'react';

function UpcomingCategories() {
  const games = [
    {
      name: "BGMI / PUBG MOBILE",
      img: "bgmi.jpg", // Ek rugged classic BGMI feel wali image
      desc: "Squad Battle Royale • Tier 1 Scrims",
      devPercent: 85, // Kitna percent develop ho chuka hai
      status: "ALPHA TESTING"
    },
    {
      name: "VALORANT",
      img: "valo.jpg", // Valorant Jett/Phoenix style image
      desc: "5v5 Competitive • Spike Rush",
      devPercent: 40, // Kitna percent develop ho chuka hai
      status: "CORE SETUP"
    }
  ];

  return (
    <section id="upcoming" className="py-24 text-white relative overflow-hidden ">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800/20 blur-[150px] -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black italic uppercase p-2 bg-pink-500 tracking-tighter mb-4 text-zinc-100">
            Expand <span className="text-black">The Arena</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest pt-7 text-sm">
            Upcoming battlegrounds arriving soon
          </p>
        </div>

        {/* --- CARDS GRID (SABHI ORIGINAL HOVER & COMING SOON STYLING KE SATH) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {games.map((game, index) => (
            <div key={index} className="flex flex-col">
              
              {/* Actual Game Card Box */}
              <div 
                className="relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-950 aspect-16/10 shadow-2xl w-full"
              >
                {/* Image Container with Styling */}
                <img 
                  src={game.img} 
                  alt={game.name} 
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-110"
                />

                {/* Black & White to subtle Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/10 transition-opacity duration-500"></div>

                {/* Coming Soon Overlay - Positioned Center */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                  <div className="px-8 py-3 bg-white text-black rounded-full shadow-2xl transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-sm font-black uppercase italic tracking-widest">
                      COMING SOON
                    </span>
                  </div>
                </div>

                {/* Game Text - Bottom Left */}
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-green-500 transition-colors"></div>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">
                          STATUS: DEVELOPMENT
                      </span>
                  </div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tight text-white group-hover:text-white transition-colors mb-1">
                    {game.name}
                  </h3>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest group-hover:text-zinc-300 transition-colors">
                    {game.desc}
                  </p>
                </div>
              </div>

              {/* --- DEVELOPMENT PROGRESS BAR (CARD KE BAHAR AUR NICHE) --- */}
              <div className="mt-6 pt-10 px-4 w-full">
                {/* Info Text Header */}
                <div className="flex justify-between items-center mb-2 text-[11px] font-black tracking-wider uppercase">
                  <span className="text-zinc-500">Launch Roadmap</span>
                  <span className="text-pink-500 italic">{game.status} ({game.devPercent}%)</span>
                </div>

                {/* Outer Progress Tracker Track */}
                <div className="w-full bg-zinc-900 border border-white/5 h-2 rounded-full overflow-hidden relative shadow-inner">
                  <div 
                    className="h-full bg-linear-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-1000"
                    style={{ width: `${game.devPercent}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default UpcomingCategories;