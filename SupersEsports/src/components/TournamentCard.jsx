import React from 'react';
import { useNavigate } from 'react-router-dom';

function TournamentCard({ tournament, isLoggedIn, onOpenLogin }) {
  const navigate = useNavigate();

  // Database se dynamic slots nikalenge, agar nahi hai toh default 12 rahega
  const totalSlots = tournament?.totalSlots || 12;
  const joinedCount = tournament?.joinedUsers?.length || 0;
  const slotsLeft = totalSlots - joinedCount;
  
  // Progress bar ki percentage dynamic calculate hogi
  const progressWidth = Math.min((joinedCount / totalSlots) * 100, 100);

  const handleJoinClick = () => {
    if (!isLoggedIn) {
      alert("Pehle Login karein!");
      onOpenLogin();
      return;
    }
    if (slotsLeft <= 0) {
      alert("Slots Full! Agle tournament mein try karein.");
      return;
    }
    navigate(`/join/${tournament?._id}`);
  };

  return (
    <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-6 hover:border-blue-500/50 transition-all duration-500 group">
      <div className="relative h-40 w-full mb-6 overflow-hidden rounded-3xl bg-zinc-800">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop" 
          alt="Free Fire" 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      <h3 className="text-xl font-black uppercase italic text-white mb-4">
        {tournament?.title || "FF Tournament"}
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
          {/* Dynamic Slots: Ab database ke real slots ke hisab se badlega (e.g., 1/50, 2/12) */}
          <span className="text-zinc-500">Filled: {joinedCount}/{totalSlots}</span>
          <span className="text-blue-500">{slotsLeft > 0 ? `${slotsLeft} Left` : "0 Left"}</span>
        </div>
        
        {/* Live Loading Progress Bar */}
        <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
      </div>

      <button 
        onClick={handleJoinClick}
        disabled={slotsLeft <= 0}
        className={`w-full py-4 rounded-2xl font-black uppercase italic text-xs transition-all ${
          slotsLeft > 0 
            ? "bg-white text-black hover:bg-blue-600 hover:text-white cursor-pointer" 
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
        }`}
      >
        {slotsLeft > 0 ? "JOIN NOW" : "SLOTS FULL"}
      </button>
    </div>
  );
}

export default TournamentCard;