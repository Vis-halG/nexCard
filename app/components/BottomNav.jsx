"use client";

import { User, Briefcase, Globe, MessageCircle, QrCode } from "lucide-react";
import { useState, useEffect } from "react";

export default function BottomNav({ data, primaryColor = "#4f46e5" }) {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'social', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 300) {
          current = section;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', icon: User, label: 'Profile' },
    { id: 'about', icon: Briefcase, label: 'Services' },
    { id: 'social', icon: Globe, label: 'Network' },
    { id: 'contact', icon: MessageCircle, label: 'Contact' },
    { id: 'share', icon: QrCode, label: 'Share', action: 'share' }
  ];

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({ 
        title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', 
        url: typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app' 
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex justify-between items-end px-4 pt-2 pb-safe">
      {navItems.map((item) => {
        const isActive = activeId === item.id && item.action !== 'share';
        return (
          <a
            key={item.id}
            href={item.action === 'share' ? '#' : `#${item.id}`}
            onClick={item.action === 'share' ? handleShare : undefined}
            className="flex flex-col items-center justify-center w-[20%] group transition-all"
          >
            <div 
              className={`relative p-1.5 transition-all duration-300 flex items-center justify-center ${isActive ? '-translate-y-1' : 'group-hover:-translate-y-1'}`} 
              style={{ color: isActive ? primaryColor : '#94a3b8' }}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              
              {/* Indicator Dot */}
              <div 
                 className={`absolute -bottom-1 w-1 h-1 rounded-full transition-all duration-300 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                 style={{ backgroundColor: primaryColor }}
              ></div>
            </div>
            
            <span 
              className={`text-[10px] font-medium tracking-wide transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} 
              style={{ color: isActive ? primaryColor : '#94a3b8' }}
            >
              {item.label}
            </span>
          </a>
        );
      })}
      
      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe { padding-bottom: calc(env(safe-area-inset-bottom, 16px) + 8px); }
      `}} />
    </div>
  );
}
