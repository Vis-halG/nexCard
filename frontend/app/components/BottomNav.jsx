"use client";

import { User, Briefcase, Globe, MessageCircle, QrCode, X, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function BottomNav({ 
  data, 
  primaryColor = "#4f46e5", 
  showWhatsAppInput: propShowWhatsAppInput, 
  setShowWhatsAppInput: propSetShowWhatsAppInput,
  layout = "modern"
}) {
  const [activeId, setActiveId] = useState('home');
  const [localShowWhatsAppInput, setLocalShowWhatsAppInput] = useState(false);
  const showWhatsAppInput = propShowWhatsAppInput !== undefined ? propShowWhatsAppInput : localShowWhatsAppInput;
  const setShowWhatsAppInput = propSetShowWhatsAppInput !== undefined ? propSetShowWhatsAppInput : setLocalShowWhatsAppInput;
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
    { id: 'share', icon: QrCode, label: 'QR Code' }
  ];

  // Visual layout configurations
  let containerClass = "bg-white/90 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]";
  let itemContainerClass = "flex flex-col items-center justify-center w-[20%] group transition-all";
  let iconWrapperClass = "relative p-1.5 transition-all duration-300 flex items-center justify-center";
  let iconActiveOffsetClass = "-translate-y-1";
  let textClass = "text-[10px] font-medium tracking-wide transition-all duration-300";
  let customStyle = {};
  
  let wsContainerClass = "bg-white/95 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-12px_40px_rgba(0,0,0,0.1)]";
  let wsSendBtnRadius = "14px";
  let fontClass = "font-sans";

  if (layout === "classic") {
    containerClass = "bg-white border-t border-slate-100 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]";
    textClass = "text-[9px] font-bold tracking-[0.1em] transition-all uppercase";
  } else if (layout === "minimal") {
    // Brutalist styling
    containerClass = "bg-white border-t-4 border-black border-x-4 shadow-none";
    iconActiveOffsetClass = ""; // flat, no translations
    textClass = "text-[9px] font-black uppercase tracking-wider transition-all";
    wsContainerClass = "bg-white border-t-4 border-black border-x-4 shadow-none";
    wsSendBtnRadius = "0px";
  } else if (layout === "glass") {
    // Glassmorphic styling
    containerClass = "bg-white/50 backdrop-blur-xl border-t border-white/60 shadow-[0_-8px_32px_rgba(0,0,0,0.06)]";
    textClass = "text-[10px] font-semibold tracking-wide transition-all";
    wsContainerClass = "bg-white/60 backdrop-blur-xl border-t border-white/80 shadow-xl";
  } else if (layout === "bold") {
    // Signature bold styling
    containerClass = "bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-12px_30px_rgba(15,23,42,0.05)]";
    textClass = "text-[9px] font-extrabold uppercase tracking-widest transition-all";
  } else if (layout === "neo") {
    // Cyberpunk style
    containerClass = "bg-[#050505] border-t border-zinc-900 shadow-none";
    customStyle = { borderTopColor: `${primaryColor}44`, boxShadow: `0 -6px 15px ${primaryColor}15` };
    fontClass = "font-mono";
    textClass = "text-[8px] font-bold uppercase tracking-widest transition-all";
    wsContainerClass = "bg-[#050505] border-t border-zinc-900 shadow-none";
    wsSendBtnRadius = "0px";
  }

  if (showWhatsAppInput) {
    return (
      <div 
        className={`fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[500px] z-[100] px-4 pt-3 flex flex-col justify-center pb-safe animate-slideUp ${wsContainerClass} ${fontClass}`}
        style={layout === 'neo' ? { borderTopColor: `${primaryColor}44`, boxShadow: `0 -6px 20px ${primaryColor}22` } : (layout === 'minimal' ? { borderTopColor: '#000000' } : {})}
      >
        <div className="w-full flex items-center gap-3 h-11">
          {/* Revert Standard Navigation Close Button */}
          <button 
            onClick={() => {
              setShowWhatsAppInput(false);
              setSharePhone("");
            }}
            className={`w-10 h-10 flex items-center justify-center transition-all shrink-0 active:scale-95 ${layout === 'minimal' ? 'border-2 border-black rounded-none text-black hover:bg-black hover:text-white font-black' : (layout === 'neo' ? 'border border-zinc-800 rounded-none text-zinc-400 hover:text-white hover:bg-zinc-900' : 'rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50')}`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dynamic Country Selector + Number Input Form */}
          <div className={`flex-1 flex items-center px-3 h-full ${layout === 'minimal' ? 'bg-white border-2 border-black rounded-none' : (layout === 'neo' ? 'bg-black border border-zinc-800 rounded-none' : 'bg-slate-50 border border-slate-200/60 rounded-2xl shadow-inner')}`}>
            <div className="relative flex items-center">
              <select 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
                className={`bg-transparent border-none text-[13px] font-bold outline-none cursor-pointer appearance-none pr-4.5 z-10 ${layout === 'neo' ? 'text-white' : 'text-slate-700'}`}
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
              <div className={`absolute right-0.5 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] font-bold leading-none ${layout === 'neo' ? 'text-zinc-500' : 'text-slate-400'}`}>▼</div>
            </div>
            <div className={`w-[1px] h-5 mx-2.5 ${layout === 'neo' ? 'bg-zinc-800' : 'bg-slate-200/80'}`}></div>
            <input 
              ref={phoneInputRef}
              type="tel"
              placeholder="WhatsApp number to share..."
              value={sharePhone}
              onChange={(e) => setSharePhone(e.target.value.replace(/\D/g, ''))}
              className={`w-full bg-transparent border-none text-[13px] font-semibold placeholder-slate-400 outline-none h-full ${layout === 'neo' ? 'text-white' : 'text-slate-700'}`}
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
            className={`w-11 h-11 flex items-center justify-center transition-all shrink-0 ${layout === 'minimal' ? 'border-2 border-black rounded-none shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none' : 'shadow-md hover:-translate-y-0.5 active:scale-95'}`}
            style={{ 
              backgroundColor: layout === 'minimal' ? '#ffffff' : (layout === 'neo' ? 'black' : primaryColor),
              color: layout === 'minimal' ? '#000000' : (layout === 'neo' ? primaryColor : '#ffffff'),
              border: layout === 'neo' ? `1px solid ${primaryColor}` : (layout === 'minimal' ? '2px solid #000000' : 'none'),
              boxShadow: layout === 'neo' ? `0 0 10px ${primaryColor}44` : undefined,
              borderRadius: layout === 'minimal' ? '0px' : (layout === 'neo' ? '0px' : wsSendBtnRadius)
            }}
            title="Send NexCard Link via WhatsApp"
          >
            <Send className="w-[18px] h-[18px]" style={layout === 'minimal' ? { strokeWidth: 2.5 } : {}} />
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
    <div 
      className={`fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[500px] z-[100] flex justify-between items-end px-4 pt-2 pb-safe ${containerClass} ${fontClass}`}
      style={customStyle}
    >
      {navItems.map((item) => {
        const isActive = activeId === item.id;
        
        let itemColor = isActive ? primaryColor : '#94a3b8';
        if (layout === 'neo') {
          itemColor = isActive ? primaryColor : '#52525b'; // active: primary, inactive: zinc-600
        } else if (layout === 'minimal') {
          itemColor = isActive ? '#000000' : '#71717a'; // active: black, inactive: zinc-500
        }

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`${itemContainerClass} outline-none focus:outline-none`}
          >
            <div 
              className={`${iconWrapperClass} ${isActive ? iconActiveOffsetClass : `group-hover:${iconActiveOffsetClass}`}`} 
              style={{ color: itemColor }}
            >
              <item.icon 
                size={22} 
                strokeWidth={layout === 'minimal' ? (isActive ? 3 : 2.5) : (isActive ? 2.5 : 2)} 
              />
            </div>
            
            <span 
              className={textClass} 
              style={{ color: itemColor }}
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
