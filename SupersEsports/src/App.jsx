import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components Import
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import TournamentSection from "./components/TournamentSection";
import UpcomingCategories from "./components/UpcomingCategories";
import Leaderboard from "./components/Leaderboard";
import Community from "./components/Community";
import Footer from "./components/Footer";
import JoinPage from "./components/JoinPage";
import LoginModal from "./components/LoginModal";

// Naye Components aur Pages
import ProfilePage from "./pages/ProfilePage"; 
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // --- REFRESH FIX LOGIC ---
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleOpenLogin = () => setIsLoginModalOpen(true);
  const handleCloseLogin = () => setIsLoginModalOpen(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
    console.log("User Logged In:", userData.name);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="w-full bg-white text-zinc-950 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
        
        <Navbar 
          onOpenLogin={handleOpenLogin} 
          user={user} 
          onLogout={handleLogout} 
        />

        <Routes>
          <Route 
            path="/" 
            element={
              <main className="w-full block">
                
                {/* Intro Content block */}
                <Intro />
                
                {/* Tournament Section block */}
                <TournamentSection onOpenLogin={handleOpenLogin} />
                
                <Leaderboard />
                
                <UpcomingCategories />
                
                <Community />
                
              </main>
            } 
          />

          <Route path="/join/:id" element={<JoinPage />} />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage user={user} />
              </ProtectedRoute>
            } 
          />
        </Routes>

        <Footer />

        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={handleCloseLogin} 
          onLoginSuccess={handleLoginSuccess} 
        />

      </div>
    </Router>
  );
}

export default App;