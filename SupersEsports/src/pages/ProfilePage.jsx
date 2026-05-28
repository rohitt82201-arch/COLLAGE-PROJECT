import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [joinedMatches, setJoinedMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        // 1. Fetch User Profile
        const userRes = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data);

        // 2. Fetch Joined Tournaments
        const matchesRes = await axios.get('http://localhost:5000/api/tournaments/my-matches', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJoinedMatches(matchesRes.data || []);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Room Details section render logic
  const renderRoomDetails = (match) => {
    const isApproved = match.status?.toLowerCase() === 'approved';
    const info = match.tournamentInfo;

    // Rule 1: Agar status approved nahi hai, toh credentials hide rakho
    if (!isApproved) return null;

    return (
      <div className="mt-4 p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl transition-all">
        <p className="text-[10px] text-purple-400 uppercase font-black tracking-wider mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping"></span>
          Match Room Credentials
        </p>

        {/* Rule 2: Agar Admin ne MongoDB mein roomId daal di hai toh display karo */}
        {info && info.roomId ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
              <span className="text-[9px] text-zinc-500 block uppercase font-bold mb-0.5">Room ID</span>
              <span className="font-mono text-sm text-white select-all font-black tracking-wider">{info.roomId}</span>
            </div>
            <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
              <span className="text-[9px] text-zinc-500 block uppercase font-bold mb-0.5">Password</span>
              <span className="font-mono text-sm text-white select-all font-black tracking-wider">{info.roomPassword || "No Pass"}</span>
            </div>
          </div>
        ) : (
          <p className="text-[11px] text-zinc-500 italic bg-black/20 p-2 rounded-lg text-center border border-dashed border-zinc-800">
            ⏳ The admin is setting up the room. The room ID PASS will be available here 10-15 mins before match.
          </p>
        )}
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <h1 className="text-purple-500 font-black italic text-2xl animate-pulse uppercase">Loading Arena...</h1>
    </div>
  );

  if (!user && !loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
      <p className="font-black italic uppercase">Session Expired. Please Login Again.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 pt-28 pb-10 px-4 text-white font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* USER HEADER */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 rounded-full border-4 border-purple-600 p-1 bg-zinc-900 mb-4 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            <img 
              src="https://api.dicebear.com/9.x/toon-head/svg"
  alt="avatar" 
              className="w-full h-full rounded-full"
            />
          </div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
            {user?.username || user?.name || "Player"}
          </h1>
          <p className="text-purple-500 font-bold text-xs tracking-[0.2em] mt-1">
              IGN: {user?.ign || "NOT ASSIGNED"}
          </p>
        </div>

        {/* MATCHES LIST */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8 text-zinc-800">
            <div className="h-px flex-1 bg-zinc-800"></div>
            <h2 className="text-sm font-black uppercase italic text-zinc-500 tracking-[0.3em]">Combat History</h2>
            <div className="h-px flex-1 bg-zinc-800"></div>
          </div>

          {joinedMatches.length > 0 ? (
            joinedMatches.map((match, i) => (
              <div 
                key={i} 
                className="bg-zinc-900/80 border border-white/5 p-6 rounded-2xl hover:border-purple-500/40 transition-all group shadow-xl"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black uppercase italic text-xl leading-tight group-hover:text-purple-400 transition-colors">
                      {match.tournamentInfo?.title || "Free Fire Tournament"}
                    </h3>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase mt-2 tracking-widest">
                      Squad: <span className="text-zinc-300">{match.squadName}</span>
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-md border ${
                      match.status?.toLowerCase() === 'approved' 
                      ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                      : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                    }`}>
                      {match.status || 'Pending'}
                    </span>
                  </div>
                </div>

                {/* ID PASS COMPONENT */}
                {renderRoomDetails(match)}
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
              <p className="text-zinc-600 font-black uppercase italic text-sm tracking-widest">
                No active deployments.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;