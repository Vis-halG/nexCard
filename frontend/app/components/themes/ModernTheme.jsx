"use client";

import { useState } from "react";
import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, User, Briefcase, Send, QrCode, Eye, Calendar, CreditCard, Share2, Star, MoreHorizontal } from "lucide-react";

import { QRCodeSVG } from "qrcode.react";
import BottomNav from "../BottomNav";

const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);


export default function ModernTheme({ data, inPreview = false }) {
  const [showMore, setShowMore] = useState(false);
  const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const actions = [];
  if (data?.phone) {
    actions.push({
      id: "call",
      href: `tel:${data.phone}`,
      icon: (cls) => <Phone className={cls} />,
      label: "Call"
    });
    actions.push({
      id: "whatsapp",
      href: `https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`,
      icon: (cls) => <WhatsAppIcon className={cls} />,
      label: "WhatsApp",
      target: "_blank",
      rel: "noreferrer"
    });
  }
  if (data?.address) {
    actions.push({
      id: "location",
      href: "#map",
      icon: (cls) => <MapPin className={cls} />,
      label: "Location"
    });
  }
  if (data?.email) {
    actions.push({
      id: "mail",
      href: `mailto:${data.email}`,
      icon: (cls) => <Mail className={cls} />,
      label: "Mail"
    });
  }
  if (data?.phone) {
    actions.push({
      id: "sms",
      href: `sms:${data.phone}`,
      icon: (cls) => <MessageSquare className={cls} />,
      label: "SMS"
    });
  }

  const hasMore = actions.length > 4;
  const visibleActions = hasMore ? actions.slice(0, 3) : actions;
  const remainingActions = hasMore ? actions.slice(3) : [];

  const generateVcard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${data?.name || 'User'}\nTITLE:${data?.title || ''}\nTEL;TYPE=WORK,VOICE:${data?.phone || ''}\nEMAIL;TYPE=WORK:${data?.email || ''}\nURL:${data?.website || ''}\nADR;TYPE=WORK:;;${data?.address || ''};;;;\nEND:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data?.name || 'Contact').replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEnquiry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const msg = formData.get('message');
    window.location.href = `mailto:${data?.email || ''}?subject=Enquiry from ${name}&body=${msg}`;
  };

  const theme = data?.theme || {};
  const primaryColor = theme.primary || "#4f46e5";
  const bgColor = theme.background || "#ffffff";
  const fontClass = theme.font || "font-sans";
  const borderRadius = theme.radius || "1rem";
  const avatarRadius = theme.avatarStyle === 'circle' ? '9999px' : (theme.avatarStyle === 'rounded' ? '1.5rem' : '0px');
  
  // Custom Gradients
  const bgGradient = theme.bgGradient || "none";
  const gradientPresets = {
    sunset: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    cyberpunk: 'linear-gradient(135deg, #FF007F 0%, #7F00FF 100%)',
    ocean: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
    forest: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    mystic: 'linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)',
    custom: `linear-gradient(135deg, ${theme.gradientStart || '#4F46E5'} 0%, ${theme.gradientEnd || '#EC4899'} 100%)`
  };
  const bgGradientStyle = bgGradient !== 'none' ? gradientPresets[bgGradient] : null;

  // Text Alignment
  const textAlign = theme.textAlign || "center";
  const textAlignClass = textAlign === 'left' ? 'text-left items-start' : (textAlign === 'right' ? 'text-right items-end' : 'text-center items-center');

  // Fine-grained Granular Colors
  const cardBg = theme.cardBg || "#ffffff";
  const textPrimary = theme.textPrimary || "#0f172a";
  const textSecondary = theme.textSecondary || "#64748b";
  const cardText = theme.cardText || "#1e293b";
  const btnBg = theme.btnBg || primaryColor;
  const btnText = theme.btnText || "#ffffff";
  const inputBg = theme.inputBg || "#f1f5f9";
  const inputText = theme.inputText || "#0f172a";

  // Card Depth & Shadow
  const cardStyle = theme.cardStyle || 'standard';
  const shadowDepth = theme.shadowDepth || "subtle";
  let shadowClass = 'shadow-lg';
  let shadowStyle = {};

  if (shadowDepth === 'none') {
    shadowClass = 'shadow-none';
  } else if (shadowDepth === 'bold') {
    shadowClass = 'border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
  } else if (shadowDepth === 'glow') {
    shadowStyle = { boxShadow: `0 15px 40px -10px ${primaryColor}55` };
    shadowClass = 'border-slate-100/50';
  }

  const cardClasses = cardStyle === 'glass' 
    ? `backdrop-blur-md border border-white/40 ${shadowDepth === 'glow' ? '' : 'shadow-xl'}` 
    : (cardStyle === 'outline' ? 'bg-transparent border border-slate-200 shadow-none' : `border border-slate-100 ${shadowClass}`);

  const cardStyleOverride = cardStyle === 'glass' 
    ? { backgroundColor: 'rgba(255, 255, 255, 0.7)' } 
    : (cardStyle === 'outline' ? {} : { backgroundColor: cardBg });

  // Banner Size
  const bannerSize = theme.bannerSize || "standard";
  const bannerHeightClass = bannerSize === 'compact' ? 'h-36' : (bannerSize === 'tall' ? 'h-80' : 'h-64');

  // Avatar Border Frame
  const avatarBorder = theme.avatarBorder || "thick";
  let avatarBorderClass = 'border-4 border-white';
  let avatarBorderStyle = {};

  if (avatarBorder === 'none') {
    avatarBorderClass = 'border-0';
  } else if (avatarBorder === 'thin') {
    avatarBorderClass = 'border-2 border-white';
  } else if (avatarBorder === 'glow') {
    avatarBorderClass = 'border-4 border-white';
    avatarBorderStyle = { boxShadow: `0 0 25px 8px ${primaryColor}77` };
  }

  // Social Icons Presentation style
  const socialStyle = theme.socialStyle || "colored";

  // QR Code Branding
  const qrLogo = theme.qrLogo || "none";

  // Action Button Animations
  const actionAnimation = theme.actionAnimation || "float";
  let actionBtnClass = "w-[52px] h-[52px] shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-300 flex items-center justify-center hover:-translate-y-1 group";
  if (actionAnimation === 'float') {
    actionBtnClass = "w-[52px] h-[52px] shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center group";
  } else if (actionAnimation === 'pulse') {
    actionBtnClass = "w-[52px] h-[52px] shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group";
  } else if (actionAnimation === 'glow') {
    actionBtnClass = "w-[52px] h-[52px] shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:scale-105 transition-all duration-300 flex items-center justify-center group";
  } else if (actionAnimation === 'bounce') {
    actionBtnClass = "w-[52px] h-[52px] shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:animate-bounce transition-all duration-300 flex items-center justify-center group";
  }

  // Bio Font Size
  const bioFontSize = theme.bioFontSize || "standard";
  const bioFontSizeClass = bioFontSize === 'compact' ? 'text-xs' : (bioFontSize === 'editorial' ? 'text-lg md:text-xl font-medium' : 'text-[15px]');

  // Card Border Outline Patterns
  const cardBorderPattern = theme.cardBorderPattern || "none";
  let borderPatternClass = '';
  let borderPatternStyle = {};
  if (cardBorderPattern === 'dashed') {
    borderPatternClass = 'border-2 border-dashed border-slate-300';
  } else if (cardBorderPattern === 'neon-glow') {
    borderPatternClass = 'border-2';
    borderPatternStyle = { borderColor: primaryColor, boxShadow: `0 0 15px ${primaryColor}44` };
  }

  // Form Aesthetics
  const formAesthetic = theme.formAesthetic || "flat";
  let formInputClass = "w-full px-5 py-4 transition-all placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 ";
  let formInputStyle = { backgroundColor: inputBg, color: inputText, border: `1px solid ${cardText}15` };
  if (formAesthetic === 'pill') {
    formInputClass += "rounded-full focus:bg-white";
  } else if (formAesthetic === 'brutalist') {
    formInputClass += "rounded-none focus:bg-slate-50";
    formInputStyle.border = '2px solid #0f172a';
  } else if (formAesthetic === 'frosted') {
    formInputClass += "rounded-2xl backdrop-blur-sm focus:bg-white/80";
  } else {
    // flat
    formInputClass += "rounded-2xl border-0 focus:bg-white";
  }

  const getActionBtnStyle = (actId, isHovered, bgStyle, fgStyle) => {
    let style = { borderRadius: borderRadius, backgroundColor: bgStyle, color: fgStyle };
    if (isHovered && actionAnimation === 'glow') {
      let glowColor = primaryColor;
      if (actId === 'whatsapp') glowColor = '#25D366';
      else if (actId === 'mail') glowColor = '#EA4335';
      else if (actId === 'location') glowColor = '#F59E0B';
      else if (actId === 'sms') glowColor = '#8B5CF6';
      style.boxShadow = `0 0 20px ${glowColor}aa`;
    }
    return style;
  };

  return (
    <div className={`min-h-screen flex justify-center ${fontClass} pb-28 selection:bg-black selection:text-white overflow-x-hidden`} style={{ scrollBehavior: "smooth", backgroundColor: bgColor }}>
      <div 
        className="w-full min-h-screen relative overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.05)] sm:rounded-b-[2.5rem]"
        style={{ background: bgGradientStyle || bgColor }}
      >
        <button 
          onClick={() => setShowWhatsAppInput(true)} 
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/70 hover:bg-white backdrop-blur-md border border-slate-200/50 flex items-center justify-center text-slate-700 shadow-md cursor-pointer"
        >
          <Share2 size={18} />
        </button>
        {/* ✨ Background Effects Layer */}
        {theme.bgEffect === 'mesh' && (
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ background: `radial-gradient(at 0% 0%, ${primaryColor}44 0, transparent 50%), radial-gradient(at 50% 0%, ${primaryColor}22 0, transparent 50%), radial-gradient(at 100% 0%, ${primaryColor}33 0, transparent 50%)` }}></div>
        )}

        {/* 🔥 HERO SECTION */}
        <div id="home" className="relative pb-10">
          <div 
            className={`${bannerHeightClass} w-full relative`} 
            style={data?.coverImage ? {
              backgroundImage: `url(${data.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              clipPath: "ellipse(120% 100% at 50% 0%)"
            } : { 
              background: `linear-gradient(145deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
              clipPath: "ellipse(120% 100% at 50% 0%)"
            }}
          >
            {data?.coverImage && <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>}
            {!data?.coverImage && <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)", backgroundSize: "32px 32px" }}></div>}
          </div>

          <div className={`px-6 relative -mt-24 flex flex-col ${textAlignClass}`}>
            <div 
              className={`w-40 h-40 ${avatarBorderClass} shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden bg-white relative z-10 transition-transform hover:scale-105 duration-500`}
              style={{ borderRadius: avatarRadius, ...avatarBorderStyle }}
            >
              <img 
                src={data?.image || "https://i.pravatar.cc/150"} 
                alt={data?.name || "profile"} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className={`mt-5 flex flex-col ${textAlignClass} w-full`}>
              <h1 className={`text-[28px] font-extrabold tracking-tight leading-tight ${textAlign === 'left' ? 'text-left' : (textAlign === 'right' ? 'text-right' : 'text-center')}`} style={{ color: textPrimary }}>
                {data?.name || "Your Name"}
              </h1>
              <p className={`font-medium text-[15px] mt-1 ${textAlign === 'left' ? 'text-left' : (textAlign === 'right' ? 'text-right' : 'text-center')}`} style={{ color: primaryColor }}>
                {data?.title || "Professional Title"}
              </p>
              {data?.company && (
                <p className={`font-medium text-sm mt-1 tracking-wide ${textAlign === 'left' ? 'text-left' : (textAlign === 'right' ? 'text-right' : 'text-center')}`} style={{ color: textSecondary }}>
                  at <span className="font-semibold" style={{ color: textPrimary }}>{data.company}</span>
                </p>
              )}
            </div>
          </div>

          {/* ⚡ CLEAN QUICK ACTIONS */}
          <div className="flex flex-col items-center gap-6 mt-8 px-6">
            <div className="flex justify-center flex-wrap gap-6 w-full">
              {visibleActions.map((act) => {
                const isHovered = hoveredId === act.id;
                let bgStyle = '#fff';
                let fgStyle = '#334155';
                if (isHovered) {
                  fgStyle = '#fff';
                  if (act.id === 'whatsapp') bgStyle = '#25D366';
                  else if (act.id === 'mail') bgStyle = '#EA4335';
                  else if (act.id === 'location') bgStyle = '#F59E0B';
                  else if (act.id === 'sms') bgStyle = '#8B5CF6';
                  else bgStyle = primaryColor;
                }

                return (
                  <a
                    key={act.id}
                    href={act.href}
                    target={act.target}
                    rel={act.rel}
                    onMouseEnter={() => setHoveredId(act.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={actionBtnClass}
                    style={getActionBtnStyle(act.id, isHovered, bgStyle, fgStyle)}
                  >
                    {act.id === 'whatsapp'
                      ? act.icon("w-5 h-5 fill-current")
                      : act.icon("w-5 h-5 stroke-current")
                    }
                  </a>
                );
              })}

              {hasMore ? (
                <button
                  onClick={() => setShowMore(!showMore)}
                  onMouseEnter={() => setHoveredId('more')}
                  onMouseLeave={() => setHoveredId(null)}
                  className={actionBtnClass}
                  style={getActionBtnStyle('more', hoveredId === 'more' || showMore, showMore || hoveredId === 'more' ? primaryColor : '#fff', showMore || hoveredId === 'more' ? '#fff' : '#334155')}
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              ) : (
                actions.slice(3, 4).map((act) => {
                  const isHovered = hoveredId === act.id;
                  let bgStyle = '#fff';
                  let fgStyle = '#334155';
                  if (isHovered) {
                    fgStyle = '#fff';
                    if (act.id === 'whatsapp') bgStyle = '#25D366';
                    else if (act.id === 'mail') bgStyle = '#EA4335';
                    else if (act.id === 'location') bgStyle = '#F59E0B';
                    else if (act.id === 'sms') bgStyle = '#8B5CF6';
                    else bgStyle = primaryColor;
                  }

                  return (
                    <a
                      key={act.id}
                      href={act.href}
                      target={act.target}
                      rel={act.rel}
                      onMouseEnter={() => setHoveredId(act.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={actionBtnClass}
                      style={getActionBtnStyle(act.id, isHovered, bgStyle, fgStyle)}
                    >
                      {act.id === 'whatsapp'
                        ? act.icon("w-5 h-5 fill-current")
                        : act.icon("w-5 h-5 stroke-current")
                      }
                    </a>
                  );
                })
              )}
            </div>

            {hasMore && showMore && (
              <div className="flex justify-center flex-wrap gap-6 w-full animate-in slide-in-from-top duration-300">
                {remainingActions.map((act) => {
                  const isHovered = hoveredId === act.id;
                  let bgStyle = '#fff';
                  let fgStyle = '#334155';
                  if (isHovered) {
                    fgStyle = '#fff';
                    if (act.id === 'whatsapp') bgStyle = '#25D366';
                    else if (act.id === 'mail') bgStyle = '#EA4335';
                    else if (act.id === 'location') bgStyle = '#F59E0B';
                    else if (act.id === 'sms') bgStyle = '#8B5CF6';
                    else bgStyle = primaryColor;
                  }

                  return (
                    <a
                      key={act.id}
                      href={act.href}
                      target={act.target}
                      rel={act.rel}
                      onMouseEnter={() => setHoveredId(act.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={actionBtnClass}
                      style={getActionBtnStyle(act.id, isHovered, bgStyle, fgStyle)}
                    >
                      {act.id === 'whatsapp'
                        ? act.icon("w-5 h-5 fill-current")
                        : act.icon("w-5 h-5 stroke-current")
                      }
                    </a>
                  );
                })}
              </div>
            )}
          </div>



          {/* 📥 SAVE CONTACT (Ultra Premium Button) */}
          <div className="px-8 mt-10">
            <button 
              onClick={generateVcard}
              className="w-full py-[18px] font-bold flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-400 relative overflow-hidden group"
              style={{ background: `linear-gradient(135deg, ${btnBg}, ${btnBg}ee)`, color: btnText, borderRadius: borderRadius }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Download className="w-[18px] h-[18px] relative z-10" />
              <span className="relative z-10 tracking-wide font-semibold text-[15px]">Save to Contacts</span>
            </button>
            
            {data?.calendarUrl && (
              <a 
                href={data.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full mt-4 py-[16px] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:bg-slate-50 transition-all duration-300"
                style={{ borderRadius: borderRadius, backgroundColor: cardBg, color: cardText, border: `1px solid ${cardText}15` }}
              >
                <Calendar className="w-4 h-4" style={{ color: cardText }} />
                <span>Book a Meeting</span>
              </a>
            )}
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* CLEAN CONTENT SECTIONS (Whitespace > Borders) */}
        {/* --------------------------------------------------------- */}
        <div className="space-y-8 px-8 pt-6">

          {/* 🌟 ABOUT SECTION */}
          {data?.about && (
            <div id="about" className="scroll-mt-6">
              <h2 className="text-[20px] font-bold mb-4 tracking-tight" style={{ color: textPrimary }}>About</h2>
              <p className={`${bioFontSizeClass} leading-relaxed font-normal`} style={{ color: textSecondary }}>{data.about}</p>
            </div>
          )}

          {/* 🛠 SPECIALTIES */}
          {data?.services?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[20px] font-bold mb-4 tracking-tight" style={{ color: textPrimary }}>Core Services</h2>
              <div className="flex flex-wrap gap-2.5">
                {data.services.map((s, i) => (
                  <span key={i} className="px-5 py-2.5 text-[13px] font-semibold rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors cursor-default" style={{ backgroundColor: cardBg, color: cardText, border: `1px solid ${cardText}15` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 🌐 SOCIAL MEDIA LINKS */}
          {data?.social && Object.values(data.social).some(Boolean) && (
          <div id="social" className="scroll-mt-6">
            <h2 className="text-[20px] font-bold mb-4 tracking-tight" style={{ color: textPrimary }}>Connect</h2>
            <div className="flex flex-wrap gap-8">
              {Object.entries(data.social).map(([key, val]) => {
                if (!val) return null;
                const Icon = {
                  instagram: InstagramIcon,
                  linkedin: LinkedinIcon,
                  twitter: TwitterIcon,
                  youtube: YoutubeIcon,
                  facebook: FacebookIcon
                }[key];

                const brandColors = {
                  instagram: '#E1306C',
                  linkedin: '#0077B5',
                  twitter: '#1DA1F2',
                  youtube: '#FF0000',
                  facebook: '#1877F2'
                };
                const brandColor = brandColors[key] || primaryColor;

                let socialClasses = "w-14 h-14 transition-all duration-300 flex items-center justify-center group";
                let socialStyles = { borderRadius: borderRadius };

                if (socialStyle === 'monochrome') {
                  socialClasses += " bg-slate-900 border-0 text-slate-300 hover:text-white hover:bg-black";
                } else if (socialStyle === 'outline') {
                  socialClasses += " bg-transparent border border-slate-200 text-slate-500 hover:border-slate-800 hover:text-slate-800";
                } else if (socialStyle === 'glow') {
                  socialClasses += " bg-white border border-slate-100 text-slate-400 hover:text-white";
                } else {
                  // colored
                  socialClasses += " bg-white border border-slate-100 text-slate-400 hover:text-white";
                }

                // Hover style hook for dynamic hover brand color
                const handleMouseEnter = (e) => {
                  if (socialStyle === 'colored') {
                    e.currentTarget.style.backgroundColor = brandColor;
                    e.currentTarget.style.borderColor = brandColor;
                  } else if (socialStyle === 'glow') {
                    e.currentTarget.style.backgroundColor = brandColor;
                    e.currentTarget.style.borderColor = brandColor;
                    e.currentTarget.style.boxShadow = `0 0 15px ${brandColor}99`;
                  }
                };

                const handleMouseLeave = (e) => {
                  if (socialStyle === 'colored' || socialStyle === 'glow') {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.borderColor = '#f1f5f9';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                };

                return (
                  <a 
                    key={key} 
                    href={val} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={socialClasses} 
                    style={socialStyles}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Icon className="w-6 h-6 group-hover:stroke-current" />
                  </a>
                );
              })}
            </div>
          </div>
          )}

          {/* 🖼 IMAGE GALLERY */}
          {data?.gallery?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[20px] font-bold text-slate-900 mb-4 tracking-tight">Gallery</h2>
              <div className="grid grid-cols-2 gap-8">
                {data.gallery.map((img, i) => img ? (
                  <div key={i} className="aspect-square overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.06)] relative group cursor-pointer focus-within:ring-2" style={{ borderRadius: borderRadius }}>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300"></div>
                    <img src={img} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                ) : null)}
              </div>
            </div>
          )}

          {/* 🎬 VIDEO EMBEDDING */}
          {data?.videos?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[20px] font-bold text-slate-900 mb-4 tracking-tight">Videos</h2>
              <div className="flex flex-col gap-8">
                {data.videos.map((vid, i) => (
                  <div key={i} className="w-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-slate-100 relative pt-[56.25%]" style={{ borderRadius: borderRadius }}>
                    <iframe className="absolute top-0 left-0 w-full h-full" src={vid.includes('youtube.com/watch?v=') ? vid.replace('watch?v=', 'embed/') : vid} title={`Video ${i + 1}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🔗 MODERN CUSTOM LINKS */}
          {data?.customLinks?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[20px] font-bold mb-4 tracking-tight" style={{ color: textPrimary }}>Important Links</h2>
              <div className="flex flex-col gap-8">
                {data.customLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className={`w-full flex items-center justify-between p-5 transition-all duration-300 group ${cardClasses} ${borderPatternClass}`} style={{ borderRadius: borderRadius, ...shadowStyle, ...borderPatternStyle, ...cardStyleOverride }}>
                    <span className="font-bold text-[15px]" style={{ color: cardText }}>{link.title}</span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:text-slate-800 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-colors">
                      <Globe className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 💳 PAYMENT INTEGRATION (Sleek UI) */}
          {data?.payment && (
            <div className="scroll-mt-6">
              <h2 className="text-[20px] font-bold mb-4 tracking-tight" style={{ color: textPrimary }}>Payments</h2>
              <div className="flex flex-col gap-8">
                {data.payment.upi && (
                  <div className={`px-5 py-4 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${cardClasses}`} style={{ ...shadowStyle, ...cardStyleOverride }}>
                    <span className="font-semibold text-[14px]" style={{ color: textSecondary }}>UPI ID</span>
                    <span className="text-[15px] font-bold font-mono tracking-tight" style={{ color: cardText }}>{data.payment.upi}</span>
                  </div>
                )}
                {data.gstNumber && (
                  <div className={`px-5 py-4 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${cardClasses}`} style={{ ...shadowStyle, ...cardStyleOverride }}>
                    <span className="font-semibold text-[14px]" style={{ color: textSecondary }}>GSTIN</span>
                    <span className="text-[15px] font-bold font-mono tracking-tight uppercase" style={{ color: cardText }}>{data.gstNumber}</span>
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center py-4 rounded-3xl font-bold shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 mt-2" style={{ backgroundColor: btnBg, color: btnText }}>
                    Make a Payment
                  </a>
                )}
                {data.payment.bankDetails && (
                  <div className="p-6 rounded-3xl border border-transparent shadow-inner mt-2" style={{ backgroundColor: `${cardText}09`, border: `1px solid ${cardText}15` }}>
                    <h3 className="font-bold text-[14px] mb-3 uppercase tracking-wider" style={{ color: textPrimary }}>Bank Details</h3>
                    <p className="text-[14px] whitespace-pre-line leading-relaxed font-medium" style={{ color: textSecondary }}>{data.payment.bankDetails}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 🗺 ADDRESS & MAP (Edge to Edge Radius) */}
          {data?.address && (
            <div id="map" className="scroll-mt-6">
              <h2 className="text-[20px] font-bold mb-4 tracking-tight" style={{ color: textPrimary }}>Location</h2>
              <p className="text-[15px] leading-relaxed mb-5 font-normal" style={{ color: textSecondary }}>{data.address}</p>
              
              <div className="w-full h-56 rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] relative mb-5 border border-slate-100">
                <iframe width="100%" height="100%" style={{ border: 0, position: 'absolute', top: 0, left: 0 }} loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}></iframe>
              </div>
              
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.address)}`} target="_blank" rel="noreferrer" className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:bg-slate-50 transition-all duration-300" style={{ color: cardText, backgroundColor: cardBg, border: `1px solid ${cardText}15` }}>
                <MapPin className="w-4 h-4" />
                Navigate
              </a>
            </div>
          )}

          {/* ✉ ENQUIRY FORM (Ultra Minimalistic) */}
          <div id="contact" className="scroll-mt-6 pt-6">
            <h2 className="text-[28px] font-extrabold mb-2 tracking-tight" style={{ color: textPrimary }}>Let&apos;s talk.</h2>
            <p className="text-[15px] mb-8 font-normal" style={{ color: textSecondary }}>Send me a direct message and I&apos;ll respond shortly.</p>

            <form onSubmit={handleEnquiry} className="space-y-8">
              <div>
                <input type="text" name="name" required placeholder="Full Name" className={formInputClass} style={{ ...formInputStyle, focusRingColor: primaryColor }} />
              </div>
              <div>
                <input type="tel" name="phone" placeholder="Phone Number" className={formInputClass} style={formInputStyle} />
              </div>
              <div>
                <textarea name="message" required placeholder="Your message..." rows="4" className={`${formInputClass} resize-none`} style={formInputStyle}></textarea>
              </div>
              <button type="submit" className="w-full py-[18px] rounded-2xl font-bold shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 mt-2" style={{ backgroundColor: btnBg, color: btnText }}>
                Send Message
              </button>
            </form>
          </div>

          {/* ⭐ GOOGLE REVIEWS (Glass Banner) */}
          {data?.googleReviewsUrl && (
            <div className="pt-6">
              <div className="rounded-[2rem] p-8 text-center relative overflow-hidden" style={{ backgroundColor: `${cardBg}`, border: `1px solid ${cardText}15` }}>
                <div className="flex justify-center mb-4 gap-1">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-6 h-6 text-amber-500 fill-amber-500 drop-shadow-sm" />)}
                </div>
                <h3 className="font-bold text-xl mb-1 tracking-tight" style={{ color: textPrimary }}>Rate your experience</h3>
                <p className="text-[14px] mb-6 font-medium" style={{ color: textSecondary }}>Loved working with us? Leave a review!</p>
                <a href={data.googleReviewsUrl} target="_blank" rel="noreferrer" className="inline-block w-full py-4 rounded-2xl font-bold bg-white/80 backdrop-blur-sm border border-white hover:bg-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all" style={{ backgroundColor: btnBg, color: btnText }}>
                  Write a Review
                </a>
              </div>
            </div>
          )}

          {/* 📲 SHARING & QR CODE (Minimalist) */}
          <div id="share" className="scroll-mt-6 pt-6 pb-4">
            <h2 className="text-[20px] font-bold mb-6 tracking-tight text-center" style={{ color: textPrimary }}>Share Profile</h2>
            <div className="flex flex-col items-center">
              <div className="p-5 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] mb-6 border border-slate-50" style={{ backgroundColor: cardBg }}>
                <QRCodeSVG 
                  value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} 
                  size={180} 
                  level="Q" 
                  className="rounded-xl" 
                  fgColor={textPrimary} 
                  {...(qrLogo === 'avatar' && data?.image ? {
                    imageSettings: {
                      src: data.image,
                      x: null,
                      y: null,
                      height: 38,
                      width: 38,
                      excavate: true,
                    }
                  } : {})}
                />
              </div>
              <button onClick={() => {
                if (navigator.share) { navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
              }} className="px-8 py-3.5 rounded-full font-bold shadow-sm transition-all flex items-center justify-center gap-2" style={{ backgroundColor: cardBg, color: cardText, border: `1px solid ${cardText}15` }}>
                <Share2 className="w-4 h-4" />
                Share Link
              </button>
            </div>
          </div>
          
        </div>

        {/* FOOTER & VIEW COUNTER */}
        <div className="text-center pb-12 pt-10">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold mx-auto w-fit px-4 py-2 rounded-full uppercase tracking-widest" style={{ backgroundColor: cardBg, color: textSecondary, border: `1px solid ${cardText}15` }}>
            <Eye className="w-3.5 h-3.5" />
            Profile views: 1,337
          </div>
          <p className="text-[10px] mt-5 font-bold tracking-[0.2em] uppercase" style={{ color: textSecondary, opacity: 0.6 }}>Built with NexCard</p>
        </div>
      </div>

      {/* 📱 MOBILE APP BOTTOM NAVIGATION */}
      <BottomNav data={data} primaryColor={primaryColor} showWhatsAppInput={showWhatsAppInput} setShowWhatsAppInput={setShowWhatsAppInput} layout="modern" inPreview={inPreview} />

      {/* Injecting some custom style mapping for hover utilities */}
      <style dangerouslySetInnerHTML={{__html: `
        .group:hover svg.hoverColor { stroke: ${primaryColor}; }
        .focus-color:focus { border-color: ${primaryColor}; box-shadow: 0 0 0 4px ${primaryColor}20; }
      `}} />
    </div>
  );
}
