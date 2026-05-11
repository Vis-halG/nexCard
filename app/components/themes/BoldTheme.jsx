"use client";

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
  Phone,
  Send,
  Share2,
  Star,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const NETWORKS = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "X",
  facebook: "Facebook",
  youtube: "YouTube",
};

export default function BoldTheme({ data }) {
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
          <div className="absolute inset-x-0 top-0 h-72" style={{ background: `linear-gradient(135deg, ${primaryColor}22, #f8d49d55)` }} />
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
              {data?.phone && <IconLink href={`tel:${data.phone}`} icon={<Phone />} label="Call" />}
              {data?.phone && <IconLink href={`https://wa.me/${data.phone.replace(/[^0-9]/g, "")}`} icon={<MessageCircle />} label="WhatsApp" />}
              {data?.email && <IconLink href={`mailto:${data.email}`} icon={<Mail />} label="Email" />}
              {data?.address && <IconLink href="#map" icon={<MapPin />} label="Location" />}
            </div>
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
              <div className="grid gap-3">
                {socials.map(([network, url]) => (
                  <a key={network} href={url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-50">
                    {NETWORKS[network] || network}
                    <ArrowUpRight className="h-4 w-4 text-slate-400" />
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

          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 text-center shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
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
