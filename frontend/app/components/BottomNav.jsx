"use client";

import { User, Briefcase, Globe, MessageCircle, QrCode, X, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import ShareActions from "./ShareActions";

export default function BottomNav({
  data,
  primaryColor = "#00C2FF",
  showWhatsAppInput: propShowWhatsAppInput,
  setShowWhatsAppInput: propSetShowWhatsAppInput,
  layout = "modern",
  inPreview = false
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
    } catch (e) { }
    return "91"; // Default fallback
  };

  const [countryCode, setCountryCode] = useState(detectCountryCode());

  useEffect(() => {
    const handleScroll = () => {
      if (showWhatsAppInput) return;
      const sections = ['home', 'about', 'social', 'contact', 'share'];
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



  const getCardUrl = () => {
    if (typeof window === 'undefined') return '';
    if (data?.username) {
      return `${window.location.origin}/${data.username}`;
    }
    return window.location.href;
  };

  const handleWhatsAppSend = () => {
    if (!sharePhone) return alert("Please enter a valid phone number!");
    const cardUrl = getCardUrl();
    const shareText = `Hi! Check out my digital visiting card on NexCard: ${cardUrl}`;
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/${countryCode}${sharePhone}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

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
    containerClass = "bg-white border-t-4 border-black border-x-4 shadow-none";
    iconActiveOffsetClass = "";
    textClass = "text-[9px] font-black uppercase tracking-wider transition-all";
    wsContainerClass = "bg-white border-t-4 border-black border-x-4 shadow-none";
    wsSendBtnRadius = "0px";
  } else if (layout === "glass") {
    containerClass = "bg-white/50 backdrop-blur-xl border-t border-white/60 shadow-[0_-8px_32px_rgba(0,0,0,0.06)]";
    textClass = "text-[10px] font-semibold tracking-wide transition-all";
    wsContainerClass = "bg-white/60 backdrop-blur-xl border-t border-white/80 shadow-xl";
  } else if (layout === "frosted") {
    containerClass = "bg-white/45 backdrop-blur-xl border border-white/40 shadow-[0_-8px_32px_rgba(31,38,135,0.06)] rounded-3xl";
    textClass = "text-[10px] font-bold uppercase tracking-wider transition-all";
    wsContainerClass = "bg-white/50 backdrop-blur-xl border border-white/50 shadow-xl rounded-t-3xl";
  } else if (layout === "bold") {
    containerClass = "bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-12px_30px_rgba(15,23,42,0.05)]";
    textClass = "text-[9px] font-extrabold uppercase tracking-widest transition-all";
  } else if (layout === "neo") {
    containerClass = "bg-[#050505] border-t border-zinc-900 shadow-none";
    customStyle = { borderTopColor: `${primaryColor}44`, boxShadow: `0 -6px 15px ${primaryColor}15` };
    fontClass = "font-mono";
    textClass = "text-[8px] font-bold uppercase tracking-widest transition-all";
    wsContainerClass = "bg-[#050505] border-t border-zinc-900 shadow-none";
    wsSendBtnRadius = "0px";
  }

  const cardUrl = getCardUrl();
  const theme = data?.theme || {};
  const primaryColorResolved = theme.primary || primaryColor || "#00C2FF";
  const qrLogo = theme.qrLogo || "none";

  // Custom distinct theme styling logic inside the drawer
  let drawerBg = theme.cardBg || "#ffffff";
  let textPrimaryColor = theme.textPrimary || "#0f172a";
  let textSecondaryColor = theme.textSecondary || "#64748b";

  let drawerClasses = `${inPreview ? "absolute" : "fixed"} bottom-0 left-0 right-0 mx-auto w-full max-w-[500px] z-[120] px-5 pt-5 pb-6 flex flex-col justify-center pb-safe border-t`;
  let closeBtnClasses = "w-8 h-8 flex items-center justify-center transition-all shrink-0 active:scale-95";
  let qrContainerClasses = "flex flex-col items-center mb-6";
  let qrFrameClasses = "p-4 flex items-center justify-center transition-all";
  let inputContainerClasses = "flex-1 flex items-center px-3 h-11 transition-all";
  let inputSelectClasses = "bg-transparent border-none text-[13px] font-bold outline-none cursor-pointer appearance-none pr-4.5 z-10";
  let inputFieldClasses = "w-full bg-transparent border-none text-[13px] font-semibold placeholder-slate-450 outline-none h-full";
  let inputSeparatorClasses = "w-[1px] h-5 mx-2.5";
  let sendBtnClasses = "w-11 h-11 flex items-center justify-center transition-all shrink-0";

  let drawerStyles = { ...customStyle, maxHeight: '95%', overflowY: 'auto' };
  let sendBtnStyles = {};
  let qrFrameStyles = {};
  let selectOptionStyle = { color: "#000000" };

  if (layout === "minimal") {
    drawerBg = "#ffffff";
    textPrimaryColor = "#000000";
    textSecondaryColor = "#71717a";
    drawerClasses += " bg-white border-t-4 border-black border-x-4 rounded-none shadow-none";
    closeBtnClasses += " border-2 border-black rounded-none text-black hover:bg-black hover:text-white font-black";
    qrFrameClasses += " bg-white border-4 border-black rounded-none shadow-[4px_4px_0_0_#000]";
    inputContainerClasses += " bg-white border-3 border-black rounded-none";
    inputSelectClasses += " text-black";
    inputFieldClasses += " text-black placeholder-zinc-400";
    inputSeparatorClasses += " bg-black";
    sendBtnClasses += " border-2 border-black rounded-none shadow-[3px_3px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";
    sendBtnStyles = { backgroundColor: '#ffffff', color: '#000000' };
  }
  else if (layout === "neo") {
    drawerBg = "#050505";
    textPrimaryColor = "#ffffff";
    textSecondaryColor = "#a1a1aa";
    drawerClasses += " bg-[#050505] border-t border-zinc-900 rounded-none shadow-[0_-10px_25px_rgba(0,255,204,0.08)]";
    drawerStyles.borderTopColor = `${primaryColorResolved}44`;
    closeBtnClasses += " border border-zinc-800 rounded-none text-zinc-400 hover:text-white hover:bg-zinc-900";
    qrFrameClasses += " bg-black border border-emerald-500/30 rounded-none shadow-[0_0_15px_rgba(0,255,204,0.15)]";
    inputContainerClasses += " bg-black border border-zinc-800 rounded-none focus-within:border-emerald-400";
    inputSelectClasses += " text-white";
    inputFieldClasses += " text-white placeholder-zinc-650";
    inputSeparatorClasses += " bg-zinc-800";
    sendBtnClasses += " border border-emerald-400 rounded-none shadow-[0_0_10px_rgba(0,255,204,0.2)] hover:bg-emerald-400/10";
    sendBtnStyles = { backgroundColor: 'black', color: primaryColorResolved, borderColor: primaryColorResolved };
    selectOptionStyle = { color: "#ffffff", backgroundColor: "#000000" };
  }
  else if (layout === "glass") {
    drawerBg = "rgba(255, 255, 255, 0.72)";
    drawerClasses += " backdrop-blur-2xl border-t border-white/60 shadow-[0_-12px_40px_rgba(0,0,0,0.06)] rounded-t-[2.5rem]";
    closeBtnClasses += " bg-white/40 hover:bg-white/65 border border-white/50 text-slate-700 rounded-full";
    qrFrameClasses += " bg-white/50 backdrop-blur-md rounded-3xl border border-white/65 shadow-inner";
    inputContainerClasses += " bg-white/30 border border-white/55 backdrop-blur-md rounded-2xl";
    inputSelectClasses += " text-slate-750";
    inputFieldClasses += " text-slate-800 placeholder-slate-450";
    inputSeparatorClasses += " bg-white/60";
    sendBtnClasses += " border border-white/60 backdrop-blur-md rounded-2xl hover:bg-white/60 shadow-sm";
    sendBtnStyles = { backgroundColor: 'rgba(255,255,255,0.4)', color: primaryColorResolved };
  }
  else if (layout === "bold") {
    drawerClasses += " bg-white border-t-2 border-slate-900 shadow-2xl rounded-t-[2.5rem]";
    closeBtnClasses += " bg-slate-50 hover:bg-slate-100 border-2 border-slate-900 rounded-xl text-slate-900";
    qrFrameClasses += " bg-white border-2 border-slate-900 rounded-3xl shadow-[5px_5px_0_0_#0f172a]";
    inputContainerClasses += " bg-white border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0_0_#0f172a]";
    inputSelectClasses += " text-slate-800";
    inputFieldClasses += " text-slate-800 placeholder-slate-400";
    inputSeparatorClasses += " bg-slate-200";
    sendBtnClasses += " border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0_0_#0f172a] hover:bg-slate-800";
    sendBtnStyles = { backgroundColor: '#0f172a', color: '#ffffff' };
  }
  else if (layout === "classic") {
    drawerClasses += " bg-white border-t border-slate-200 shadow-xl rounded-t-2xl";
    closeBtnClasses += " bg-slate-50 hover:bg-slate-100 text-slate-655 rounded-lg";
    qrFrameClasses += " bg-white rounded-xl shadow-sm border border-slate-200";
    inputContainerClasses += " bg-slate-50 border border-slate-250 rounded-xl focus-within:ring-1 focus-within:ring-blue-600";
    inputSelectClasses += " text-slate-700";
    inputFieldClasses += " text-slate-800 placeholder-slate-400";
    inputSeparatorClasses += " bg-slate-200";
    sendBtnClasses += " rounded-xl shadow-sm hover:bg-blue-700";
    sendBtnStyles = { backgroundColor: primaryColorResolved, color: '#ffffff' };
  }
  else if (layout === "neumorphism") {
    const bgVal = theme.background || "#E8ECF2";
    const accentVal = theme.accent || "#FFE156";
    drawerBg = bgVal;
    drawerClasses += " border-t-0 rounded-t-[2.5rem] shadow-none";
    drawerStyles.boxShadow = "0 -15px 35px rgba(165, 177, 198, 0.35)";
    
    closeBtnClasses += " text-slate-700 transition-all border-0 shadow-sm";
    closeBtnClasses = closeBtnClasses.replace("bg-slate-50", "").replace("hover:bg-slate-100", "");
    closeBtnClasses += " rounded-full";
    drawerStyles.background = bgVal;

    qrFrameClasses += " border-0 transition-all";
    qrFrameStyles = {
      boxShadow: "inset 4px 4px 8px rgba(165, 177, 198, 0.35), inset -4px -4px 8px rgba(255, 255, 255, 0.8)",
      background: bgVal,
      borderRadius: "1.75rem"
    };

    inputContainerClasses = "flex-1 flex items-center px-3 h-11 transition-all rounded-2xl border-0";
    inputContainerClasses += " shadow-[inset_3px_3px_6px_rgba(165,177,198,0.3),_inset_-3px_-3px_6px_rgba(255,255,255,0.8)]";
    
    inputSelectClasses += " text-slate-800";
    inputFieldClasses += " text-slate-800 placeholder-slate-400";
    inputSeparatorClasses += " bg-slate-300";
    
    sendBtnClasses += " rounded-2xl border-0 transition-all active:scale-95";
    sendBtnStyles = {
      background: `linear-gradient(135deg, ${primaryColorResolved}, ${accentVal}dd)`,
      color: '#ffffff',
      boxShadow: "4px 4px 10px rgba(165, 177, 198, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.7)"
    };
  }
  else if (layout === "frosted") {
    drawerBg = "rgba(255, 255, 255, 0.45)";
    drawerClasses += " backdrop-blur-xl border border-white/50 shadow-[0_-12px_40px_rgba(31,38,135,0.06)] rounded-t-[2.5rem]";
    closeBtnClasses += " bg-white/30 hover:bg-white/60 border border-white/40 text-slate-700 rounded-full";
    qrFrameClasses += " bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-inner";
    inputContainerClasses += " bg-white/20 border border-white/50 backdrop-blur-md rounded-2xl";
    inputSelectClasses += " text-slate-750";
    inputFieldClasses += " text-slate-800 placeholder-slate-450";
    inputSeparatorClasses += " bg-white/50";
    sendBtnClasses += " border border-white/50 backdrop-blur-md rounded-2xl hover:bg-white/60 shadow-sm";
    sendBtnStyles = { backgroundColor: 'rgba(255,255,255,0.3)', color: primaryColorResolved };
  }
  else {
    // modern / default
    drawerClasses += " bg-white border-t border-slate-200/60 shadow-[0_-12px_40px_rgba(0,0,0,0.1)] rounded-t-[2.5rem]";
    closeBtnClasses += " rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100";
    qrFrameClasses += " bg-white rounded-3xl shadow-sm border border-slate-100/80";
    inputContainerClasses += " bg-slate-50 border border-slate-200/60 rounded-2xl shadow-inner focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500/40";
    inputSelectClasses += " text-slate-700";
    inputFieldClasses += " text-slate-700 placeholder-slate-400";
    inputSeparatorClasses += " bg-slate-200/80";
    sendBtnClasses += " shadow-md hover:-translate-y-0.5 active:scale-95";
    sendBtnStyles = { backgroundColor: primaryColorResolved, color: '#ffffff', borderRadius: wsSendBtnRadius };
  }

  return (
    <>
      <AnimatePresence>
        {showWhatsAppInput && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowWhatsAppInput(false);
                setSharePhone("");
              }}
              className={`${inPreview ? "absolute" : "fixed"} inset-0 bg-black/45 z-[115] backdrop-blur-sm cursor-pointer`}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={drawerClasses}
              style={{
                ...drawerStyles,
                backgroundColor: drawerBg,
                paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 12px)'
              }}
            >
            {/* Header */}
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-sm font-bold tracking-tight uppercase" style={{ color: textPrimaryColor }}>Share Card</span>
              <button
                onClick={() => {
                  setShowWhatsAppInput(false);
                  setSharePhone("");
                }}
                className={closeBtnClasses}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QR Code Container */}
            <div className={qrContainerClasses}>
              <div className={qrFrameClasses} style={qrFrameStyles}>
                <QRCodeSVG
                  value={cardUrl || 'https://nexcard.app'}
                  size={130}
                  level="Q"
                  className="rounded-lg"
                  fgColor="#0f172a"
                  {...(qrLogo === 'avatar' && data?.image ? {
                    imageSettings: {
                      src: data.image,
                      x: null,
                      y: null,
                      height: 32,
                      width: 32,
                      excavate: true,
                    }
                  } : {})}
                />
              </div>
              <span className="text-[10px] font-bold mt-2.5 uppercase tracking-wider" style={{ color: textSecondaryColor }}>Scan or share QR Code</span>
            </div>

            {/* Quick App Actions Row */}
            <div className="w-full mb-6">
              <ShareActions data={data} layout={layout} primaryColor={primaryColorResolved} />
            </div>

            {/* WhatsApp Direct Field */}
            <div className="w-full border-t border-slate-250/20 pt-4" style={layout === 'neo' ? { borderTopColor: '#1a1a1a' } : {}}>
              <span className="text-[10px] font-extrabold uppercase tracking-wider mb-2.5 block" style={{ color: textSecondaryColor }}>Send directly on WhatsApp</span>
              <div className="w-full flex items-center gap-3 h-11">
                <div className={inputContainerClasses}>
                  <div className="relative flex items-center">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className={inputSelectClasses}
                      style={inputSelectClasses.includes('text-white') ? { color: '#ffffff' } : {}}
                    >
                      <option value="91" style={selectOptionStyle}>🇮🇳 +91</option>
                      <option value="1" style={selectOptionStyle}>🇺🇸 +1</option>
                      <option value="44" style={selectOptionStyle}>🇬🇧 +44</option>
                      <option value="971" style={selectOptionStyle}>🇦🇪 +971</option>
                      <option value="61" style={selectOptionStyle}>🇦🇺 +61</option>
                      <option value="65" style={selectOptionStyle}>🇸🇬 +65</option>
                      <option value="49" style={selectOptionStyle}>🇩🇪 +49</option>
                      <option value="33" style={selectOptionStyle}>🇫🇷 +33</option>
                      <option value="81" style={selectOptionStyle}>🇯🇵 +81</option>
                      <option value="966" style={selectOptionStyle}>🇸🇦 +966</option>
                      <option value="20" style={selectOptionStyle}>🇪🇬 +20</option>
                    </select>
                    <div className={`absolute right-0.5 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] font-bold leading-none ${layout === 'neo' ? 'text-zinc-500' : 'text-slate-400'}`}>▼</div>
                  </div>
                  <div className={inputSeparatorClasses}></div>
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    placeholder="WhatsApp number to share..."
                    value={sharePhone}
                    onChange={(e) => setSharePhone(e.target.value.replace(/\D/g, ''))}
                    className={inputFieldClasses}
                  />
                </div>

                <button
                  onClick={handleWhatsAppSend}
                  className={sendBtnClasses}
                  style={sendBtnStyles}
                  title="Send via WhatsApp"
                >
                  <Send className="w-[18px] h-[18px]" style={layout === 'minimal' ? { strokeWidth: 2.5 } : {}} />
                </button>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      <div
        className={`${inPreview ? "absolute" : "fixed"} bottom-0 left-0 right-0 mx-auto w-full max-w-[500px] z-[100] flex justify-between items-end px-4 pt-2 ${containerClass} ${fontClass}`}
        style={{
          ...customStyle,
          paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 8px)'
        }}
      >
        {navItems.map((item) => {
          const isActive = activeId === item.id;

          let itemColor = isActive ? primaryColor : '#94a3b8';
          if (layout === 'neo') {
            itemColor = isActive ? primaryColor : '#52525b';
          } else if (layout === 'minimal') {
            itemColor = isActive ? '#000000' : '#71717a';
          }

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${itemContainerClass} outline-none focus:outline-none cursor-pointer`}
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
      </div>
    </>
  );
}
