import React, { useState } from 'react';

function Leaderboard() {
  const [activeTab, setActiveTab] = useState('teams');

  // Dummy Data
  const teamsData = [
    { rank: 1, name: "GodLike Esports", points: 250 },
    { rank: 2, name: "Soul", points: 210 },
    { rank: 3, name: "Team Xspark", points: 190 },
     { rank: 4, name: "Team Gods", points: 190 },
      { rank: 5, name: "Team Rusher", points: 190 },
  ];

  const playersData = [
    { rank: 1, name: "LegendJod", points: 45 },
    { rank: 2, name: "Darkvizard", points: 38 },
    { rank: 3, name: "Goblin", points: 35 },
     { rank: 4, name: "Zoro", points: 30 },
      { rank: 5, name: "Kai", points: 25 },
  ];

  const displayData = activeTab === 'teams' ? teamsData : playersData;

  return (
    // Section id add ki taaki nav-links kaam karein aur responsive padding handle ho sake
    <section id="leaderboard" className="py-12 md:py-20 text-white px-4 sm:px-6">
      <div className="max-w-4xl mx-auto ">
        {/* Title text-3xl on mobile, text-5xl on desktop */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic p-2 bg-purple-600 uppercase text-center mb-8 md:mb-10 tracking-tight">
          Leaderboard
        </h2>
        
        {/* Toggle Buttons: sm:gap-4 aur text-sm mobile par width control karega */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-8 md:mb-12">
          <button 
            onClick={() => setActiveTab('teams')}
            className={`px-5 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'teams' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            TOP TEAMS
          </button>
          <button 
            onClick={() => setActiveTab('players')}
            className={`px-5 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'players' ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            TOP PLAYERS
          </button>
        </div>

        {/* Leaderboard Table Container: overflow-x-auto is the ultimate mobile fix */}
        <div className="bg-zinc-900 rounded-2xl md:rounded-4xl overflow-hidden border border-white/5 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700">
          {/* min-w-[450px] guarantee karega ki table data mobile par bhi readable rahe bina kachra huye */}
          <table className="w-full text-left min-w-112.5 md:min-w-full">
            <thead className="bg-white/5 uppercase text-[10px] sm:text-xs tracking-widest text-zinc-500">
              <tr>
                <th className="p-4 sm:p-6 w-20 sm:w-28">Rank</th>
                <th className="p-4 sm:p-6">Name</th>
                <th className="p-4 sm:p-6 text-right w-24 sm:w-32">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm sm:text-base">
              {displayData.map((item) => (
                <tr key={item.rank} className="hover:bg-white/5 transition-colors">
                  {/* Rank color tabs ke mutabik handle hoga */}
                  <td className={`p-4 sm:p-6 font-black ${activeTab === 'teams' ? 'text-blue-500' : 'text-purple-500'}`}>
                    #{item.rank}
                  </td>
                  <td className="p-4 sm:p-6 font-bold text-zinc-200 truncate max-w-45 sm:max-w-none">
                    {item.name}
                  </td>
                  <td className="p-4 sm:p-6 text-right font-mono text-orange-500 font-bold">
                    {item.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;