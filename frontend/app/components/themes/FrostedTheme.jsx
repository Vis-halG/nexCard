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
  const cardClasses = "rounded-[2rem] border border-white/50 bg-white/45 p-6 shadow-[0_12px_40px_rgba(31,38,135,0.04)] backdrop-blur-xl transition-all duration-300";

  return (
    <div
      className={inPreview 
        ? "h-full w-full relative overflow-hidden flex flex-col font-sans text-slate-800 frosted-selection"
        : "min-h-screen flex justify-center font-sans text-slate-800 frosted-selection"
      }
      style={{
        background: backgroundColor,
        scrollBehavior: inPreview ? undefined : "smooth",
      }}
    >
      {/* 🔮 Background Mesh Blob Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full blur-[80px] pointer-events-none opacity-40 blob-1" style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-30 blob-2" style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}></div>

      <div 
        className={inPreview
          ? "w-full h-full overflow-y-auto scrollbar-none px-5 pt-4 pb-20 relative flex-1 z-10"
          : `w-full max-w-[480px] min-h-screen px-5 pt-4 pb-20 relative overflow-hidden z-10`
        }
      >
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
                  className="flex items-center justify-start gap-3 px-4 py-3.5 rounded-2xl border border-white/50 bg-white/50 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 frosted-btn text-xs font-bold uppercase tracking-wider"
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
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl border border-white/50 bg-white/50 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 frosted-btn text-xs font-bold uppercase tracking-wider"
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
                    className="flex items-center justify-start gap-3 px-4 py-3.5 rounded-2xl border border-white/50 bg-white/50 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 frosted-btn text-xs font-bold uppercase tracking-wider"
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
                    className="flex items-center justify-start gap-3 px-4 py-3.5 rounded-2xl border border-white/50 bg-white/50 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 frosted-btn text-xs font-bold uppercase tracking-wider"
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
        {pref.showSaveContact !== false && (
          <div className="mt-5 mb-5 space-y-3">
            <button
              onClick={generateVcard}
              className="flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-md transition-all hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor}dd)`, boxShadow: `0 10px 25px ${primaryColor}25` }}
            >
              <Download className="h-4 w-4" />
              Save Contact
            </button>

            {data?.calendarUrl && (
              <a
                href={data.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/60 bg-white/40 px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur-md hover:-translate-y-0.5 frosted-btn"
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

          {pref.showServices !== false && data?.services?.length > 0 && (
            <section className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Specialities</h2>
              <div className="flex flex-wrap gap-2">
                {data.services.map((service, index) => (
                  <span key={index} className="rounded-xl border border-white/60 bg-white/30 px-4 py-2 text-xs font-bold text-slate-755 shadow-sm backdrop-blur-md">
                    {service}
                  </span>
                ))}
              </div>
            </section>
          )}

          {pref.showSocial !== false && socials.length > 0 && (
            <section id="social" className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Connect</h2>
              <div className="grid grid-cols-5 gap-3.5">
                {socials.map(([network, url]) => (
                  <a key={network} href={url} target="_blank" rel="noreferrer" aria-label={network}
                    className="aspect-square w-full max-w-12 justify-self-center rounded-2xl border border-white/60 bg-white/35 flex items-center justify-center text-slate-500 shadow-sm transition-all duration-350 hover:-translate-y-0.5 frosted-btn">
                    <Globe className="w-5 h-5" style={{ color: primaryColor }} />
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

          {/* Featured Links Section */}
          {pref.showCustomLinks !== false && data?.customLinks?.length > 0 && (
            <section className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Featured Links</h2>
              <div className="space-y-3">
                {data.customLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noreferrer" 
                    className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/35 px-5 py-4 font-bold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 frosted-btn">
                    <span className="text-xs uppercase tracking-wider" style={{ color: primaryColor }}>{link.title}</span>
                    <ChevronRight className="h-4.5 w-4.5 text-slate-400" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Payments Section */}
          {pref.showPayment !== false && (data?.payment?.upi || data?.payment?.bankDetails || data?.payment?.qrCode || data?.payment?.link) && (
            <section className={cardClasses}>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Payments</h2>
              <div className="space-y-4">
                {data.payment.upi && (
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/35 px-4.5 py-3.5 shadow-sm">
                    <span className="font-bold text-[9px] uppercase tracking-wider text-slate-400">UPI ID</span>
                    <span className="text-right font-mono text-xs font-bold text-slate-800">{data.payment.upi}</span>
                  </div>
                )}
                {data.payment.bankDetails && (
                  <div className="rounded-2xl border border-white/60 bg-white/20 p-4.5 font-mono text-[11px] leading-6 text-slate-600 whitespace-pre-line shadow-inner">
                    {data.payment.bankDetails}
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" 
                    className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: primaryColor }}
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
                <input name="name" required placeholder="Full name" className="w-full rounded-2xl border border-white/60 bg-white/30 px-5 py-4 text-xs font-bold outline-none backdrop-blur-md shadow-inner focus:border-indigo-400" />
                <input name="phone" type="tel" placeholder="Phone number" className="w-full rounded-2xl border border-white/60 bg-white/30 px-5 py-4 text-xs font-bold outline-none backdrop-blur-md shadow-inner focus:border-indigo-400" />
                <textarea name="message" required rows="4" placeholder="Message" className="w-full resize-none rounded-2xl border border-white/60 bg-white/30 px-5 py-4 text-xs font-bold outline-none backdrop-blur-md shadow-inner focus:border-indigo-400" />
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5" style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
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
                    <QRCodeSVG value={typeof window !== "undefined" ? window.location.href : "https://nexcard.app"} size={148} level="H" fgColor="#111827" />
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
