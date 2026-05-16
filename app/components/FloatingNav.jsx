"use client";

import { useState } from "react";
import { User, Briefcase, Globe, MessageCircle, QrCode, Plus, X, Share2, Info, MessageSquare } from "lucide-react";

export default function FloatingNav({ primaryColor = "#4f46e5" }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', icon: User, label: 'Profile' },
    { id: 'about', icon: Briefcase, label: 'About' },
    { id: 'social', icon: Globe, label: 'Social' },
    { id: 'contact', icon: MessageCircle, label: 'Contact' },
    { id: 'share', icon: QrCode, label: 'Share' }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {/* 🧭 NAVIGATION MENU */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {navItems.map((item, idx) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 group"
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-white/10">
              {item.label}
            </span>
            <div className="w-12 h-12 bg-white border border-slate-100 shadow-2xl rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110" style={{ hoverBackgroundColor: primaryColor }}>
               <item.icon size={20} className="group-hover:stroke-current" />
            </div>
          </a>
        ))}
      </div>

      {/* 🔘 MAIN TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 z-[101] group relative overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? (
          <X className="w-7 h-7 text-white transition-transform duration-500 rotate-0" />
        ) : (
          <div className="relative">
            <Plus className="w-7 h-7 text-white transition-transform duration-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75"></div>
          </div>
        )}
      </button>

      <style jsx>{`
        div[hoverBackgroundColor]:hover {
          background-color: var(--hover-bg);
        }
      `}</style>
      <style dangerouslySetInnerHTML={{ __html: `
        .group:hover div { 
          background-color: ${primaryColor} !important;
          color: white !important;
        }
      `}} />
    </div>
  );
}
