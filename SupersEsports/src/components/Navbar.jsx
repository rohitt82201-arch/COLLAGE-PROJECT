import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';

function Navbar({ user, onOpenLogin, onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile drawer status
  const navigate = useNavigate();

  // const displayName = user?.username || user?.name || "Player";

  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md px-4 sm:px-6 py-4 flex justify-between items-center border-b border-white/10">
        
        {/* LEFT SECTION: Logo (Responsive Text Sizes) */}
        <div className="shrink-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold cursor-pointer" onClick={() => { navigate("/"); closeMobileMenu(); }}>
            <span className="text-blue-500 uppercase italic">Supers</span>{" "}
            <span className="text-zinc-950 uppercase italic">Esports</span>
          </h1>
        </div>

        {/* CENTER SECTION: Desktop Menu Links (Clean Center View) */}
        <div className="hidden md:flex justify-center pl-70 flex-1 mx-4">
          <ul className="flex gap-8 text-lg lg:text-xl uppercase italic tracking-widest">
            <li><HashLink smooth to="/#" className="hover:text-blue-500 text-zinc-950 font-black cursor-pointer transition-colors">HOME</HashLink></li>
            <li><HashLink smooth to="/#tournaments" className="hover:text-blue-500 text-zinc-950 font-black cursor-pointer transition-colors">TOURNAMENTS</HashLink></li>
            <li><HashLink smooth to="/#leaderboard" className="hover:text-blue-500 text-zinc-950 font-black cursor-pointer transition-colors">LEADERBOARD</HashLink></li>
            <li><HashLink smooth to="/#community" className="hover:text-purple-600 text-zinc-950 font-black cursor-pointer transition-colors">COMMUNITY</HashLink></li>
          </ul>
        </div>

        {/* RIGHT SECTION: User Profile / Login / Hamburger Toggle */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {!user ? (
            <button 
              onClick={onOpenLogin}
              className="px-4 py-2 sm:px-6  sm:py-2 font-black rounded-xl bg-purple-600 text-white uppercase italic text-xs sm:text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              {/* Profile Pill Layout */}
              <div className="flex items-center gap-2 sm:gap-3 bg-zinc-950/10 py-1 px-2 sm:px-3 rounded-full border border-zinc-950/5">
                {/* <div className="hidden sm:flex flex-col text-right leading-none max-w-25 md:max-w-30">
                  <span className="text-xs font-black text-zinc-950 uppercase italic truncate">
                    {displayName}
                  </span>
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-tight mt-0.5">
                    Online
                  </span>
                </div> */}

                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500 bg-zinc-900 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform cursor-pointer shrink-0"
                >
                  <img 
                    src="https://api.dicebear.com/9.x/bottts-neutral/svg"
                    alt="Profile" 
                    className="w-6 h-6 sm:w-8 sm:h-8 object-cover" 
                  />
                </button>
              </div>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="px-4 py-2 border-b border-zinc-100 mb-1">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">IGN</p>
                    <p className="text-xs font-black text-blue-600 truncate">{user.ign || 'N/A'}</p>
                  </div>
                  
                  <button 
                    onClick={() => { navigate("/profile"); setShowProfileMenu(false); closeMobileMenu(); }}
                    className="w-full text-left px-4 py-2 text-xs font-black text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                  >
                    MY TOURNAMENTS
                  </button>
                  
                  <button 
                    onClick={() => { onLogout(); setShowProfileMenu(false); closeMobileMenu(); }}
                    className="w-full text-left px-4 py-2 text-xs font-black text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          )}

          {/* HAMBURGER TRIGGER BUTTON FOR MOBILE */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden flex-col gap-1.5 justify-center items-center w-8 h-8 rounded-lg border border-zinc-950/10 active:scale-90 transition-all cursor-pointer"
          >
            <span className={`h-0.5 w-5 bg-zinc-950 rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-5 bg-zinc-950 rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-5 bg-zinc-950 rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MOBILE LINKS DRAWER DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-18.25 left-0 w-full bg-white/95 backdrop-blur-lg border-b border-zinc-200 shadow-xl z-40 animate-in fade-in slide-in-from-top duration-300">
          <ul className="flex flex-col divide-y divide-zinc-100 font-black text-zinc-950 text-base uppercase italic tracking-widest p-2">
            <li>
              <HashLink smooth to="/#" onClick={closeMobileMenu} className="block w-full px-6 py-4 hover:bg-zinc-50 active:text-blue-500 rounded-xl">HOME</HashLink>
            </li>
            <li>
              <HashLink smooth to="/#tournaments" onClick={closeMobileMenu} className="block w-full px-6 py-4 hover:bg-zinc-50 active:text-blue-500 rounded-xl">TOURNAMENTS</HashLink>
            </li>
            <li>
              <HashLink smooth to="/#leaderboard" onClick={closeMobileMenu} className="block w-full px-6 py-4 hover:bg-zinc-50 active:text-blue-500 rounded-xl">LEADERBOARD</HashLink>
            </li>
            <li>
              <HashLink smooth to="/#community" onClick={closeMobileMenu} className="block w-full px-6 py-4 hover:bg-zinc-50 active:text-purple-600 rounded-xl">COMMUNITY</HashLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;