import React from 'react';

function Community() {
  const socialLinks = [
    {
      name: "YouTube",
      icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
      link: "https://youtube.com/@rohitxthakurr",
      color: "hover:bg-[#FF0000]",
      desc: "Watch live tournaments and highlights every day."
    },
    {
      name: "WhatsApp",
      icon: "https://cdn-icons-png.flaticon.com/512/3670/3670051.png",
      link: "https://whatsapp.com/channel/0029VbBYTHiGzzKL3FOueE47",
      color: "hover:bg-[#25D366]",
      desc: "Get instant notifications for new tournaments."
    },
    {
      name: "Discord",
      icon: "https://cdn-icons-png.flaticon.com/512/3670/3670157.png",
      link: "https://discord.gg/YOUR_LINK",
      color: "hover:bg-[#5865F2]",
      desc: "Join our server for match updates & support."
    },
    {
      name: "Instagram",
      icon: "https://cdn-icons-png.flaticon.com/512/3955/3955024.png",
      link: "https://www.instagram.com/rohitxthakurr?igsh=azV0bG5mMTFlMXY%3D&utm_source=qr",
      color: "hover:bg-[#E1306C]",
      desc: "Follow us for highlights and winner announcements."
    }
  ];

  return (
    <section id="community" className="py-24 text-white">
      <div className="max-w-4xl mx-auto px-6"> {/* Max-width thoda kam kiya 2x2 ke liye */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black italic uppercase text-purple-500  tracking-tighter mb-4">
            Join the <span className="text-blue-500">Community</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
            Be part of the fastest growing e-sports community
          </p>
        </div>

        {/* 2x2 Grid Logic: md:grid-cols-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialLinks.map((social, index) => (
            <a 
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-zinc-900/50 border border-white/5 p-8 rounded-4xl transition-all duration-300 group ${social.color} hover:-translate-y-2 flex flex-col items-center text-center`}
            >
              <div className="bg-black w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors shadow-xl">
                <img src={social.icon} alt={social.name} className="w-7 h-7 object-contain grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <h3 className="text-xl font-black mb-2 uppercase italic">{social.name}</h3>
              <p className="text-black italic  text-20px group-hover:text-white/80 transition-colors leading-relaxed">
                {social.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Community;