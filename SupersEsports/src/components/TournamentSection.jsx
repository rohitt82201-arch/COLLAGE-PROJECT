import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

function TournamentSection({ onOpenLogin }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Typo completely fixed here

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tournaments');
        if (res.data && res.data.length > 0) {
          setTournaments(res.data);
        } else {
          setTournaments([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setTournaments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  // 🔄 Shuffling Interval System
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🎯 INDEX BASED MAPPING WITH ALAG-ALAG TIMINGS
  const leftCards = [
    { 
      data: tournaments[0] || { _id: null, totalSlots: 50, joinedUsers: [] }, 
      title: tournaments[0]?.title || "Solo Master", 
      img: "card1.png", 
      fee: "50",
      time: "📅 TODAY - 04:00 PM" 
    },
    { 
      data: tournaments[1] || { _id: null, totalSlots: 8, joinedUsers: [] }, 
      title: tournaments[1]?.title || "Clash Squad", 
      img: "card2.png", 
      fee: "100",
      time: "📅 TODAY - 06:30 PM" 
    }
  ];

  const rightCards = [
    { 
      data: tournaments[2] || { _id: null, totalSlots: 12, joinedUsers: [] }, 
      title: tournaments[2]?.title || "Full Map Squad", 
      img: "card5.png", 
      fee: "200", 
      time: "📅 TODAY - 08:00 PM" 
    },
    { 
      data: tournaments[3] || { _id: null, totalSlots: 12, joinedUsers: [] }, 
      title: tournaments[3]?.title || "Pro Tournament", 
      img: "card6.png", 
      fee: "500", 
      time: "📅 TODAY - 10:00 PM" 
    }
  ];

  const currentLeft = leftCards[index];
  const currentRight = rightCards[index];

  const handleJoin = (card) => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'HOLD ON!',
        text: 'Login first to join the battle!',
        icon: 'warning',
        background: '#18181b',
        color: '#fff',
        confirmButtonColor: '#9333ea',
        confirmButtonText: 'LOGIN NOW',
      }).then((result) => {
        if (result.isConfirmed && typeof onOpenLogin === "function") {
          onOpenLogin();
        }
      });
      return;
    }

    const targetId = card.data?._id;

    if (!targetId) {
       return Swal.fire({
         title: "Tournament Error",
         text: "DATA CANT BE LOADED IN DB ,TRY REFRESHING!",
         icon: "error",
         background: '#18181b',
         color: '#fff'
       });
    }

    const joinedCount = card.data?.joinedUsers?.length || 0;
    const totalSlots = card.data?.totalSlots || 12;
    if (joinedCount >= totalSlots) {
      return Swal.fire({
        title: "Slots Full!",
        text: "THIS TOURNAMENT IS FULL!",
        icon: "error",
        background: '#18181b',
        color: '#fff'
       });
    }

    navigate(`/join/${targetId}`, { 
      state: { title: card.title, fee: card.fee } 
    });
  };

  if (loading) return (
    <section id="tournaments" className="w-full bg-white py-24 text-center scroll-mt-20">
      <div className="text-zinc-950 font-black italic tracking-tighter text-2xl animate-pulse">
        LOADING ARENA...
      </div>
    </section>
  );

  return (
    <section id="tournaments" className="relative block w-full pt-4 pb-12 md:pb-20 text-zinc-950 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* HEADER AREA */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white bg-purple-500 p-2 text-center uppercase italic tracking-tight shadow-lg max-w-4xl mx-auto">
            Tournaments
          </h2>
          
          <p className="text-black font-black mt-4 max-w-2xl mx-auto uppercase tracking-[0.25em] text-[10px] sm:text-xs leading-relaxed italic border-x-2 border-purple-500/40 px-4 pt-7">
            "Room ID & Password will be shared 15 mins before the match"
          </p> 
        </div>
        
        {/* Grid settings layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          
          {/* LEFT CARD */}
          <div className="relative h-72 sm:h-80 md:h-96 rounded-3xl md:rounded-[2.5rem] overflow-hidden border-2 border-orange-500/20 group shadow-2xl bg-zinc-900">
            <img src={currentLeft.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="FF" />
            <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-center items-center text-center p-4 sm:p-6 text-white">
              <h3 className="text-2xl sm:text-3xl font-black italic uppercase mb-1 px-2">{currentLeft.title}</h3>
              
              <p className="bg-orange-600 text-white px-3 py-1 rounded-full font-black text-[9px] sm:text-[10px] uppercase mb-2 tracking-widest">
                Entry Fee: ₹{currentLeft.fee}
              </p>
              
              <p className="text-orange-500 font-black mb-1 italic text-sm sm:text-base">
                SLOTS: {currentLeft.data?.joinedUsers?.length || 0} / {currentLeft.data?.totalSlots || 12}
              </p>

              {/* TIMING DISPLAY */}
              <p className="text-zinc-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-lg mt-1">
                {currentLeft.time}
              </p>

              <button 
                onClick={() => handleJoin(currentLeft)}
                className="bg-purple-600 text-white px-8 py-2.5 sm:px-10 sm:py-3 rounded-xl font-bold mt-4 sm:mt-5 uppercase italic hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg text-xs sm:text-sm cursor-pointer"
              >
                JOIN NOW
              </button>
            </div>
          </div>
          

          {/* RIGHT CARD */}
          <div className="relative h-72 sm:h-80 md:h-96 rounded-3xl md:rounded-[2.5rem] overflow-hidden border-2 border-blue-500/20 group shadow-2xl bg-zinc-900">
            <img src={currentRight.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="FF" />
            <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-center items-center text-center p-4 sm:p-6 text-white">
              <h3 className="text-2xl sm:text-3xl font-black italic uppercase mb-1 px-2">{currentRight.title}</h3>
              
              <p className="bg-blue-600 text-white px-3 py-1 rounded-full font-black text-[9px] sm:text-[10px] uppercase mb-2 tracking-widest">
                Entry Fee: ₹{currentRight.fee}
              </p>
              
              <p className="text-blue-500 font-black mb-1 italic text-sm sm:text-base">
                SLOTS: {currentRight.data?.joinedUsers?.length || 0} / {currentRight.data?.totalSlots || 12}
              </p>

              {/* TIMING DISPLAY */}
              <p className="text-zinc-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-lg mt-1">
                {currentRight.time}
              </p>

              <button 
                onClick={() => handleJoin(currentRight)}
                className="bg-blue-600 text-white px-8 py-2.5 sm:px-10 sm:py-3 rounded-xl font-bold mt-4 sm:mt-5 uppercase italic hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg text-xs sm:text-sm cursor-pointer"
              >
                JOIN NOW
              </button>
            </div>
          </div>

        </div>

        {/* MOTIVATIONAL QUOTE BELOW THE GRID */}
        <div className="text-center mt-12">
          <p className="text-zinc-500 font-black max-w-2xl mx-auto uppercase tracking-[0.25em] text-[10px] sm:text-xs leading-relaxed italic border-x-2 border-purple-500/40 px-4">
            "Rise through the ranks, eliminate the squad, and claim your Booyah!"
          </p> 
        </div>

      </div>
    </section>
  );
}

export default TournamentSection;