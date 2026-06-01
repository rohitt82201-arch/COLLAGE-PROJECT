import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2';

// 🔥 SMART URL JUGAD: Localhost par local chalaega, Vercel par Render chalaega
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://collage-project-rd22.onrender.com"; // 👈 Agar aapka Render URL alag hai toh yahan badlein

function JoinPage() {
  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);
  const [squadName, setSquadName] = useState("");
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);

  const fee = location.state?.fee || "0";
  const title = location.state?.title || "Tournament";

  const handleUpiPay = () => {
    const upiId = "yourname@upi"; 
    const name = "Supers Esports";
    const amount = fee;
    const note = `Entry_${title.replace(/\s+/g, '_')}_${squadName}`;
    const upiLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&tn=${note}&cu=INR`;
    window.location.href = upiLink;
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!utr || utr.trim().length < 4) {
      Swal.fire("Error", "Please enter a valid Transaction ID/UTR", "error");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // 🔥 REPLACED LOCALHOST WITH LIVE API_URL
      await axios.post(
        `${API_URL}/api/tournaments/join`,
        { 
          tournamentId: id, 
          utr: utr, 
          squadName: squadName 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        title: "REQUEST SENT!",
        text: "Payment verify hote hi apka slot confirm ho jayega.",
        icon: "success",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#ea580c"
      });
      navigate("/profile");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Join karne mein dikqat aayi", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white py-24 sm:py-32 px-4 sm:px-6 flex flex-col items-center justify-center ">
      <button 
        onClick={() => navigate("/")} 
        className="mb-6 sm:mb-8 text-orange-500 font-black uppercase text-xs sm:text-sm tracking-wider hover:underline transition-all align-self-start md:align-self-auto cursor-pointer"
      >
        ← Back to Home
      </button>
      
      {/* --- FORM CARD CONTAINER --- */}
      <div className="w-full max-w-xl bg-zinc-900 border border-white/10 rounded-3xl md:rounded-[2.5rem] p-5 sm:p-10 shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-black italic uppercase mb-4 text-orange-500 border-b border-white/5 pb-2">
          {title}
        </h1>
        
        {!showPayment ? (
          <form className="space-y-5 sm:space-y-6" onSubmit={(e) => { e.preventDefault(); setShowPayment(true); }}>
            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-widest mb-2 text-zinc-400">
                Squad Name
              </label>
              <input 
                required
                type="text" 
                value={squadName}
                onChange={(e) => setSquadName(e.target.value)}
                placeholder="Enter your Squad Name" 
                className="w-full bg-black border border-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl outline-none focus:border-orange-500 transition-all font-bold text-white text-sm sm:text-base" 
              />
            </div>

            <div className="p-4 sm:p-6 bg-orange-600/10 border border-orange-500/20 rounded-xl sm:rounded-2xl flex justify-between items-center">
              <span className="font-bold text-zinc-400 uppercase text-xs sm:text-sm tracking-widest">Entry Fee</span>
              <span className="text-2xl sm:text-3xl font-black text-white">₹{fee}</span>
            </div>

            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-xl shadow-lg transition-all uppercase italic cursor-pointer">
              Proceed to Pay ₹{fee}
            </button>
          </form>
        ) : (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in zoom-in duration-300">
            <p className="text-center text-zinc-400 font-bold italic text-sm sm:text-base">
              Squad: <span className="text-white uppercase font-black">{squadName}</span>
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={handleUpiPay}
                className="w-full bg-zinc-800 border border-white/5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-white hover:border-orange-500 transition-all flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm uppercase tracking-wide cursor-pointer"
              >
                📱 PAY VIA GPAY / PHONEPE
              </button>
            </div>

            <div className="flex flex-col items-center py-2 sm:py-4 bg-black/30 rounded-xl sm:rounded-2xl border border-white/5">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white p-2 rounded-xl mb-2 shadow-inner">
                <img src="/payment2.jpeg" alt="thakurrohit4546@oksbi" className="w-full h-full object-contain" />
              </div>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                Scan & Pay via any UPI App
              </p>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-5 sm:space-y-6">
              <div className="pt-4 border-t border-white/5">
                <label className="block text-[10px] sm:text-xs font-black uppercase tracking-widest mb-2 text-zinc-400">
                  Transaction ID (UTR)
                </label>
                <input 
                  required
                  type="text" 
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="Enter Transaction ID (12 digits)" 
                  className="w-full bg-black border border-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl outline-none focus:border-orange-500 transition-all text-white font-bold text-sm sm:text-base" 
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-500 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-xl shadow-lg transition-all uppercase italic disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Verifying..." : "Confirm Joining"}
                </button>
                
                <button 
                  type="button"
                  onClick={() => setShowPayment(false)} 
                  className="w-full text-zinc-500 hover:text-zinc-400 font-black text-xs uppercase tracking-widest py-2 transition-all cursor-pointer"
                >
                  Back to Details
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* --- RULES SECTION --- */}
      <div className="w-full max-w-xl mt-12 bg-black border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
          <span className="text-orange-500 font-bold text-base">⚠️</span>
          <h2 className="text-lg sm:text-xl font-black italic uppercase tracking-tight text-white">
            Tournament <span className="text-orange-500">Rules & Guidelines</span>
          </h2>
        </div>

        <ul className="space-y-4 text-xs sm:text-sm font-bold text-zinc-400">
          <li className="flex items-start gap-3">
            <span className="text-orange-500 mt-0.5 shrink-0">01.</span>
            <div>
              <strong className="text-white block mb-1">MATCH RULES:</strong>
              <span className="block text-zinc-400/80 leading-relaxed">
                • Custom Room ID & Password will be shared before match<br />
                • Teams must join on time<br />
                • Late entry may result in no re-match<br />
                • Device issues are player’s responsibility<br />
                • All players must use their main IDs only
              </span>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <span className="text-orange-500 mt-0.5 shrink-0">02.</span>
            <div>
              <strong className="text-white block mb-1">ALLOWED:</strong>
              <ul className="list-none space-y-0.5 text-zinc-400/80">
                <li>✔ Only in-game utilities allowed</li>
                <li>✔ Character skills allowed</li>
              </ul>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="text-orange-500 mt-0.5 shrink-0">03.</span>
            <div>
              <strong className="text-white block mb-1">STRICTLY NOT ALLOWED:</strong>
              <ul className="list-none space-y-0.5 text-zinc-400/80">
                <li>❌ Hacks / Mods / Scripts / Third-Party Apps</li>
                <li>❌ Emulator / VPN / Any Third-Party Devices</li>
                <li>❌ Teaming / Ghosting / Stream Sniping</li>
                <li>❌ Sharing Room ID & Password</li>
                <li>❌ Intentional Feeding / Match Fixing</li>
                <li>❌ Glitch Abuse / Bug Exploitation</li>
              </ul>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="text-orange-500 mt-0.5 shrink-0">04.</span>
            <div>
              <strong className="text-white block mb-2">POINTS SYSTEM:</strong> 
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 bg-zinc-900/50 p-3 rounded-xl border border-white/5 font-mono text-[11px] text-zinc-300">
                <div>🥇 1st – 12 Pts</div>
                <div>🥈 2nd – 9 Pts</div>
                <div>🥉 3rd – 8 Pts</div>
                <div>4th – 7 Pts</div>
                <div>5th – 6 Pts</div>
                <div>6th – 5 Pts</div>
                <div>7th – 4 Pts</div>
                <div>8th – 3 Pts</div>
                <div>9th – 2 Pts</div>
                <div>10th – 1 Pt</div>
              </div>
              <p className="mt-2 text-orange-400 font-black">🔫 Kill Points: 1 Kill = 1 Point</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default JoinPage;