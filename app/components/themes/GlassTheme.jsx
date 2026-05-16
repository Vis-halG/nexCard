"use client";

import {
  Calendar,
  Download,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  Share2,
  Sparkles,
  Star,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import BottomNav from "../BottomNav";

const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);
const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);

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

export default function GlassTheme({ data }) {
  const primaryColor = data?.theme?.primary || "#B76E79";
  const savedBackground = data?.theme?.background || "#FFF7F3";
  const backgroundColor = isDarkHex(savedBackground) ? "#FFF7F3" : savedBackground;

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
  const cardClasses =
    "rounded-[1.75rem] border border-white/80 bg-white/72 p-6 shadow-[0_24px_70px_rgba(183,110,121,0.12)] backdrop-blur-2xl";

  return (
    <div
      className="min-h-screen flex justify-center font-sans text-slate-800 selection:bg-rose-200 selection:text-slate-900"
      style={{
        background:
          `radial-gradient(circle at top left, ${primaryColor}26, transparent 34%), radial-gradient(circle at bottom right, #f9c6b944, transparent 32%), ${backgroundColor}`,
        scrollBehavior: "smooth",
      }}
    >
      <div className="w-full max-w-[480px] min-h-screen px-5 py-8 pb-28 relative overflow-hidden">
        <div className="absolute inset-x-8 top-10 h-72 rounded-full bg-white/50 blur-3xl pointer-events-none" />

        <section id="home" className={`${cardClasses} relative overflow-hidden text-center`}>
          <div
            className="absolute inset-x-0 top-0 h-48 opacity-90 bg-cover bg-center"
            style={data?.coverImage ? {
              backgroundImage: `url(${data.coverImage})`
            } : {
              background: `linear-gradient(135deg, ${primaryColor} 0%, #f7b7a3 100%)`,
            }}
          >
            {data?.coverImage && <div className="absolute inset-0 bg-black/20"></div>}
          </div>
          <div className="relative z-10 flex flex-col items-center pt-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" style={{ color: primaryColor }} />
              Premium Glass
            </div>
            <div className="h-36 w-36 rounded-full border-[6px] border-white bg-white shadow-[0_18px_45px_rgba(15,23,42,0.16)] overflow-hidden">
              <img
                src={data?.image || "https://i.pravatar.cc/180"}
                alt={data?.name || "Profile"}
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">
              {data?.name || "Your Name"}
            </h1>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
              {data?.title || "Professional Title"}
            </p>
            {data?.company && <p className="mt-2 text-sm font-medium text-slate-500">{data.company}</p>}

            <div className="mt-8 grid w-full grid-cols-4 gap-3">
              {data?.phone && <QuickAction href={`tel:${data.phone}`} icon={<Phone />} label="Call" />}
              {data?.phone && <QuickAction href={`https://wa.me/${data.phone.replace(/[^0-9]/g, "")}`} icon={<MessageCircle />} label="Chat" />}
              {data?.email && <QuickAction href={`mailto:${data.email}`} icon={<Mail />} label="Mail" />}
              {data?.address && <QuickAction href="#map" icon={<MapPin />} label="Map" />}
            </div>
          </div>
        </section>

        <div className="mt-5 grid gap-3">
          <button
            onClick={generateVcard}
            className="flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_18px_35px_rgba(183,110,121,0.28)] transition hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, #d89b86)` }}
          >
            <Download className="h-4 w-4" />
            Save Contact
          </button>
          {data?.calendarUrl && (
            <a
              href={data.calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur-xl"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </a>
          )}
        </div>

        <main className="mt-5 space-y-5">
          {data?.about && (
            <Section title="About" className={cardClasses}>
              <p className="text-[15px] leading-7 text-slate-600">{data.about}</p>
            </Section>
          )}

          {data?.services?.length > 0 && (
            <Section title="Services" className={cardClasses}>
              <div className="flex flex-wrap gap-2">
                {data.services.map((service, index) => (
                  <span key={index} className="rounded-full border border-rose-100 bg-rose-50/70 px-4 py-2 text-sm font-bold text-slate-700">
                    {service}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {socials.length > 0 && (
            <Section title="Connect" className={cardClasses}>
              <div className="flex flex-wrap gap-3">
                {socials.map(([network, url]) => (
                  <a key={network} href={url} target="_blank" rel="noreferrer" aria-label={network}
                    className={`w-14 h-14 rounded-2xl border border-slate-100 bg-white/80 flex items-center justify-center text-slate-400 shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${SOCIAL_COLORS[network] || 'hover:text-slate-700'}` }>
                    {SOCIAL_ICONS[network] ? SOCIAL_ICONS[network]("w-6 h-6") : <ExternalLink className="w-6 h-6" />}
                  </a>
                ))}
              </div>
            </Section>
          )}

          {data?.gallery?.length > 0 && (
            <Section title="Gallery" className={cardClasses}>
              <div className="grid grid-cols-2 gap-3">
                {data.gallery.map((img, index) =>
                  img ? (
                    <img key={index} src={img} alt={`Gallery image ${index + 1}`} className="aspect-square rounded-2xl object-cover shadow-md" />
                  ) : null
                )}
              </div>
            </Section>
          )}

          {data?.customLinks?.length > 0 && (
            <Section title="Links" className={cardClasses}>
              <div className="space-y-3">
                {data.customLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4 font-bold text-slate-800">
                    {link.title}
                    <Globe className="h-4 w-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </Section>
          )}

          {data?.payment && (
            <Section title="Payments" className={cardClasses}>
              <InfoRows data={data} />
            </Section>
          )}

          {data?.address && (
            <Section title="Location" className={cardClasses} id="map">
              <p className="mb-4 text-sm leading-6 text-slate-600">{data.address}</p>
              <div className="h-56 overflow-hidden rounded-2xl border border-white bg-slate-100 shadow-inner">
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
            </Section>
          )}

          <Section title="Contact" className={cardClasses}>
            <form onSubmit={handleEnquiry} className="space-y-3">
              <input name="name" required placeholder="Full name" className="w-full rounded-2xl border border-slate-100 bg-white/80 px-5 py-4 outline-none focus:ring-2" />
              <input name="phone" type="tel" placeholder="Phone number" className="w-full rounded-2xl border border-slate-100 bg-white/80 px-5 py-4 outline-none focus:ring-2" />
              <textarea name="message" required rows="4" placeholder="Message" className="w-full resize-none rounded-2xl border border-slate-100 bg-white/80 px-5 py-4 outline-none focus:ring-2" />
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-black text-white" style={{ backgroundColor: primaryColor }}>
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </Section>

          {data?.googleReviewsUrl && (
            <Section title="Reviews" className={`${cardClasses} text-center`}>
              <div className="mb-4 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <a href={data.googleReviewsUrl} target="_blank" rel="noreferrer" className="font-bold" style={{ color: primaryColor }}>
                Write a review
              </a>
            </Section>
          )}

          <div className={`${cardClasses} flex flex-col items-center`}>
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
              <QRCodeSVG value={typeof window !== "undefined" ? window.location.href : "https://nexcard.app"} size={150} level="H" fgColor="#111827" />
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
              className="mt-5 flex items-center gap-2 text-sm font-bold text-slate-500"
            >
              <Share2 className="h-4 w-4" />
              Share Profile
            </button>
          </div>
        </main>
      </div>
      {/* 📱 MOBILE APP BOTTOM NAVIGATION */}
      <BottomNav data={data} primaryColor={primaryColor} />
    </div>
  );
}

function QuickAction({ href, icon, label }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="flex h-14 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-slate-600 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5" aria-label={label}>
      {icon}
    </a>
  );
}

function Section({ title, children, className, id }) {
  return (
    <section id={id} className={className}>
      <h2 className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-slate-400">{title}</h2>
      {children}
    </section>
  );
}

function InfoRows({ data }) {
  return (
    <div className="space-y-3 text-sm">
      {data.payment.upi && <InfoRow label="UPI" value={data.payment.upi} />}
      {data.gstNumber && <InfoRow label="GSTIN" value={data.gstNumber} />}
      {data.payment.bankDetails && <p className="rounded-2xl bg-slate-50 p-4 font-mono text-xs leading-6 text-slate-600 whitespace-pre-line">{data.payment.bankDetails}</p>}
      {data.payment.link && (
        <a href={data.payment.link} target="_blank" rel="noreferrer" className="block rounded-2xl bg-slate-900 px-5 py-4 text-center font-bold text-white">
          Make Payment
        </a>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
      <span className="font-bold text-slate-400">{label}</span>
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
