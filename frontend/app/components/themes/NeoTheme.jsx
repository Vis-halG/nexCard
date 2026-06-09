"use client";

import { useState } from "react";
import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, Calendar, Share2, Star, Terminal, ShieldAlert, Zap, Cpu, ArrowRight, User, MoreHorizontal } from "lucide-react";

import { QRCodeSVG } from "qrcode.react";
import BottomNav from "../BottomNav";

const SOCIAL_ICONS = {
  instagram: (cls) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
  linkedin: (cls) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  twitter: (cls) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>,
  youtube: (cls) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>,
  facebook: (cls) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>,
};

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);


export default function NeoTheme({ data, inPreview = false }) {
  const [showMore, setShowMore] = useState(false);
  const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);

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
      label: "Ping",
      target: "_blank",
      rel: "noreferrer"
    });
  }
  if (data?.address) {
    actions.push({
      id: "location",
      href: "#map",
      icon: (cls) => <MapPin className={cls} />,
      label: "Loc"
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
  const primaryColor = theme.primary || "#00ffcc";
  const bgColor = "#050505"; // Force true dark for cyber aesthetic
  
  // Create styles for dynamic neon glows
  const neonText = { textShadow: `0 0 8px ${primaryColor}88, 0 0 12px ${primaryColor}44`, color: primaryColor };
  const neonBox = { boxShadow: `inset 0 0 20px ${primaryColor}11, 0 0 10px ${primaryColor}33`, borderColor: `${primaryColor}66` };

  return (
    <div className={`min-h-screen font-mono flex justify-center text-white selection:bg-[#00ffcc] selection:text-black overflow-x-hidden`} style={{ scrollBehavior: "smooth", backgroundColor: bgColor }}>
      
      {/* GLOBAL CYBER CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .scanline {
          width: 100%;
          height: 100px;
          background: linear-gradient(0deg, transparent 0%, ${primaryColor}22 50%, transparent 100%);
          opacity: 0.1;
          position: absolute;
          bottom: 100%;
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 50;
        }
        @keyframes scanline {
          0% { bottom: 100%; }
          100% { bottom: -100%; }
        }
        .crt-flicker {
          animation: flicker 4s infinite;
        }
        @keyframes flicker {
          0% { opacity: 0.95; }
          5% { opacity: 0.85; }
          10% { opacity: 0.95; }
          15% { opacity: 1; }
          100% { opacity: 1; }
        }
      `}} />

      <div className="w-full max-w-[500px] min-h-screen relative flex flex-col border-x border-zinc-900 bg-[#050505] overflow-hidden crt-flicker">
        <button 
          onClick={() => setShowWhatsAppInput(true)} 
          className="absolute top-12 right-10 z-40 w-10 h-10 bg-black border flex items-center justify-center cursor-pointer"
          style={{ borderColor: primaryColor, color: primaryColor, boxShadow: `0 0 10px ${primaryColor}33` }}
        >
          <Share2 size={18} />
        </button>
        
        <div className="scanline"></div>
        
        {/* TECH GRID BACKGROUND */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}44 1px, transparent 1px), linear-gradient(to bottom, ${primaryColor}44 1px, transparent 1px)`, backgroundSize: '24px 24px', backgroundPosition: 'center center' }}></div>

        {/* HEADER AREA */}
        <div className={`relative z-10 p-6 ${inPreview ? "pt-4" : "pt-10"} flex flex-col items-center`}>
          
          {data?.coverImage && (
            <div className="w-full h-40 mb-10 relative overflow-hidden rounded-sm border border-zinc-800" style={neonBox}>
               <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 border text-[8px] uppercase tracking-widest z-20 backdrop-blur-md" style={{ borderColor: primaryColor, color: primaryColor }}>SYS_BANNER</div>
               <img src={data.coverImage} className="w-full h-full object-cover opacity-60 mix-blend-screen filter sepia-[.5] hue-rotate-[180deg] saturate-[2]" alt="Cover" />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            </div>
          )}

          {!data?.coverImage && !inPreview && <div className="h-10"></div>}

          <div className="relative group">
            <div className="w-36 h-36 rounded-none border border-zinc-800 relative z-10 bg-black p-1 overflow-hidden" style={neonBox}>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: primaryColor }}></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: primaryColor }}></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: primaryColor }}></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: primaryColor }}></div>
              {data?.image ? (
                <img src={data.image} alt={data.name} className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900"><User size={40} className="text-zinc-700" /></div>
              )}
            </div>
            {/* Glowing orb behind avatar */}
            <div className="absolute inset-0 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" style={{ backgroundColor: primaryColor }}></div>
          </div>

          <div className="mt-8 text-center w-full relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: primaryColor }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: primaryColor }}></span>
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">System Online</span>
            </div>
            <h1 className="text-3xl font-bold uppercase tracking-widest text-white mb-2">
              {data?.name || "SYS.ADMIN"}
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] mb-1" style={neonText}>
              &gt; {data?.title || "OPERATOR"}
            </p>
            {data?.company && (
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-1">
                [{data.company}]
              </p>
            )}
          </div>

        </div>

        {/* CORE ACTIONS */}
        <div className="relative z-10 px-6 mt-4">
           <div className="grid grid-cols-4 gap-3">
             {visibleActions.map((act) => (
               <a
                 key={act.id}
                 href={act.href}
                 target={act.target}
                 rel={act.rel}
                 className="flex flex-col items-center justify-center p-3 bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800 transition-all group backdrop-blur-md"
               >
                 {act.id === 'whatsapp'
                   ? act.icon("w-5 h-5 text-zinc-400 group-hover:text-[#25D366] fill-current mb-2 transition-colors")
                   : act.icon("w-5 h-5 text-zinc-400 group-hover:text-white mb-2 transition-colors")
                 }
                 <span className="text-[8px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">{act.label}</span>
               </a>
             ))}

             {hasMore ? (
               <button
                 onClick={() => setShowMore(!showMore)}
                 className={`flex flex-col items-center justify-center p-3 border transition-all group backdrop-blur-md ${
                   showMore 
                     ? 'bg-zinc-800 border-zinc-600 text-white' 
                     : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                 }`}
                 style={showMore ? { borderColor: primaryColor } : undefined}
               >
                 <MoreHorizontal 
                   className={`w-5 h-5 mb-2 transition-colors`} 
                   style={showMore ? { color: primaryColor } : undefined}
                 />
                 <span className="text-[8px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">More</span>
               </button>
             ) : (
               actions.slice(3, 4).map((act) => (
                 <a
                   key={act.id}
                   href={act.href}
                   target={act.target}
                   rel={act.rel}
                   className="flex flex-col items-center justify-center p-3 bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800 transition-all group backdrop-blur-md"
                 >
                   {act.id === 'whatsapp'
                     ? act.icon("w-5 h-5 text-zinc-400 group-hover:text-[#25D366] fill-current mb-2 transition-colors")
                     : act.icon("w-5 h-5 text-zinc-400 group-hover:text-white mb-2 transition-colors")
                   }
                   <span className="text-[8px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">{act.label}</span>
                 </a>
               ))
             )}

             {!hasMore && actions.length < 4 && Array.from({ length: 4 - actions.length }).map((_, i) => (
               <div key={i} className="bg-zinc-900/10 border border-transparent"></div>
             ))}
           </div>

           {hasMore && showMore && (
             <div className="grid grid-cols-4 gap-3 mt-3 animate-in slide-in-from-top duration-300">
               {remainingActions.map((act) => (
                 <a
                   key={act.id}
                   href={act.href}
                   target={act.target}
                   rel={act.rel}
                   className="flex flex-col items-center justify-center p-3 bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800 transition-all group backdrop-blur-md"
                 >
                   {act.id === 'whatsapp'
                     ? act.icon("w-5 h-5 text-zinc-400 group-hover:text-[#25D366] fill-current mb-2 transition-colors")
                     : act.icon("w-5 h-5 text-zinc-400 group-hover:text-white mb-2 transition-colors")
                   }
                   <span className="text-[8px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">{act.label}</span>
                 </a>
               ))}
               {Array.from({ length: 4 - remainingActions.length }).map((_, i) => (
                 <div key={i} className="bg-zinc-900/10 border border-transparent"></div>
               ))}
             </div>
           )}
        </div>

        <div className="relative z-10 flex flex-col gap-6 p-6 pb-32">
          
          {/* PRIMARY CTAS */}
          <div className="flex flex-col gap-3">
             <button onClick={generateVcard} className="w-full relative group overflow-hidden bg-zinc-900/80 border flex items-center justify-between px-6 py-4 transition-all" style={neonBox}>
               <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: primaryColor }}></div>
               <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-white flex items-center gap-3"><Terminal size={14}/> Download_Data</span>
               <Download className="w-4 h-4 relative z-10" style={{ color: primaryColor }} />
             </button>
             {data?.calendarUrl && (
               <a href={data.calendarUrl} target="_blank" rel="noreferrer" className="w-full relative group overflow-hidden bg-zinc-900/80 border border-zinc-800 hover:border-zinc-600 flex items-center justify-between px-6 py-4 transition-all">
                 <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-3"><Calendar size={14}/> Sync_Calendar</span>
                 <ArrowRight className="w-4 h-4 relative z-10 text-zinc-500 group-hover:text-white" />
               </a>
             )}
          </div>

          {/* ABOUT LOG */}
          {data?.about && (
            <div id="about" className="border border-zinc-800 bg-black/60 p-5 relative">
               <div className="absolute top-0 left-4 -translate-y-1/2 px-2 bg-black text-[9px] uppercase tracking-widest text-zinc-500 border border-zinc-800">Decrypted_Log</div>
               <p className="text-xs leading-relaxed text-zinc-400">
                 {data.about}
               </p>
            </div>
          )}

          {/* MODULES / EXPERTISE */}
          {data?.services?.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Cpu size={14} style={{ color: primaryColor }} />
                <span className="text-[10px] uppercase tracking-widest text-white font-bold">Active_Modules</span>
                <div className="flex-1 h-[1px] bg-zinc-800"></div>
              </div>
              <div className="flex flex-col gap-2">
                {data.services.map((s, i) => (
                  <div key={i} className="flex items-center justify-between bg-zinc-900/40 border border-zinc-800/50 p-3 hover:bg-zinc-800/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-zinc-300">{s}</span>
                    <span className="text-[8px] text-zinc-600 font-mono">MOD_{(i+1).toString().padStart(2, '0')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMM LINKS (SOCIAL) */}
          {data?.social && Object.keys(data.social).some(k => data.social[k]) && (
            <div id="social">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={14} style={{ color: primaryColor }} />
                <span className="text-[10px] uppercase tracking-widest text-white font-bold">Network_Nodes</span>
                <div className="flex-1 h-[1px] bg-zinc-800"></div>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {['instagram', 'linkedin', 'twitter', 'youtube', 'facebook'].map(network =>
                  data.social[network] ? (
                    <a key={network} href={data.social[network]} target="_blank" rel="noreferrer" aria-label={network}
                      className="aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-500 transition-all duration-300">
                      {SOCIAL_ICONS[network] ? SOCIAL_ICONS[network]("w-5 h-5") : <Globe className="w-5 h-5" />}
                    </a>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* VISUAL DATA (GALLERY) */}
          {data?.gallery?.length > 0 && (
            <div>
               <div className="flex items-center gap-3 mb-4">
                <Zap size={14} style={{ color: primaryColor }} />
                <span className="text-[10px] uppercase tracking-widest text-white font-bold">Visual_Data</span>
                <div className="flex-1 h-[1px] bg-zinc-800"></div>
              </div>
               <div className="grid grid-cols-2 gap-3">
                 {data.gallery.map((img, i) => img && (
                   <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden relative group">
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors z-10"></div>
                     <img src={img} className="w-full h-full object-cover filter contrast-125 group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute bottom-2 right-2 text-[8px] font-bold text-white z-20 bg-black/80 px-1 border border-zinc-700">IMG_{i}</div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* EXTERNAL LINKS */}
          {data?.customLinks?.length > 0 && (
            <div>
              <div className="flex flex-col gap-2">
                {data.customLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 transition-all group">
                    <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white font-bold">{link.title}</span>
                    <span className="text-[8px] uppercase text-zinc-600 group-hover:text-zinc-400 flex items-center gap-1">EXT_LINK <ArrowRight size={10} /></span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENT PROTOCOL */}
          {data?.payment && (
            <div>
              <div className="flex items-center gap-3 mb-4 mt-4">
                <ShieldAlert size={14} style={{ color: primaryColor }} />
                <span className="text-[10px] uppercase tracking-widest text-white font-bold">Secure_Transfer</span>
                <div className="flex-1 h-[1px] bg-zinc-800"></div>
              </div>
              <div className="border border-zinc-800 bg-black p-5" style={{ borderLeft: `2px solid ${primaryColor}` }}>
                {data.payment.upi && (
                  <div className="mb-4">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-600 block mb-1">Target_UPI</span>
                    <span className="text-sm tracking-wider text-white" style={neonText}>{data.payment.upi}</span>
                  </div>
                )}
                {data.payment.bankDetails && (
                  <div className="mb-6">
                     <span className="text-[9px] uppercase tracking-widest text-zinc-600 block mb-2">Bank_Routing</span>
                     <p className="text-xs leading-relaxed text-zinc-400 whitespace-pre-line bg-zinc-900/50 p-3 border border-zinc-800">{data.payment.bankDetails}</p>
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" className="block w-full py-3 bg-zinc-900 border border-zinc-700 text-center text-xs uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors">
                    Init_Transaction
                  </a>
                )}
              </div>
            </div>
          )}

          {/* TRANSMISSION FORM */}
          <div id="contact" className="mt-4">
            <div className="border border-zinc-800 bg-black/80 p-6 relative">
              <div className="absolute top-0 right-4 -translate-y-1/2 px-2 bg-black text-[9px] uppercase tracking-widest text-zinc-500 border border-zinc-800">Signal_Ping</div>
              <form onSubmit={handleEnquiry} className="flex flex-col gap-4 mt-2">
                <div className="flex gap-2">
                  <span className="text-zinc-600 mt-2">&gt;</span>
                  <input type="text" name="name" required placeholder="INPUT_IDENTIFIER" className="w-full bg-transparent border-b border-zinc-800 text-xs py-2 text-white focus:outline-none focus:border-zinc-500 placeholder:text-zinc-700 uppercase" />
                </div>
                <div className="flex gap-2">
                  <span className="text-zinc-600 mt-2">&gt;</span>
                  <input type="tel" name="phone" placeholder="INPUT_COMM_LINK" className="w-full bg-transparent border-b border-zinc-800 text-xs py-2 text-white focus:outline-none focus:border-zinc-500 placeholder:text-zinc-700 uppercase" />
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="text-zinc-600 mt-2">&gt;</span>
                  <textarea name="message" required placeholder="INPUT_DATA..." rows="3" className="w-full bg-transparent border-b border-zinc-800 text-xs py-2 text-white focus:outline-none focus:border-zinc-500 placeholder:text-zinc-700 uppercase resize-none"></textarea>
                </div>
                <button type="submit" className="w-full mt-4 py-3 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-xs font-bold uppercase tracking-widest text-white transition-all flex justify-between px-4 items-center" style={{ color: primaryColor }}>
                  <span>Transmit</span> <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
          
          {/* FOOTER */}
          <div id="share" className="scroll-mt-6 mt-10 flex flex-col items-center pb-10 border-t border-zinc-900 pt-10">
             <div className="p-4 bg-white mb-8 border-4" style={{ borderColor: primaryColor }}>
               <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} size={120} level="M" fgColor="#000" />
             </div>
             
             <button onClick={() => {
                if (navigator.share) { navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
              }} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors mb-10">
                <Share2 className="w-3 h-3" /> Broadcast_URL
             </button>

             <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-zinc-600">NEXCARD // CYBER_CORE_V2</p>
          </div>

        </div>
      </div>
      {/* 📱 MOBILE APP BOTTOM NAVIGATION */}
      <BottomNav data={data} primaryColor={primaryColor} showWhatsAppInput={showWhatsAppInput} setShowWhatsAppInput={setShowWhatsAppInput} layout="neo" inPreview={inPreview} />
    </div>
  );
}
