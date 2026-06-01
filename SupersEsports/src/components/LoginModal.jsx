import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

// 🔥 SMART URL JUGAD: Localhost par local chalaega, Vercel par Render chalaega
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://supers-esports-backend.onrender.com"; 

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // 👈 State setup sahi hai
  
  const [formData, setFormData] = useState({
    name: '',     
    email: '',
    password: '',
    phone: '',    
    ign: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 FIXED: loading(true) ko badal kar setLoading(true) kiya
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    try {
      const res = await axios.post(`${API_URL}${endpoint}`, formData);
      
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        // Agar parent component (App.jsx ya Navbar.jsx) se function aaya hai toh hi run karega
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess(res.data.user); 
        }
        
        onClose();
        
        Swal.fire({
          icon: 'success',
          title: 'WELCOME BACK!',
          text: `Taiyar ho jao, ${res.data.user?.name || 'Champion'}!`,
          background: '#09090b',
          color: '#fff',
          confirmButtonColor: '#2563eb'
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'REGISTERED!',
          text: 'Ab login karke battlefield join karein.',
          background: '#09090b',
          color: '#fff',
          confirmButtonColor: '#2563eb'
        });
        setIsLogin(true);
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'OOPS...',
        text: err.response?.data?.message || 'Check your credentials!',
        background: '#09090b',
        color: '#fff'
      });
    } finally {
      setLoading(false); // 👈 State reset sahi hai
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10000 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity" onClick={onClose}></div>

      <div className="relative bg-zinc-950 border border-white/10 w-full max-w-md p-10 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in duration-300 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[80px]"></div>

        <button onClick={onClose} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-all">✕</button>

        <div className="mb-10 relative">
          <h2 className="text-4xl font-black italic uppercase text-blue-500 tracking-tighter">
            {isLogin ? 'Login' : 'Signup'}
          </h2>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.3em] mt-2">
            {isLogin ? 'Access your dashboard' : 'Join the elite squad'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          
          {!isLogin && (
            <>
              <div className="group">
                <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">Full Name</label>
                <input name="name" required type="text" placeholder="Your Name" onChange={handleChange}
                  className="w-full bg-black border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all text-white font-bold" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">In-Game Name</label>
                <input name="ign" required type="text" placeholder="e.g. SUPERS_ROHIT" onChange={handleChange}
                  className="w-full bg-black border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all text-white font-bold" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">WhatsApp No</label>
                <input name="phone" required type="tel" placeholder="91XXXXXXXXXX" onChange={handleChange}
                  className="w-full bg-black border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all text-white font-bold" />
              </div>
            </>
          )}

          <div className="group">
            <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">Email Address</label>
            <input name="email" required type="email" placeholder="email@example.com" onChange={handleChange}
              className="w-full bg-black border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all text-white font-bold" />
          </div>

          <div className="group">
            <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">Password</label>
            <input name="password" required type="password" placeholder="••••••••" onChange={handleChange}
              className="w-full bg-black border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all text-white font-bold" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black text-white uppercase italic tracking-[0.2em] transition-all mt-4 shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50">
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
          </button>
        </form>

        <p className="text-center text-[10px] text-zinc-500 uppercase font-black mt-8 tracking-widest">
          {isLogin ? "New member?" : "Already a player?"} 
          <span onClick={() => setIsLogin(!isLogin)} className="text-blue-500 cursor-pointer ml-2 hover:underline">
            {isLogin ? 'Register Now' : 'Login Here'}
          </span>
        </p>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default LoginModal;