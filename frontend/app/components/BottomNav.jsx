"use client";

import { User, Briefcase, Globe, MessageCircle, QrCode, X, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function BottomNav({ data, primaryColor = "#4f46e5" }) {
  const [activeId, setActiveId] = useState('home');
  const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);
  const [sharePhone, setSharePhone] = useState("");
  const phoneInputRef = useRef(null);

  const detectCountryCode = () => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.includes("Kolkata") || tz.includes("Calcutta") || tz.includes("Asia/India") || tz.includes("India")) return "91";
      if (tz.includes("London") || tz.includes("Europe/London")) return "44";
      if (tz.includes("America") || tz.includes("US") || tz.includes("Canada")) return "1";
      if (tz.includes("Dubai") || tz.includes("Asia/Dubai")) return "971";
      if (tz.includes("Australia") || tz.includes("Sydney") || tz.includes("Melbourne")) return "61";
      if (tz.includes("Singapore")) return "65";
      if (tz.includes("Berlin") || tz.includes("Europe/Berlin")) return "49";
      if (tz.includes("Paris") || tz.includes("Europe/Paris")) return "33";
      if (tz.includes("Tokyo") || tz.includes("Asia/Tokyo")) return "81";
      if (tz.includes("Riyadh") || tz.includes("Asia/Riyadh")) return "966";
      if (tz.includes("Cairo") || tz.includes("Africa/Cairo")) return "20";
    } catch (e) {}
    return "91"; // Default fallback
  };

  const [countryCode, setCountryCode] = useState(detectCountryCode());

  useEffect(() => {
    const handleScroll = () => {
      if (showWhatsAppInput) return;
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showWhatsAppInput]);

  const navItems = [
    { id: 'home', icon: User, label: 'Profile' },
    { id: 'about', icon: Briefcase, label: 'Services' },
    { id: 'social', icon: Globe, label: 'Network' },
    { id: 'contact', icon: MessageCircle, label: 'Contact' },
    { id: 'share', icon: QrCode, label: 'Share', action: 'share' }
  ];

  const handleShareClick = (e) => {
    e.preventDefault();
    setShowWhatsAppInput(true);
    setTimeout(() => {
      if (phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
    }, 100);
  };

  if (showWhatsAppInput) {
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[500px] z-[100] bg-white/95 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-12px_40px_rgba(0,0,0,0.1)] px-4 pt-3 flex flex-col justify-center pb-safe animate-slideUp">
        <div className="w-full flex items-center gap-3 h-11">
          {/* Revert Standard Navigation Close Button */}
          <button 
            onClick={() => {
              setShowWhatsAppInput(false);
              setSharePhone("");
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 active:scale-95 transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dynamic Country Selector + Number Input Form */}
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200/60 rounded-2xl px-3 h-full shadow-inner">
            <div className="relative flex items-center">
              <select 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-transparent border-none text-[13px] font-bold text-slate-700 outline-none cursor-pointer appearance-none pr-4.5 z-10"
              >
                <option value="91">🇮🇳 +91</option>
                <option value="1">🇺🇸 +1</option>
                <option value="44">🇬🇧 +44</option>
                <option value="971">🇦🇪 +971</option>
                <option value="61">🇦🇺 +61</option>
                <option value="65">🇸🇬 +65</option>
                <option value="49">🇩🇪 +49</option>
                <option value="33">🇫🇷 +33</option>
                <option value="81">🇯🇵 +81</option>
                <option value="966">🇸🇦 +966</option>
                <option value="20">🇪🇬 +20</option>
              </select>
              <div className="absolute right-0.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[8px] font-bold leading-none">▼</div>
            </div>
            <div className="w-[1px] h-5 bg-slate-200/80 mx-2.5"></div>
            <input 
              ref={phoneInputRef}
              type="tel"
              placeholder="WhatsApp number to share..."
              value={sharePhone}
              onChange={(e) => setSharePhone(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-transparent border-none text-[13px] font-semibold text-slate-700 placeholder-slate-400 outline-none h-full"
            />
          </div>

          {/* Paper-Plane Send Action Button */}
          <button 
            onClick={() => {
              if (!sharePhone) return alert("Please enter a valid phone number!");
              const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
              const shareText = `Hi! Check out my digital visiting card on NexCard: ${currentUrl}`;
              const encodedText = encodeURIComponent(shareText);
              const whatsappUrl = `https://wa.me/${countryCode}${sharePhone}?text=${encodedText}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="w-11 h-11 text-white flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0 hover:-translate-y-0.5"
            style={{ backgroundColor: primaryColor, borderRadius: '14px' }}
            title="Send NexCard Link via WhatsApp"
          >
            <Send className="w-[18px] h-[18px]" />
          </button>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .pb-safe { padding-bottom: calc(env(safe-area-inset-bottom, 16px) + 12px); }
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          .animate-slideUp { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}} />
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[500px] z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex justify-between items-end px-4 pt-2 pb-safe">
      {navItems.map((item) => {
        const isActive = activeId === item.id && item.action !== 'share';
        return (
          <a
            key={item.id}
            href={item.action === 'share' ? '#' : `#${item.id}`}
            onClick={item.action === 'share' ? handleShareClick : undefined}
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
