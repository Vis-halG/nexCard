"use client";

import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, User, Briefcase, Send, QrCode, Eye, Calendar, CreditCard, Share2, Star, Zap } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import FloatingNav from "../FloatingNav";

const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

export default function NeoTheme({ data }) {
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
  const bgColor = theme.background || "#0a0a0a";
  const fontClass = theme.font || "font-mono";
  const borderRadius = theme.radius || "0.5rem";
  const avatarRadius = theme.avatarStyle === 'circle' ? '9999px' : (theme.avatarStyle === 'rounded' ? '1rem' : '0px');
  
  const cardClasses = "bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 shadow-2xl";

  return (
    <div className={`min-h-screen flex justify-center bg-black ${fontClass} pb-28 selection:bg-${primaryColor} selection:text-black overflow-x-hidden`} style={{ scrollBehavior: "smooth" }}>
      <div 
        className="w-full min-h-screen relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] sm:rounded-b-[2.5rem]"
        style={{ backgroundColor: bgColor }}
      >
        {/* ✨ Cyber Background Effects */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}11 1px, transparent 1px), linear-gradient(to bottom, ${primaryColor}11 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>

        {/* 🔥 HERO SECTION */}
        <div id="home" className="relative pb-10">
          <div 
            className="h-64 w-full relative overflow-hidden" 
            style={{ 
              background: `linear-gradient(225deg, #000 0%, ${bgColor} 100%)`,
            }}
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full"></div>
             <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
          </div>

          <div className="px-6 relative -mt-24 flex flex-col items-center">
            <div 
              className="w-40 h-40 border-4 border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden bg-black relative z-10 transition-all hover:scale-105 duration-500 group"
              style={{ borderRadius: avatarRadius }}
            >
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00ffcc] transition-colors duration-500 z-20" style={{ borderRadius: avatarRadius }}></div>
              <img 
                src={data?.image || "https://i.pravatar.cc/150"} 
                alt={data?.name || "profile"} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="mt-6 flex flex-col items-center">
              <h1 className="text-[32px] font-black text-white tracking-tighter leading-tight text-center uppercase italic">
                {data?.name || "Your Name"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-[2px] w-8 bg-[#00ffcc]" style={{ backgroundColor: primaryColor }}></div>
                <p className="text-zinc-400 font-bold text-[14px] uppercase tracking-[0.2em] text-center" style={{ color: primaryColor }}>
                    {data?.title || "Professional Title"}
                </p>
                <div className="h-[2px] w-8 bg-[#00ffcc]" style={{ backgroundColor: primaryColor }}></div>
              </div>
            </div>
          </div>

          {/* ⚡ CYBER QUICK ACTIONS */}
          <div className="flex justify-center flex-wrap gap-5 mt-10 px-6">
            {[
              { icon: Phone, href: `tel:${data?.phone}`, show: !!data?.phone, color: primaryColor },
              { icon: MessageSquare, href: `sms:${data?.phone}`, show: !!data?.phone, color: "#8B5CF6" },
              { icon: Mail, href: `mailto:${data?.email}`, show: !!data?.email, color: "#EA4335" },
              { icon: MapPin, href: "#map", show: !!data?.address, color: "#F59E0B" }
            ].map((btn, i) => btn.show && (
              <a key={i} href={btn.href} className="w-[56px] h-[56px] bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white shadow-xl transition-all duration-300 flex items-center justify-center hover:-translate-y-1 group" style={{ borderRadius: borderRadius }}>
                <btn.icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: btn.color }} />
              </a>
            ))}
          </div>

          {/* 📥 SAVE CONTACT (Neon Glow) */}
          <div className="px-8 mt-10">
            <button 
              onClick={generateVcard}
              className="w-full py-[18px] text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,255,204,0.3)] hover:shadow-[0_0_40px_rgba(0,255,204,0.5)] hover:-translate-y-1 transition-all duration-400 relative overflow-hidden group"
              style={{ backgroundColor: primaryColor, borderRadius: borderRadius }}
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Sync Protocol</span>
            </button>
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* DARK CONTENT SECTIONS */}
        {/* --------------------------------------------------------- */}
        <div className="space-y-10 px-8 pt-6">

          {/* 🌟 ABOUT SECTION */}
          {data?.about && (
            <div id="about" className="scroll-mt-6 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
              <h2 className="text-[14px] font-black text-zinc-500 mb-4 tracking-[0.3em] uppercase flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></div> Intelligence
              </h2>
              <p className="text-zinc-300 text-[15px] leading-relaxed font-medium italic opacity-80">{data.about}</p>
            </div>
          )}

          {/* 🛠 SPECIALTIES */}
          {data?.services?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[14px] font-black text-zinc-500 mb-4 tracking-[0.3em] uppercase">Abilities</h2>
              <div className="flex flex-wrap gap-3">
                {data.services.map((s, i) => (
                  <span key={i} className="px-4 py-2 bg-zinc-900 text-zinc-400 text-[12px] font-bold rounded-lg border border-zinc-800 transition-all hover:border-[#00ffcc] cursor-default uppercase" style={{ hoverBorderColor: primaryColor }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 🌐 SOCIAL MEDIA LINKS */}
          {data?.social && Object.values(data.social).some(Boolean) && (
          <div id="social" className="scroll-mt-6">
            <h2 className="text-[14px] font-black text-zinc-500 mb-4 tracking-[0.3em] uppercase">Network</h2>
            <div className="flex flex-wrap gap-6">
              {Object.entries(data.social).map(([key, val]) => {
                if (!val) return null;
                const Icon = {
                  instagram: InstagramIcon,
                  linkedin: LinkedinIcon,
                  twitter: TwitterIcon,
                  youtube: YoutubeIcon,
                  facebook: FacebookIcon
                }[key];
                return (
                  <a key={key} href={val} target="_blank" rel="noreferrer" className="w-14 h-14 bg-zinc-900 border border-zinc-800 transition-all duration-300 flex items-center justify-center text-zinc-400 hover:text-white group" style={{ borderRadius: borderRadius }}>
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
          )}

          {/* 🖼 IMAGE GALLERY */}
          {data?.gallery?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[14px] font-black text-zinc-500 mb-4 tracking-[0.3em] uppercase">Visuals</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.gallery.map((img, i) => img ? (
                  <div key={i} className="aspect-square overflow-hidden shadow-2xl relative group border border-zinc-800" style={{ borderRadius: borderRadius }}>
                    <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                ) : null)}
              </div>
            </div>
          )}

          {/* 🎬 VIDEO EMBEDDING */}
          {data?.videos?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[14px] font-black text-zinc-500 mb-4 tracking-[0.3em] uppercase">Transmissions</h2>
              <div className="flex flex-col gap-6">
                {data.videos.map((vid, i) => (
                  <div key={i} className="w-full overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800 relative pt-[56.25%]" style={{ borderRadius: borderRadius }}>
                    <iframe className="absolute top-0 left-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500" src={vid.includes('youtube.com/watch?v=') ? vid.replace('watch?v=', 'embed/') : vid} title={`Video ${i}`} frameBorder="0" allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🔗 CYBER CUSTOM LINKS */}
          {data?.customLinks?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[14px] font-black text-zinc-500 mb-4 tracking-[0.3em] uppercase">Access Points</h2>
              <div className="flex flex-col gap-4">
                {data.customLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className={`w-full flex items-center justify-between p-5 bg-zinc-900/50 border border-zinc-800 hover:border-[#00ffcc]/50 transition-all duration-300 text-zinc-300 group`} style={{ borderRadius: borderRadius }}>
                    <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-zinc-600 group-hover:text-[#00ffcc]" style={{ groupHoverColor: primaryColor }} />
                        <span className="font-bold text-[14px] uppercase tracking-wider">{link.title}</span>
                    </div>
                    <Share2 className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 🗺 ADDRESS & MAP */}
          {data?.address && (
            <div id="map" className="scroll-mt-6">
              <h2 className="text-[14px] font-black text-zinc-500 mb-4 tracking-[0.3em] uppercase">Coordinates</h2>
              <div className="w-full h-56 rounded-2xl overflow-hidden shadow-2xl relative mb-5 border border-zinc-800">
                <iframe width="100%" height="100%" style={{ border: 0, position: 'absolute', top: 0, left: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}></iframe>
              </div>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.address)}`} target="_blank" rel="noreferrer" className="w-full py-4 rounded-xl text-black font-black uppercase tracking-widest bg-zinc-200 hover:bg-white transition-all flex items-center justify-center gap-2 shadow-xl">
                <MapPin className="w-4 h-4" /> Initialize Navigation
              </a>
            </div>
          )}

          {/* ✉ ENQUIRY FORM */}
          <div id="contact" className="scroll-mt-6 pt-6">
            <h2 className="text-[28px] font-black text-white mb-2 tracking-tighter uppercase italic">Secure Uplink</h2>
            <p className="text-[14px] text-zinc-500 mb-8 uppercase tracking-[0.1em]">Establish direct communication channel.</p>

            <form onSubmit={handleEnquiry} className="space-y-6">
              <input type="text" name="name" required placeholder="IDENTIFIER" className="w-full px-5 py-4 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white focus:outline-none focus:border-[#00ffcc] transition-all font-bold placeholder:text-zinc-700" />
              <textarea name="message" required placeholder="MESSAGE DATA..." rows="4" className="w-full px-5 py-4 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white focus:outline-none focus:border-[#00ffcc] transition-all font-bold placeholder:text-zinc-700 resize-none"></textarea>
              <button type="submit" className="w-full py-[18px] rounded-xl text-black font-black uppercase tracking-widest transition-all mt-2" style={{ backgroundColor: primaryColor }}>
                Transmit Data
              </button>
            </form>
          </div>

          {/* ⭐ GOOGLE REVIEWS */}
          {data?.googleReviewsUrl && (
            <div className="pt-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="flex justify-center mb-4 gap-1">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 text-amber-500 fill-amber-500" />)}
                </div>
                <h3 className="font-black text-white text-lg mb-4 uppercase tracking-[0.2em]">User Feedback Loop</h3>
                <a href={data.googleReviewsUrl} target="_blank" rel="noreferrer" className="inline-block w-full py-4 rounded-xl text-zinc-400 font-bold border border-zinc-800 hover:text-white hover:border-zinc-600 transition-all">
                  Submit Log
                </a>
              </div>
            </div>
          )}

          {/* 📲 SHARING & QR CODE */}
          <div id="share" className="scroll-mt-6 pt-6 pb-4">
            <div className="flex flex-col items-center">
              <div className="p-6 bg-white rounded-3xl shadow-2xl mb-8">
                <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} size={180} level="Q" fgColor="#000000" />
              </div>
              <button onClick={() => {
                if (navigator.share) { navigator.share({ title: data?.name || 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
              }} className="px-10 py-4 rounded-full text-zinc-400 font-black uppercase tracking-widest border border-zinc-800 hover:text-white hover:border-zinc-600 transition-all flex items-center justify-center gap-3">
                <Share2 className="w-4 h-4" /> Broadcast Link
              </button>
            </div>
          </div>
          
        </div>

        {/* FOOTER */}
        <div className="text-center pb-12 pt-10 border-t border-zinc-900 mt-10">
          <p className="text-[10px] text-zinc-700 font-black tracking-[0.5em] uppercase">NexCard Engine // V.2.0</p>
        </div>
      </div>

      {/* 📱 NEW FLOATING NAVIGATION */}
      <FloatingNav primaryColor={primaryColor} />
    </div>
  );
}
