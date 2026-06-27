"use client";

import { useState } from "react";
import { Phone, Mail, Globe, MapPin, Download, MessageSquare, Calendar, Share2, Send, Eye, MoreHorizontal, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import BottomNav from "../BottomNav";

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

export default function NeumorphismTheme({ data, inPreview = false }) {
  const [showMore, setShowMore] = useState(false);
  const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);
  const pref = data?.preferences || {};

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

  const theme = data?.theme || {};
  const primaryColor = theme.primary || "#00C2FF";
  const accentColor = theme.accent || "#FFE156";
  const savedBackground = theme.background || "#E8ECF2";
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

  return (
    <div
      className={inPreview 
        ? "h-full w-full relative overflow-hidden flex flex-col font-sans selection:bg-slate-300/40"
        : "min-h-screen flex justify-center font-sans selection:bg-slate-300/40"
      }
      style={{
        backgroundColor: backgroundColor,
        color: "#27272a",
        scrollBehavior: inPreview ? undefined : "smooth",
      }}
    >
      <div 
        className={inPreview
          ? "w-full h-full overflow-y-auto scrollbar-none px-5 pt-4 pb-20 relative flex-1"
          : `w-full max-w-[480px] min-h-screen px-5 pt-4 pb-20 relative overflow-hidden`
        }
      >
        {/* Style block for Neumorphic variables and custom shadows */}
        <style dangerouslySetInnerHTML={{__html: `
          .nm-flat {
            background: ${backgroundColor};
            box-shadow: 7px 7px 14px rgba(165, 177, 198, 0.45), -7px -7px 14px rgba(255, 255, 255, 0.85);
          }
          .nm-inset {
            background: ${backgroundColor};
            box-shadow: inset 4px 4px 8px rgba(165, 177, 198, 0.35), inset -4px -4px 8px rgba(255, 255, 255, 0.8);
            transition: all 0.25s ease-in-out;
          }
          .nm-inset:focus, .nm-inset:focus-within {
            box-shadow: inset 2px 2px 4px rgba(165, 177, 198, 0.25), inset -2px -2px 4px rgba(255, 255, 255, 0.7);
            border-color: ${primaryColor}60 !important;
          }
          .nm-btn {
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .nm-btn:hover {
            box-shadow: 4px 4px 8px rgba(165, 177, 198, 0.35), -4px -4px 8px rgba(255, 255, 255, 0.8);
            transform: translateY(-1.5px) scale(1.015);
          }
          .nm-btn:active {
            box-shadow: inset 3px 3px 6px rgba(165, 177, 198, 0.35), inset -3px -3px 6px rgba(255, 255, 255, 0.8);
            transform: translateY(0.5px) scale(0.99);
          }
        `}} />

        {/* Top Share Button */}
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowWhatsAppInput(true);
          }}
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full flex items-center justify-center text-slate-600 cursor-pointer border-0 transition-all nm-flat nm-btn"
        >
          <Share2 size={18} />
        </button>

        {/* Cover Image Frame */}
        <div id="home" className="relative overflow-hidden text-center nm-flat rounded-[2rem] p-6 mb-6 mt-6">
          <div 
            className="w-full h-44 rounded-2xl overflow-hidden nm-inset relative"
            style={data?.coverImage ? {
              backgroundImage: `url(${data.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            } : {
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor}dd 100%)`
            }}
          >
            {data?.coverImage && <div className="absolute inset-0 bg-black/10"></div>}
          </div>

          <div className="relative z-10 flex flex-col items-center -mt-20">
            {/* Neumorphic Profile Photo Ring */}
            <div className="h-36 w-36 rounded-full p-2.5 flex items-center justify-center nm-inset bg-white">
              <img
                src={data?.image || "https://i.pravatar.cc/180"}
                alt={data?.name || "Profile"}
                className="h-full w-full object-cover rounded-full shadow-inner"
              />
            </div>



            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {data?.name || "Your Name"}
            </h1>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.24em] text-slate-500">
              {data?.title || "Professional Title"}
            </p>
            {data?.company && <p className="mt-2 text-xs font-semibold text-slate-400">{data.company}</p>}

            {/* Quick Actions Panel */}
            <div className="mt-6 grid w-full grid-cols-4 gap-4">
              {visibleActions.map((act) => (
                <a
                  key={act.id}
                  href={act.href}
                  target={act.target}
                  rel={act.rel}
                  className="flex h-12 items-center justify-center rounded-2xl text-slate-600 transition-all border-0 nm-flat nm-btn"
                  aria-label={act.label}
                  style={{ color: act.id === 'whatsapp' ? '#25D366' : primaryColor }}
                >
                  {act.id === 'whatsapp'
                    ? act.icon("w-5 h-5 fill-current")
                    : act.icon("w-5 h-5 stroke-current")
                  }
                </a>
              ))}

              {hasMore ? (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex h-12 items-center justify-center rounded-2xl transition-all border-0 nm-flat nm-btn text-slate-600"
                  style={showMore ? { color: primaryColor } : {}}
                  aria-label="More"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              ) : (
                actions.slice(3, 4).map((act) => (
                  <a
                    key={act.id}
                    href={act.href}
                    target={act.target}
                    rel={act.rel}
                    className="flex h-12 items-center justify-center rounded-2xl text-slate-600 transition-all border-0 nm-flat nm-btn"
                    aria-label={act.label}
                    style={{ color: primaryColor }}
                  >
                    {act.id === 'whatsapp'
                      ? act.icon("w-5 h-5 fill-current")
                      : act.icon("w-5 h-5 stroke-current")
                    }
                  </a>
                ))
              )}
            </div>

            {hasMore && showMore && (
              <div className="mt-4 grid w-full grid-cols-4 gap-4 animate-in slide-in-from-top duration-300">
                {remainingActions.map((act) => (
                  <a
                    key={act.id}
                    href={act.href}
                    target={act.target}
                    rel={act.rel}
                    className="flex h-12 items-center justify-center rounded-2xl text-slate-600 transition-all border-0 nm-flat nm-btn"
                    aria-label={act.label}
                    style={{ color: primaryColor }}
                  >
                    {act.id === 'whatsapp'
                      ? act.icon("w-5 h-5 fill-current")
                      : act.icon("w-5 h-5 stroke-current")
                    }
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Save Contact & Appointment Booker */}
        {pref.showSaveContact !== false && (
          <div className="mt-6 mb-6 space-y-4">
            <button
              onClick={generateVcard}
              className="flex w-full items-center justify-center gap-3 rounded-[1.75rem] py-4 text-xs font-black uppercase tracking-[0.22em] text-white transition-all border-0 nm-flat"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor}dd)`, boxShadow: `6px 6px 15px rgba(165,177,198,0.3), -6px -6px 15px rgba(255,255,255,0.7)` }}
            >
              <Download className="h-4 w-4" />
              Save Contact
            </button>

            {data?.calendarUrl && (
              <a
                href={data.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-[1.75rem] py-4 text-xs font-black uppercase tracking-[0.18em] text-slate-700 transition-all border-0 nm-flat nm-btn"
              >
                <Calendar className="h-4 w-4" style={{ color: primaryColor }} />
                Book Appointment
              </a>
            )}
          </div>
        )}

        {/* Section blocks */}
        <main className="space-y-6">
          {pref.showAbout !== false && data?.about && (
            <section id="about" className="p-6 rounded-[2rem] nm-flat">
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">About</h2>
              <p className="text-sm leading-7 text-slate-600">{data.about}</p>
            </section>
          )}

          {pref.showServices !== false && data?.services?.length > 0 && (
            <section className="p-6 rounded-[2rem] nm-flat">
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Specialities</h2>
              <div className="flex flex-wrap gap-2.5">
                {data.services.map((service, index) => (
                  <span key={index} className="rounded-full px-4.5 py-2 text-xs font-bold text-slate-700 border-0 nm-inset">
                    {service}
                  </span>
                ))}
              </div>
            </section>
          )}

          {pref.showSocial !== false && socials.length > 0 && (
            <section id="social" className="p-6 rounded-[2rem] nm-flat">
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Connect</h2>
              <div className="grid grid-cols-5 gap-3.5">
                {socials.map(([network, url]) => (
                  <a key={network} href={url} target="_blank" rel="noreferrer" aria-label={network}
                    className="aspect-square w-full max-w-12 justify-self-center rounded-2xl flex items-center justify-center text-slate-500 transition-all border-0 nm-flat nm-btn">
                    <Globe className="w-5 h-5" style={{ color: primaryColor }} />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Gallery Section */}
          {pref.showGallery !== false && data?.gallery?.length > 0 && (
            <section className="p-6 rounded-[2rem] nm-flat">
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.gallery.map((img, index) =>
                  img ? (
                    <div key={index} className="aspect-square rounded-2xl p-1.5 nm-inset">
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
                    </div>
                  ) : null
                )}
              </div>
            </section>
          )}

          {/* Custom Links Section */}
          {pref.showCustomLinks !== false && data?.customLinks?.length > 0 && (
            <section className="p-6 rounded-[2rem] nm-flat">
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Featured Links</h2>
              <div className="space-y-4">
                {data.customLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noreferrer" 
                    className="flex items-center justify-between rounded-2xl px-5 py-4 font-bold text-slate-800 transition-all border-0 nm-flat nm-btn">
                    <span className="text-xs uppercase tracking-wide" style={{ color: primaryColor }}>{link.title}</span>
                    <Globe className="h-4 w-4 text-slate-450" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Payments Section */}
          {pref.showPayment !== false && (data?.payment?.upi || data?.payment?.bankDetails || data?.payment?.qrCode || data?.payment?.link) && (
            <section className="p-6 rounded-[2rem] nm-flat">
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Payments</h2>
              <div className="space-y-4">
                {data.payment.upi && (
                  <div className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4 nm-inset">
                    <span className="font-bold text-[10px] uppercase text-slate-400">UPI ID</span>
                    <span className="text-right font-mono text-xs font-bold text-slate-800">{data.payment.upi}</span>
                  </div>
                )}
                {data.payment.bankDetails && (
                  <div className="rounded-2xl p-4 font-mono text-xs leading-6 text-slate-650 whitespace-pre-line nm-inset">
                    {data.payment.bankDetails}
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" 
                    className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black uppercase tracking-wider text-white border-0 transition-all nm-flat nm-btn"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Pay Online
                  </a>
                )}
              </div>
            </section>
          )}

          {pref.showContactForm !== false && (
            <section id="contact" className="p-6 rounded-[2rem] nm-flat">
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Message Me</h2>
              <form onSubmit={handleEnquiry} className="space-y-4">
                <input name="name" required placeholder="Full name" className="w-full rounded-2xl px-5 py-4 text-xs font-bold outline-none border-0 transition-all nm-inset" />
                <input name="phone" type="tel" placeholder="Phone number" className="w-full rounded-2xl px-5 py-4 text-xs font-bold outline-none border-0 transition-all nm-inset" />
                <textarea name="message" required rows="4" placeholder="Message" className="w-full resize-none rounded-2xl px-5 py-4 text-xs font-bold outline-none border-0 transition-all nm-inset" />
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-[0.2em] text-white border-0 transition-all nm-flat nm-btn" style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </section>
          )}

          {/* Share Section */}
          {pref.showShare !== false && (
            <div id="share" className="scroll-mt-6 p-6 rounded-[2rem] flex flex-col items-center nm-flat">
              <div className="flex flex-col items-center gap-6 justify-center w-full">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Connect QR</span>
                  <div className="rounded-[1.75rem] p-4 flex items-center justify-center w-[180px] h-[180px] nm-inset bg-white">
                    <QRCodeSVG value={typeof window !== "undefined" ? window.location.href : "https://nexcard.app"} size={148} level="H" fgColor="#111827" />
                  </div>
                </div>

                {(data?.payment?.qrCode || data?.payment?.upi) && (
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Pay QR</span>
                    <div className="rounded-[1.75rem] p-4 flex items-center justify-center w-[180px] h-[180px] nm-inset bg-white">
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
      <BottomNav data={data} primaryColor={primaryColor} showWhatsAppInput={showWhatsAppInput} setShowWhatsAppInput={setShowWhatsAppInput} layout="neumorphism" inPreview={inPreview} />
    </div>
  );
}
