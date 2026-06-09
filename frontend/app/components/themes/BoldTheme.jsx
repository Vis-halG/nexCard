"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  CreditCard,
  Download,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  Share2,
  Star,
  MoreHorizontal,
} from "lucide-react";

import { QRCodeSVG } from "qrcode.react";
import BottomNav from "../BottomNav";

const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);
const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);


const SOCIAL_ICONS = {
  instagram: (cls) => <InstagramIcon className={cls} />,
  linkedin:  (cls) => <LinkedinIcon  className={cls} />,
  twitter:   (cls) => <TwitterIcon   className={cls} />,
  youtube:   (cls) => <YoutubeIcon   className={cls} />,
  facebook:  (cls) => <FacebookIcon  className={cls} />,
};

const SOCIAL_COLORS = {
  instagram: "hover:text-pink-500 hover:bg-pink-50 hover:border-pink-200",
  linkedin:  "hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200",
  twitter:   "hover:text-sky-500 hover:bg-sky-50 hover:border-sky-200",
  youtube:   "hover:text-red-600 hover:bg-red-50 hover:border-red-200",
  facebook:  "hover:text-blue-700 hover:bg-blue-50 hover:border-blue-300",
};

export default function BoldTheme({ data, inPreview = false }) {
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

  const primaryColor = data?.theme?.primary || "#0EA5A4";
  const savedBg = data?.theme?.background || "#F7FBF8";
  const bgColor = isDarkHex(savedBg) ? "#F7FBF8" : savedBg;
  const socials = Object.entries(data?.social || {}).filter(([, url]) => url);

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

  return (
    <div className="min-h-screen flex justify-center font-sans text-slate-900 selection:bg-teal-100" style={{ backgroundColor: bgColor, scrollBehavior: "smooth" }}>
      <div className="w-full max-w-[500px] min-h-screen overflow-hidden bg-white shadow-[0_35px_90px_rgba(15,23,42,0.10)]">
        <section id="home" className="relative px-6 pb-8 pt-8">
          <button 
            onClick={() => setShowWhatsAppInput(true)} 
            className="absolute top-12 right-10 z-40 w-10 h-10 rounded-2xl bg-white/70 hover:bg-white backdrop-blur-md border border-slate-200/50 flex items-center justify-center text-slate-700 shadow-md cursor-pointer"
          >
            <Share2 size={18} />
          </button>
          <div 
            className="absolute inset-x-0 top-0 h-72 bg-cover bg-center" 
            style={data?.coverImage ? {
              backgroundImage: `url(${data.coverImage})`
            } : { 
              background: `linear-gradient(135deg, ${primaryColor}22, #f8d49d55)` 
            }} 
          >
            {data?.coverImage && <div className="absolute inset-0 bg-black/10"></div>}
          </div>
          <div className="relative rounded-[2rem] border border-white bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: primaryColor }}>
                  Signature Card
                </p>
                <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-slate-950">
                  {data?.name || "Your Name"}
                </h1>
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                  {data?.title || "Professional Title"}
                </p>
                {data?.company && <p className="mt-2 text-sm font-semibold text-slate-500">{data.company}</p>}
              </div>
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-[1.5rem] border-4 border-white bg-slate-100 shadow-xl">
                <img src={data?.image || "https://i.pravatar.cc/180"} alt={data?.name || "Profile"} className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="mt-7 grid grid-cols-4 gap-2">
              {visibleActions.map((act) => (
                <a
                  key={act.id}
                  href={act.href}
                  target={act.target}
                  rel={act.rel}
                  className="group flex flex-col items-center justify-center rounded-2xl bg-slate-50 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <span className="mb-1 text-slate-500 group-hover:scale-110 transition-transform">
                    {act.id === 'whatsapp'
                      ? act.icon("w-5 h-5 fill-current")
                      : act.icon("w-5 h-5 stroke-current")
                    }
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider">{act.label}</span>
                </a>
              ))}

              {hasMore ? (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className={`group flex flex-col items-center justify-center rounded-2xl py-3 transition ${
                    showMore ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className={`mb-1 transition-transform group-hover:scale-110 ${showMore ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`}>
                    <MoreHorizontal className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider">More</span>
                </button>
              ) : (
                actions.slice(3, 4).map((act) => (
                  <a
                    key={act.id}
                    href={act.href}
                    target={act.target}
                    rel={act.rel}
                    className="group flex flex-col items-center justify-center rounded-2xl bg-slate-50 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <span className="mb-1 text-slate-500 group-hover:scale-110 transition-transform">
                      {act.id === 'whatsapp'
                        ? act.icon("w-5 h-5 fill-current")
                        : act.icon("w-5 h-5 stroke-current")
                      }
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider">{act.label}</span>
                  </a>
                ))
              )}

              {!hasMore && actions.length < 4 && Array.from({ length: 4 - actions.length }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-slate-50/40"></div>
              ))}
            </div>

            {hasMore && showMore && (
              <div className="mt-2 grid grid-cols-4 gap-2 animate-in slide-in-from-top duration-300">
                {remainingActions.map((act) => (
                  <a
                    key={act.id}
                    href={act.href}
                    target={act.target}
                    rel={act.rel}
                    className="group flex flex-col items-center justify-center rounded-2xl bg-slate-50 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <span className="mb-1 text-slate-500 group-hover:scale-110 transition-transform">
                      {act.id === 'whatsapp'
                        ? act.icon("w-5 h-5 fill-current")
                        : act.icon("w-5 h-5 stroke-current")
                      }
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider">{act.label}</span>
                  </a>
                ))}
                {Array.from({ length: 4 - remainingActions.length }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-slate-50/40"></div>
                ))}
              </div>
            )}
          </div>

          <div className="relative mt-4 grid gap-3">
            <button
              onClick={generateVcard}
              className="flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_16px_36px_rgba(14,165,164,0.25)] transition hover:-translate-y-0.5"
              style={{ backgroundColor: primaryColor }}
            >
              <Download className="h-4 w-4" />
              Save Contact
            </button>
            {data?.calendarUrl && (
              <a href={data.calendarUrl} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-700">
                <Calendar className="h-4 w-4" />
                Schedule
              </a>
            )}
          </div>
        </section>

        <main className="space-y-5 px-6 pb-24">
          {data?.about && (
            <Panel title="Profile">
              <p className="text-[15px] leading-7 text-slate-600">{data.about}</p>
            </Panel>
          )}

          {data?.services?.length > 0 && (
            <Panel title="Expertise">
              <div className="grid gap-3">
                {data.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 font-bold text-slate-700">
                    <CheckCircle2 className="h-4 w-4" style={{ color: primaryColor }} />
                    {service}
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {socials.length > 0 && (
            <Panel title="Network">
              <div className="flex flex-wrap gap-3">
                {socials.map(([network, url]) => (
                  <a key={network} href={url} target="_blank" rel="noreferrer" aria-label={network}
                    className={`w-14 h-14 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${SOCIAL_COLORS[network] || 'hover:text-slate-700'}`}>
                    {SOCIAL_ICONS[network] ? SOCIAL_ICONS[network]("w-6 h-6") : <ArrowUpRight className="w-6 h-6" />}
                  </a>
                ))}
              </div>
            </Panel>
          )}

          {data?.gallery?.length > 0 && (
            <Panel title="Portfolio">
              <div className="grid grid-cols-2 gap-3">
                {data.gallery.map((img, index) =>
                  img ? (
                    <img key={index} src={img} alt={`Portfolio image ${index + 1}`} className="aspect-[4/5] rounded-2xl object-cover shadow-sm" />
                  ) : null
                )}
              </div>
            </Panel>
          )}

          {data?.videos?.length > 0 && (
            <Panel title="Media">
              <div className="space-y-4">
                {data.videos.map((video, index) => (
                  <div key={index} className="relative overflow-hidden rounded-2xl bg-slate-100 pt-[56.25%]">
                    <iframe
                      title={`Video ${index + 1}`}
                      className="absolute left-0 top-0 h-full w-full"
                      src={video.includes("youtube.com/watch?v=") ? video.replace("watch?v=", "embed/") : video}
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {data?.customLinks?.length > 0 && (
            <Panel title="Resources">
              <div className="space-y-3">
                {data.customLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4 font-black text-slate-800">
                    {link.title}
                    <Globe className="h-4 w-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </Panel>
          )}

          {data?.payment && (
            <Panel title="Payments">
              <div className="space-y-3">
                {data.payment.upi && <InfoRow label="UPI" value={data.payment.upi} />}
                {data.gstNumber && <InfoRow label="GSTIN" value={data.gstNumber} />}
                {data.payment.bankDetails && <p className="rounded-2xl bg-slate-50 p-4 font-mono text-xs leading-6 text-slate-600 whitespace-pre-line">{data.payment.bankDetails}</p>}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black text-white" style={{ backgroundColor: primaryColor }}>
                    <CreditCard className="h-4 w-4" />
                    Make Payment
                  </a>
                )}
              </div>
            </Panel>
          )}

          {data?.address && (
            <Panel title="Location" id="map">
              <p className="mb-4 text-sm leading-6 text-slate-600">{data.address}</p>
              <div className="h-56 overflow-hidden rounded-2xl bg-slate-100">
                <iframe
                  title="Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </Panel>
          )}

          <Panel title="Inquiry">
            <form onSubmit={handleEnquiry} className="space-y-3">
              <input type="text" name="name" required placeholder="Full name" className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 outline-none focus:bg-white focus:ring-2" />
              <input type="tel" name="phone" placeholder="Phone number" className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 outline-none focus:bg-white focus:ring-2" />
              <textarea name="message" required rows="4" placeholder="Message" className="w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 outline-none focus:bg-white focus:ring-2" />
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-black text-white" style={{ backgroundColor: primaryColor }}>
                <Send className="h-4 w-4" />
                Send Request
              </button>
            </form>
          </Panel>

          {data?.googleReviewsUrl && (
            <Panel title="Reviews">
              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <a href={data.googleReviewsUrl} target="_blank" rel="noreferrer" className="font-black" style={{ color: primaryColor }}>
                Write a review
              </a>
            </Panel>
          )}

          <div id="share" className="scroll-mt-6 rounded-[2rem] border border-slate-100 bg-white p-6 text-center shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
            <div className="mx-auto w-fit rounded-2xl bg-slate-50 p-4">
              <QRCodeSVG value={typeof window !== "undefined" ? window.location.href : "https://nexcard.app"} size={148} level="H" fgColor="#0F172A" />
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : "Digital Card", url: window.location.href }).catch(console.error);
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="mx-auto mt-5 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-slate-500"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </main>
      </div>
      {/* 📱 MOBILE APP BOTTOM NAVIGATION */}
      <BottomNav data={data} primaryColor={primaryColor} showWhatsAppInput={showWhatsAppInput} setShowWhatsAppInput={setShowWhatsAppInput} layout="bold" inPreview={inPreview} />
    </div>
  );
}

function IconLink({ href, icon, label }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={label} className="flex h-14 min-h-14 items-center justify-center rounded-2xl border border-slate-100 bg-white text-slate-600 shadow-sm">
      {icon}
    </a>
  );
}

function Panel({ title, children, id }) {
  return (
    <section id={id} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
      <h2 className="mb-5 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">{title}</h2>
      {children}
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
      <span className="font-black uppercase tracking-[0.18em] text-slate-400">{label}</span>
      <span className="text-right font-mono font-bold text-slate-800">{value}</span>
    </div>
  );
}

function isDarkHex(color) {
  if (!/^#[0-9a-f]{6}$/i.test(color)) return false;
  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);
  return (red * 299 + green * 587 + blue * 114) / 1000 < 130;
}
