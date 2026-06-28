"use client";

import { useState } from "react";
import { Phone, Mail, Globe, MapPin, Download, MessageSquare, Calendar, Share2, Send, Eye, MoreHorizontal, Sparkles, ChevronRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import BottomNav from "../BottomNav";

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);
const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);

const SOCIAL_ICONS = {
  instagram: (cls) => <InstagramIcon className={cls} />,
  linkedin: (cls) => <LinkedinIcon className={cls} />,
  twitter: (cls) => <TwitterIcon className={cls} />,
  youtube: (cls) => <YoutubeIcon className={cls} />,
  facebook: (cls) => <FacebookIcon className={cls} />,
};

const SOCIAL_COLORS = {
  instagram: 'text-pink-500 hover:text-pink-600',
  linkedin: 'text-blue-600 hover:text-blue-700',
  twitter: 'text-sky-400 hover:text-sky-500',
  youtube: 'text-red-600 hover:text-red-700',
  facebook: 'text-blue-800 hover:text-blue-900',
};

export default function FrostedTheme({ data, inPreview = false }) {
  const [showMore, setShowMore] = useState(false);
  const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);
  const pref = data?.preferences || {};

  const actions = [];
  if (data?.phone) {
    actions.push({
      id: "call",
      href: `tel:${data.phone}`,
      icon: (cls) => <Phone className={cls} />,
      label: "Call Now"
    });
    actions.push({
      id: "whatsapp",
      href: `https://wa.me/${data.phone.replace(/[^0-9]/g, "")}`,
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
      label: "Find Us"
    });
  }
  if (data?.email) {
    actions.push({
      id: "mail",
      href: `mailto:${data.email}`,
      icon: (cls) => <Mail className={cls} />,
      label: "Email Me"
    });
  }
  if (data?.phone) {
    actions.push({
      id: "sms",
      href: `sms:${data.phone}`,
      icon: (cls) => <MessageSquare className={cls} />,
      label: "Send SMS"
    });
  }

  const hasMore = actions.length > 4;
  const visibleActions = hasMore ? actions.slice(0, 3) : actions;
  const remainingActions = hasMore ? actions.slice(3) : [];

  const theme = data?.theme || {};
  const primaryColor = theme.primary || "#00C2FF";
  const accentColor = theme.accent || "#FFE156";
  const savedBackground = theme.background || "#F5F3FF";
  const backgroundColor = savedBackground;
  const cardBg = theme.cardBg || "#FFFFFF";
  const textPrimary = theme.textPrimary || "#1E293B";
  const textSecondary = theme.textSecondary || "#64748B";

  const nameColor = theme.nameColor || textPrimary;
  const sectionHeadingColor = theme.sectionHeadingColor || textPrimary;
  const saveBtnBg = theme.saveBtnBg || primaryColor;
  const actionBtnBg = theme.actionBtnBg || primaryColor;
  const linkCardBg = theme.linkCardBg || cardBg;
  const qrLogo = theme.qrLogo || "none";

  const hexToRgba = (hex, opacity) => {
    if (!hex) return "";
    const cleaned = hex.replace("#", "");
    const r = parseInt(cleaned.substring(0, 2), 16) || 255;
    const g = parseInt(cleaned.substring(2, 4), 16) || 255;
    const b = parseInt(cleaned.substring(4, 6), 16) || 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const generateVcard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${data?.name || "User"}\nTITLE:${data?.title || ""}\nTEL;TYPE=WORK,VOICE:${data?.phone || ""}\nEMAIL;TYPE=WORK:${data?.email || ""}\nURL:${data?.website || ""}\nADR;TYPE=WORK:;;${data?.address || ""};;;;\nEND:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data?.name || "Contact").replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEnquiry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const msg = formData.get("message");
    window.location.href = `mailto:${data?.email || ""}?subject=Enquiry from ${name}&body=${msg}`;
  };

  const socials = Object.entries(data?.social || {}).filter(([, url]) => url);
  const cardClasses = "relative z-10 rounded-[2rem] border border-white/40 bg-white/20 p-6 shadow-[0_12px_32px_rgba(31,38,135,0.05)] backdrop-blur-xl transition-all duration-300";

  return (
    <div
      className={inPreview 
        ? "h-full w-full relative overflow-hidden flex flex-col font-sans text-slate-800 frosted-selection frosted-theme-root"
        : "min-h-screen flex justify-center font-sans text-slate-800 frosted-selection frosted-theme-root"
      }
      style={{
        background: backgroundColor,
        scrollBehavior: inPreview ? undefined : "smooth",
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .frosted-theme-root h1 {
          color: ${nameColor} !important;
        }
        .frosted-theme-root h2 {
          color: ${sectionHeadingColor} !important;
        }
        .frosted-theme-root h3,
        .frosted-theme-root .text-slate-900,
        .frosted-theme-root .text-slate-800,
        .frosted-theme-root .text-slate-700 {
          color: ${textPrimary} !important;
        }
        .frosted-theme-root p,
        .frosted-theme-root .text-slate-500,
        .frosted-theme-root .text-slate-655,
        .frosted-theme-root .text-slate-600,
        .frosted-theme-root .text-slate-400 {
          color: ${textSecondary} !important;
        }
        .frosted-theme-root .bg-white\\/20,
        .frosted-theme-root .bg-white\\/40 {
          background-color: ${hexToRgba(cardBg, 0.2)} !important;
        }
        .frosted-theme-root .border-white\\/40 {
          border-color: ${hexToRgba(cardBg, 0.4)} !important;
        }
        /* Action buttons */
        .frosted-theme-root .action-btn:hover {
          background-color: ${hexToRgba(actionBtnBg, 0.35)} !important;
          color: #ffffff !important;
          border-color: ${hexToRgba(actionBtnBg, 0.6)} !important;
        }
        /* Save Contact button */
        .frosted-theme-root .save-contact-btn {
          background-color: ${saveBtnBg} !important;
          color: #ffffff !important;
        }
        /* Link cards */
        .frosted-theme-root .link-card {
          background-color: ${hexToRgba(linkCardBg, 0.2)} !important;
        }
      `}} />
      <div 
        className={inPreview
          ? "w-full h-full overflow-y-auto scrollbar-none px-5 pt-4 pb-20 relative flex-1 z-10"
          : `w-full max-w-[480px] min-h-screen px-5 pt-4 pb-20 relative overflow-hidden z-10`
        }
      >
        {/* 🔮 Background Mesh Blob Effects (Inside container so they sit directly behind the cards) */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-80 h-80 rounded-full blur-[90px] pointer-events-none opacity-55 blob-1 z-0" style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 75%)` }}></div>
        <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full blur-[110px] pointer-events-none opacity-45 blob-2 z-0" style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 75%)` }}></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full blur-[80px] pointer-events-none opacity-40 blob-1 z-0" style={{ background: `radial-gradient(circle, ${primaryColor}44 0%, transparent 70%)` }}></div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes floatBlob1 {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -40px) scale(1.08); }
            66% { transform: translate(-25px, 25px) scale(0.93); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes floatBlob2 {
            0% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(-30px, 35px) scale(0.92); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .blob-1 { animation: floatBlob1 18s infinite ease-in-out; }
          .blob-2 { animation: floatBlob2 22s infinite ease-in-out; }
          .frosted-btn { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important; }
          .frosted-btn:hover { color: ${primaryColor} !important; background-color: rgba(255, 255, 255, 0.9) !important; border-color: ${primaryColor}40 !important; transform: translateY(-2px) scale(1.02) !important; }
          .frosted-selection::selection { background-color: ${primaryColor}30 !important; color: inherit !important; }
        `}} />

        {/* Top Share Button */}
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowWhatsAppInput(true);
          }}
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/40 hover:bg-white/70 border border-white/50 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-sm cursor-pointer"
        >
          <Share2 size={18} />
        </button>

        {/* Profile Card Panel */}
        <section id="home" className={`${cardClasses} relative overflow-hidden text-center mb-6 mt-6`}>
          {/* Header Banner - Rectangular aspect */}
          <div
            className="absolute inset-x-0 top-0 h-40 opacity-80 bg-cover bg-center"
            style={data?.coverImage ? {
              backgroundImage: `url(${data.coverImage})`
            } : {
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor}dd 100%)`,
            }}
          />

          <div className="relative z-10 flex flex-col items-center pt-12">
            {/* PROFILE PHOTO - Rounded Square Design */}
            <div className="h-32 w-32 rounded-3xl border-[5px] border-white/90 bg-white/50 shadow-md overflow-hidden backdrop-blur-md mb-4">
              <img
                src={data?.image || "https://i.pravatar.cc/180"}
                alt={data?.name || "Profile"}
                className="h-full w-full object-cover"
              />
            </div>



            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {data?.name || "Your Name"}
            </h1>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              {data?.title || "Professional Title"}
            </p>
            {data?.company && <p className="mt-1.5 text-xs font-semibold text-slate-400">{data.company}</p>}

            {/* Quick Actions Grid - Horizontal Pills Layout (COMPLETELY DIFFERENT!) */}
            <div className="mt-6 grid grid-cols-2 gap-3 w-full">
              {visibleActions.map((act) => (
                <a
                  key={act.id}
                  href={act.href}
                  target={act.target}
                  rel={act.rel}
                  className="flex items-center justify-start gap-3 px-4 py-3.5 rounded-2xl border border-white/50 bg-white/50 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 frosted-btn text-xs font-bold uppercase tracking-wider action-btn"
                  aria-label={act.label}
                >
                  <span style={{ color: primaryColor }}>
                    {act.id === 'whatsapp'
                      ? act.icon("w-4.5 h-4.5 fill-current")
                      : act.icon("w-4.5 h-4.5 stroke-current")
                    }
                  </span>
                  <span>{act.label}</span>
                </a>
              ))}

              {hasMore ? (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl border border-white/50 bg-white/50 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 frosted-btn text-xs font-bold uppercase tracking-wider action-btn"
                  style={showMore ? { color: primaryColor, backgroundColor: "rgba(255, 255, 255, 0.85)" } : {}}
                  aria-label="More"
                >
                  <MoreHorizontal className="w-4 h-4" />
                  <span>{showMore ? "Less" : "More"}</span>
                </button>
              ) : (
                actions.slice(3, 4).map((act) => (
                  <a
                    key={act.id}
                    href={act.href}
                    target={act.target}
                    rel={act.rel}
                    className="flex items-center justify-start gap-3 px-4 py-3.5 rounded-2xl border border-white/50 bg-white/50 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 frosted-btn text-xs font-bold uppercase tracking-wider action-btn"
                    aria-label={act.label}
                  >
                    <span style={{ color: primaryColor }}>
                      {act.icon("w-4.5 h-4.5 stroke-current")}
                    </span>
                    <span>{act.label}</span>
                  </a>
                ))
              )}
            </div>

            {hasMore && showMore && (
              <div className="mt-3 grid grid-cols-2 gap-3 w-full animate-in fade-in slide-in-from-top-2 duration-300">
                {remainingActions.map((act) => (
                  <a
                    key={act.id}
                    href={act.href}
                    target={act.target}
                    rel={act.rel}
                    className="flex items-center justify-start gap-3 px-4 py-3.5 rounded-2xl border border-white/50 bg-white/50 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 frosted-btn text-xs font-bold uppercase tracking-wider action-btn"
                    aria-label={act.label}
                  >
                    <span style={{ color: primaryColor }}>
                      {act.id === 'whatsapp'
                        ? act.icon("w-4.5 h-4.5 fill-current")
                        : act.icon("w-4.5 h-4.5 stroke-current")
                      }
                    </span>
                    <span>{act.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Save Contact & Appointment Booker */}
        {((pref.showSaveContact !== false) || data?.calendarUrl) && (
          <div className="mt-5 mb-5 space-y-3">
            {pref.showSaveContact !== false && (
              <button
                onClick={generateVcard}
                className="flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-md transition-all hover:-translate-y-0.5 save-contact-btn"
                style={{ backgroundColor: primaryColor, color: '#ffffff', boxShadow: `0 10px 25px ${primaryColor}30` }}
              >
                <Download className="h-4 w-4" />
                Save Contact
              </button>
            )}
            {data?.calendarUrl && (
              <a
                href={data.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-700 shadow-sm backdrop-blur-md hover:-translate-y-0.5 frosted-btn"
              >
                <Calendar className="h-4 w-4" style={{ color: primaryColor }} />
                Book Appointment
              </a>
            )}
          </div>
        )}

        {/* Section Blocks */}
        <main className="space-y-5">
          {pref.showAbout !== false && data?.about && (
            <section id="about" className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">About Me</h2>
              <p className="text-[14px] leading-7 text-slate-600">{data.about}</p>
            </section>
          )}

          {pref.showServices !== false && ((pref.servicesLayout === "paragraph" && data?.servicesText) || (pref.servicesLayout !== "paragraph" && data?.services?.length > 0)) && (
            <section className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Specialities</h2>
              {pref.servicesLayout === "paragraph" ? (
                <p className="text-[14px] leading-7 text-slate-650 whitespace-pre-line text-left bg-white/20 p-5 rounded-2xl border border-white/30 backdrop-blur-md shadow-inner break-words">
                  {data.servicesText}
                </p>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {data.services.map((service, index) => (
                    <span key={index} className="rounded-2xl border border-white/60 bg-white/30 px-4.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md">
                      {service}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {pref.showSocial !== false && socials.length > 0 && (
            <section id="social" className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Connect</h2>
              <div className="grid grid-cols-5 gap-3.5">
                {socials.map(([network, url]) => (
                  <a key={network} href={url} target="_blank" rel="noreferrer" aria-label={network}
                    className={`aspect-square w-full max-w-12 justify-self-center rounded-2xl border border-white/60 bg-white/35 flex items-center justify-center shadow-sm transition-all duration-350 hover:-translate-y-0.5 frosted-btn text-slate-500 ${SOCIAL_COLORS[network] || 'hover:text-slate-700'}`}>
                    {SOCIAL_ICONS[network] ? SOCIAL_ICONS[network]("w-5 h-5") : <Globe className="w-5 h-5" style={{ color: primaryColor }} />}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Gallery Section */}
          {pref.showGallery !== false && data?.gallery?.length > 0 && (
            <section className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Gallery</h2>
              <div className="grid grid-cols-2 gap-3.5">
                {data.gallery.map((img, index) =>
                  img ? (
                    <div key={index} className="aspect-square rounded-2xl overflow-hidden border border-white/60 shadow-sm relative group">
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                    </div>
                  ) : null
                )}
              </div>
            </section>
          )}

          {/* Videos Section */}
          {pref.showVideos !== false && data?.videos?.length > 0 && (
            <section className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Videos</h2>
              <div className="flex flex-col gap-4.5">
                {data.videos.map((vid, index) => (
                  <div key={index} className="w-full overflow-hidden border border-white/60 bg-white/20 relative pt-[56.25%] rounded-2xl shadow-sm backdrop-blur-md">
                    <iframe className="absolute top-0 left-0 w-full h-full" src={vid.includes('youtube.com/watch?v=') ? vid.replace('watch?v=', 'embed/') : vid} title={`Video ${index + 1}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured Links Section */}
          {pref.showCustomLinks !== false && data?.customLinks?.length > 0 && (
            <section className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Featured Links</h2>
              <div className="space-y-3">
                {data.customLinks.map((link, index) => {
                  let domain = "";
                  try {
                    const parsed = new URL(link.url.startsWith('http') ? link.url : `https://${link.url}`);
                    domain = parsed.hostname;
                  } catch (e) {
                    domain = "";
                  }
                  const faviconUrl = domain ? `https://www.google.com/s2/favicons?sz=64&domain=${domain}` : null;

                  return (
                    <a key={index} href={link.url} target="_blank" rel="noreferrer" 
                      className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/35 px-5 py-3.5 font-bold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 frosted-btn link-card">
                      <div className="flex items-center gap-3.5 min-w-0">
                        {faviconUrl ? (
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/40 bg-white/20 backdrop-blur-sm">
                            <img src={faviconUrl} alt="" className="w-4 h-4 object-contain" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/40 bg-white/20 backdrop-blur-sm">
                            <Globe className="w-4 h-4 text-slate-400" />
                          </div>
                        )}
                        <span className="text-xs uppercase tracking-wider truncate" style={{ color: primaryColor }}>{link.title}</span>
                      </div>
                      <ChevronRight className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {/* Payments Section */}
          {pref.showPayment !== false && (data?.payment?.upi || data?.payment?.bankDetails || data?.payment?.qrCode || data?.payment?.link) && (
            <section className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Payments</h2>
              <div className="space-y-4">
                {data.payment.upi && (
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/35 px-5 py-4 shadow-sm backdrop-blur-md">
                    <span className="font-bold text-[9px] uppercase tracking-wider text-slate-400">UPI ID</span>
                    <span className="text-right font-mono text-xs font-bold text-slate-800 select-all">{data.payment.upi}</span>
                  </div>
                )}
                {data.payment.bankDetails && (
                  <div className="rounded-2xl border border-white/60 bg-white/20 p-5 font-mono text-[11px] leading-6 text-slate-600 whitespace-pre-line shadow-inner">
                    {data.payment.bankDetails}
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" 
                    className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg duration-300"
                    style={{ backgroundColor: primaryColor, boxShadow: `0 10px 25px ${primaryColor}20` }}
                  >
                    Pay Online
                  </a>
                )}
              </div>
            </section>
          )}

          {pref.showContactForm !== false && (
            <section id="contact" className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Message Me</h2>
              <form onSubmit={handleEnquiry} className="space-y-3.5">
                <input name="name" required placeholder="Full name" className="w-full rounded-2xl border border-white/60 bg-white/30 px-5 py-4 text-xs font-bold outline-none backdrop-blur-md shadow-inner focus:border-white/80 focus:bg-white/40 transition-all duration-300 text-slate-800 placeholder-slate-400" />
                <input name="phone" type="tel" placeholder="Phone number" className="w-full rounded-2xl border border-white/60 bg-white/30 px-5 py-4 text-xs font-bold outline-none backdrop-blur-md shadow-inner focus:border-white/80 focus:bg-white/40 transition-all duration-300 text-slate-800 placeholder-slate-400" />
                <textarea name="message" required rows="4" placeholder="Message" className="w-full resize-none rounded-2xl border border-white/60 bg-white/30 px-5 py-4 text-xs font-bold outline-none backdrop-blur-md shadow-inner focus:border-white/80 focus:bg-white/40 transition-all duration-300 text-slate-800 placeholder-slate-400" />
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg duration-300" style={{ backgroundColor: primaryColor, color: "#ffffff", boxShadow: `0 10px 25px ${primaryColor}20` }}>
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </section>
          )}

          {/* Share Section */}
          {pref.showShare !== false && (
            <div id="share" className={`scroll-mt-6 ${cardClasses} flex flex-col items-center`}>
              <div className="flex flex-col items-center gap-6 justify-center w-full">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Connect QR</span>
                  <div className="rounded-[1.75rem] p-4 flex items-center justify-center w-[180px] h-[180px] bg-white border border-white shadow-inner">
                    <QRCodeSVG 
                      value={typeof window !== "undefined" ? window.location.href : "https://nexcard.app"} 
                      size={148} 
                      level="Q" 
                      fgColor="#111827"
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
                </div>

                {(data?.payment?.qrCode || data?.payment?.upi) && (
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Pay QR</span>
                    <div className="rounded-[1.75rem] p-4 flex items-center justify-center w-[180px] h-[180px] bg-white border border-white shadow-inner">
                      {data.payment.qrCode ? (
                        <img src={data.payment.qrCode} alt="Payment QR" className="w-full h-full object-contain rounded-xl" />
                      ) : (
                        <QRCodeSVG value={`upi://pay?pa=${encodeURIComponent(data.payment.upi)}&pn=${encodeURIComponent(data.name || 'Payment')}&cu=INR`} size={148} level="M" fgColor="#111827" />
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : "Digital Card", url: window.location.href }).catch(console.error);
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-colors border-0 bg-transparent cursor-pointer"
              >
                <Share2 className="h-4 w-4" style={{ color: primaryColor }} />
                Share Profile
              </button>
            </div>
          )}
        </main>
      </div>

      {/* 📱 MOBILE APP BOTTOM NAVIGATION */}
      <BottomNav data={data} primaryColor={primaryColor} showWhatsAppInput={showWhatsAppInput} setShowWhatsAppInput={setShowWhatsAppInput} layout="frosted" inPreview={inPreview} />
    </div>
  );
}
