"use client";

import { useState } from "react";
import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, User, Briefcase, Send, QrCode, Eye, Calendar, CreditCard, Share2, Star, Check, ExternalLink, MoreHorizontal } from "lucide-react";

import { QRCodeSVG } from "qrcode.react";
import BottomNav from "../BottomNav";

const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
  </svg>
);


export default function ClassicTheme({ data, inPreview = false }) {
  const [showMore, setShowMore] = useState(false);
  const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);
  const pref = data?.preferences || {};

  const actions = [];
  if (data?.phone) {
    actions.push({
      id: "call",
      href: `tel:${data.phone}`,
      icon: (cls) => <Phone className={cls} strokeWidth={1.5} />,
      label: "Call",
      hoverClass: "hover:bg-slate-900"
    });
    actions.push({
      id: "whatsapp",
      href: `https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`,
      icon: (cls) => <WhatsAppIcon className={cls} />,
      label: "WhatsApp",
      target: "_blank",
      rel: "noreferrer",
      hoverClass: "hover:bg-[#25D366] hover:shadow-[0_10px_20px_-5px_rgba(37,211,102,0.3)]"
    });
  }
  if (data?.address) {
    actions.push({
      id: "location",
      href: "#map",
      icon: (cls) => <MapPin className={cls} strokeWidth={1.5} />,
      label: "Location",
      hoverClass: "hover:bg-slate-900"
    });
  }
  if (data?.email) {
    actions.push({
      id: "mail",
      href: `mailto:${data.email}`,
      icon: (cls) => <Mail className={cls} strokeWidth={1.5} />,
      label: "Mail",
      hoverClass: "hover:bg-slate-900 hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)]"
    });
  }
  if (data?.phone) {
    actions.push({
      id: "sms",
      href: `sms:${data.phone}`,
      icon: (cls) => <MessageSquare className={cls} strokeWidth={1.5} />,
      label: "SMS",
      hoverClass: "hover:bg-indigo-600 hover:shadow-[0_10px_20px_-5px_rgba(79,70,229,0.2)]"
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

  const primaryColor = data?.theme?.primary || "#1D4ED8";

  const wrapperBg = "#F8FAFC";

  return (
    <div
      className={inPreview
        ? "h-full w-full relative overflow-hidden flex flex-col font-sans selection:bg-slate-900 selection:text-white"
        : `min-h-screen flex justify-center font-sans pb-16 ${inPreview ? "pt-0" : "pt-8"} selection:bg-slate-900 selection:text-white`
      }
      style={inPreview ? { backgroundColor: wrapperBg } : { backgroundColor: wrapperBg, scrollBehavior: "smooth" }}
    >
      <div
        className={inPreview
          ? "w-full h-full overflow-y-auto scrollbar-none bg-white rounded-t-none rounded-b-[2rem] relative border border-white bg-clip-padding flex-1"
          : `w-full max-w-[480px] min-h-screen bg-white ${inPreview ? "rounded-t-none rounded-b-[2rem]" : "rounded-[2rem]"} shadow-[0_30px_60px_-15px_rgba(15,23,42,0.18)] overflow-hidden relative border border-white bg-clip-padding`
        }
      >

        {/* EXECUTIVE TOP BAR */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="font-serif font-bold text-slate-900 tracking-tight text-xl flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            {data?.name ? data.name.split(' ')[0] : 'Profile'}
          </div>
          <div className="flex gap-5 items-center">
            <a href="#about" className="text-slate-400 hover:text-slate-900 transition-all hover:-translate-y-0.5"><User size={20} strokeWidth={1.5} /></a>
            <a href="#contact" className="text-slate-400 hover:text-slate-900 transition-all hover:-translate-y-0.5"><Mail size={20} strokeWidth={1.5} /></a>
            <button onClick={() => setShowWhatsAppInput(true)} className="text-slate-400 hover:text-slate-900 transition-all hover:-translate-y-0.5 cursor-pointer"><Share2 size={20} strokeWidth={1.5} /></button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div id="home" className="flex flex-col items-center text-center relative bg-gradient-to-b from-slate-50/50 to-white">
          {data?.coverImage && (
            <div className="w-full h-40 relative">
              <img src={data.coverImage} className="w-full h-full object-cover" alt="Cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>
            </div>
          )}

          {!data?.coverImage && <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>}

          <div className={`px-8 ${data?.coverImage ? '-mt-20' : 'pt-12'} pb-10 flex flex-col items-center w-full relative z-10`}>

            <div className="relative group">
              <div className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" style={{ backgroundColor: primaryColor }}></div>
              <div className="w-36 h-36 rounded-full border-4 border-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden mb-8 relative z-10 bg-slate-100">
                <img
                  src={data?.image || "https://i.pravatar.cc/150"}
                  alt={data?.name || "profile"}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>

            <h1 className="text-4xl font-serif text-slate-900 tracking-tight">
              {data?.name || "Your Name"}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-4 mb-5 w-full">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-200"></div>
              <p className="text-slate-500 font-medium text-[15px] tracking-widest uppercase">
                {data?.title || "Professional Title"}
              </p>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-200"></div>
            </div>

            {data?.company && (
              <p className="text-slate-400 font-medium text-sm tracking-widest uppercase">
                {data.company}
              </p>
            )}

            {/* LUXURY ACTION ROW */}
            <div className="flex flex-col items-center gap-4 mt-10 w-full px-4">
              <div className="flex justify-center gap-4 w-full">
                {visibleActions.map((act) => (
                  <a
                    key={act.id}
                    href={act.href}
                    target={act.target}
                    rel={act.rel}
                    className={`w-12 h-12 rounded-full border border-slate-200 text-slate-600 hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] hover:-translate-y-1 group ${act.hoverClass || ''}`}
                    style={act.id === 'call' || act.id === 'location' ? { hoverBackgroundColor: primaryColor } : undefined}
                  >
                    {act.id === "whatsapp"
                      ? act.icon("w-5 h-5 fill-slate-600 group-hover:fill-white transition-colors duration-300")
                      : act.icon("w-5 h-5 stroke-slate-600 group-hover:stroke-white transition-colors duration-300")
                    }
                  </a>
                ))}

                {hasMore ? (
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className={`w-12 h-12 rounded-full border border-slate-200 hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group ${showMore
                        ? 'bg-slate-900 text-white border-transparent shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)]'
                        : 'text-slate-600 hover:bg-slate-900'
                      }`}
                    style={!showMore ? { hoverBackgroundColor: primaryColor } : undefined}
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
                      className={`w-12 h-12 rounded-full border border-slate-200 text-slate-600 hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] hover:-translate-y-1 group ${act.hoverClass || ''}`}
                      style={act.id === 'mail' ? undefined : { hoverBackgroundColor: primaryColor }}
                    >
                      {act.id === "whatsapp"
                        ? act.icon("w-5 h-5 fill-slate-600 group-hover:fill-white transition-colors duration-300")
                        : act.icon("w-5 h-5 stroke-slate-600 group-hover:stroke-white transition-colors duration-300")
                      }
                    </a>
                  ))
                )}
              </div>

              {hasMore && showMore && (
                <div className="flex justify-center gap-4 w-full animate-in slide-in-from-top duration-300">
                  {remainingActions.map((act) => (
                    <a
                      key={act.id}
                      href={act.href}
                      target={act.target}
                      rel={act.rel}
                      className={`w-12 h-12 rounded-full border border-slate-200 text-slate-600 hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] hover:-translate-y-1 group ${act.hoverClass || ''}`}
                      style={act.id === 'sms' ? undefined : (act.id === 'mail' ? undefined : { hoverBackgroundColor: primaryColor })}
                    >
                      {act.id === "whatsapp"
                        ? act.icon("w-5 h-5 fill-slate-600 group-hover:fill-white transition-colors duration-300")
                        : act.icon("w-5 h-5 stroke-slate-600 group-hover:stroke-white transition-colors duration-300")
                      }
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 📥 PRIMARY CTA (EXECUTIVE BUTTON) */}
        <div className="px-8 py-8 border-y border-slate-100 bg-slate-50/50">
          <button
            onClick={generateVcard}
            className="w-full py-4 text-white font-medium tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 rounded-sm"
            style={{ backgroundColor: primaryColor }}
          >
            <Download className="w-4 h-4" /> Save to Contacts
          </button>

          {data?.calendarUrl && (
            <a
              href={data.calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full mt-4 py-4 bg-white border border-slate-200 text-slate-700 font-medium tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.05)] rounded-sm"
            >
              <Calendar className="w-4 h-4 text-slate-400" /> Schedule Meeting
            </a>
          )}
        </div>

        <div className="px-8 py-12 space-y-16">

          {/* ABOUT */}
          {pref.showAbout !== false && data?.about && (
            <div id="about" className="scroll-mt-24">
              <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
                Biography
                <div className="w-10 h-0.5" style={{ backgroundColor: primaryColor }}></div>
              </h2>
              <p className="text-slate-500 leading-loose text-[15px] font-light">{data.about}</p>
            </div>
          )}

          {/* SERVICES */}
          {pref.showServices !== false && data?.services?.length > 0 && (
            <div className="scroll-mt-24">
              <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
                Specialities
                <div className="w-10 h-0.5" style={{ backgroundColor: primaryColor }}></div>
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {data.services.map((s, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-100 group hover:border-slate-300 transition-colors">
                    <Check className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: primaryColor }} />
                    <span className="text-slate-700 font-medium tracking-wide text-[15px]">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOCIAL LINKS */}
          <div id="social" className="scroll-mt-24">
            <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
              Connect
              <div className="w-10 h-0.5" style={{ backgroundColor: primaryColor }}></div>
            </h2>
            <div className="flex overflow-x-auto whitespace-nowrap gap-3 pb-2">
              {data?.social?.instagram && (
                <a href={data.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                  className="inline-flex w-14 h-14 border border-slate-200 bg-white items-center justify-center text-slate-400 hover:text-pink-600 hover:bg-pink-50 hover:border-pink-300 hover:shadow-[0_10px_20px_-5px_rgba(236,72,153,0.15)] transition-all duration-300 hover:-translate-y-0.5 rounded-sm shrink-0">
                  <InstagramIcon className="w-5 h-5" />
                </a>
              )}
              {data?.social?.linkedin && (
                <a href={data.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                  className="w-14 h-14 border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:shadow-[0_10px_20px_-5px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-0.5 rounded-sm">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {data?.social?.twitter && (
                <a href={data.social.twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)"
                  className="w-14 h-14 border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-sky-500 hover:bg-sky-50 hover:border-sky-300 hover:shadow-[0_10px_20px_-5px_rgba(56,189,248,0.15)] transition-all duration-300 hover:-translate-y-0.5 rounded-sm">
                  <TwitterIcon className="w-5 h-5" />
                </a>
              )}
              {data?.social?.youtube && (
                <a href={data.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"
                  className="w-14 h-14 border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-300 hover:shadow-[0_10px_20px_-5px_rgba(239,68,68,0.15)] transition-all duration-300 hover:-translate-y-0.5 rounded-sm">
                  <YoutubeIcon className="w-5 h-5" />
                </a>
              )}
              {data?.social?.facebook && (
                <a href={data.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"
                  className="w-14 h-14 border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:shadow-[0_10px_20px_-5px_rgba(24,119,242,0.15)] transition-all duration-300 hover:-translate-y-0.5 rounded-sm">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* GALLERY */}
          {pref.showGallery !== false && data?.gallery?.length > 0 && (
            <div id="portfolio" className="scroll-mt-24">
              <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
                Portfolio
                <div className="w-10 h-0.5" style={{ backgroundColor: primaryColor }}></div>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {data.gallery.map((img, i) => img && (
                  <div key={i} className="aspect-[4/5] bg-slate-100 overflow-hidden shadow-[0_10px_20px_-5px_rgba(0,0,0,0.05)] group relative rounded-sm">
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500"></div>
                    <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIDEOS */}
          {pref.showVideos !== false && data?.videos?.length > 0 && (
            <div className="scroll-mt-24">
              <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
                Media Presentations
                <div className="w-10 h-0.5" style={{ backgroundColor: primaryColor }}></div>
              </h2>
              <div className="space-y-6">
                {data.videos.map((vid, i) => (
                  <div key={i} className="w-full overflow-hidden border border-slate-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] relative pt-[56.25%] bg-slate-100 rounded-sm">
                    <iframe className="absolute top-0 left-0 w-full h-full" src={vid.includes('youtube.com/watch?v=') ? vid.replace('watch?v=', 'embed/') : vid} frameBorder="0" allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOM LINKS */}
          {pref.showCustomLinks !== false && data?.customLinks?.length > 0 && (
            <div className="scroll-mt-24">
              <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
                Resources
                <div className="w-10 h-0.5" style={{ backgroundColor: primaryColor }}></div>
              </h2>
              <div className="space-y-3">
                {data.customLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between px-6 py-5 bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.05)] transition-all duration-300 text-slate-800 font-medium tracking-wide group rounded-sm">
                    {link.title} <Globe className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENTS */}
          {pref.showPayment !== false && data?.payment && (
            <div className="scroll-mt-24">
              <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
                Payment Integration
                <div className="w-10 h-0.5" style={{ backgroundColor: primaryColor }}></div>
              </h2>
              <div className="bg-white border border-slate-200 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] p-8 space-y-5 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[100px] -z-10"></div>
                {data.payment.upi && (
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <span className="text-slate-400 font-medium tracking-widest uppercase text-xs">UPI ID</span>
                    <span className="font-mono font-medium text-slate-900 text-[15px]">{data.payment.upi}</span>
                  </div>
                )}

                {data.payment.bankDetails && (
                  <div className="pt-2">
                    <span className="text-slate-400 font-medium tracking-widest uppercase text-xs block mb-3">Bank Details</span>
                    <p className="text-[13px] font-mono leading-relaxed text-slate-600 whitespace-pre-line bg-slate-50 p-4 border border-slate-100 rounded-sm">{data.payment.bankDetails}</p>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* LOCATION */}
          {pref.showLocation !== false && data?.address && (
            <div id="map" className="scroll-mt-24">
              <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
                Office Location
                <div className="w-10 h-0.5" style={{ backgroundColor: primaryColor }}></div>
              </h2>
              <div className="bg-slate-50 p-6 border border-slate-100 rounded-sm shadow-[0_10px_20px_-5px_rgba(0,0,0,0.02)]">
                <p className="text-slate-600 mb-6 font-light leading-relaxed">{data.address}</p>
                <div className="w-full h-56 border border-slate-200 shadow-sm relative mb-6 bg-slate-100 rounded-sm overflow-hidden">
                  <iframe width="100%" height="100%" style={{ border: 0, position: 'absolute', top: 0, left: 0 }} loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}></iframe>
                </div>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.address)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-white border border-slate-200 text-slate-700 font-medium tracking-widest uppercase text-xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all rounded-sm">
                  <MapPin className="w-4 h-4" /> Get Directions
                </a>
              </div>
            </div>
          )}

          {/* CONTACT FORM */}
          <div id="contact" className="scroll-mt-24">
            <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
              Direct Inquiry
              <div className="w-10 h-0.5" style={{ backgroundColor: primaryColor }}></div>
            </h2>
            <form onSubmit={handleEnquiry} className="space-y-4">
              <input type="text" name="name" required placeholder="Full Name" className="w-full p-5 border border-slate-200 bg-slate-50 focus:outline-none focus:border-slate-400 focus:bg-white text-[15px] font-light transition-all rounded-sm placeholder:text-slate-400" />
              <input type="tel" name="phone" placeholder="Phone Number" className="w-full p-5 border border-slate-200 bg-slate-50 focus:outline-none focus:border-slate-400 focus:bg-white text-[15px] font-light transition-all rounded-sm placeholder:text-slate-400" />
              <textarea name="message" required placeholder="Your Message" rows="5" className="w-full p-5 border border-slate-200 bg-slate-50 focus:outline-none focus:border-slate-400 focus:bg-white text-[15px] font-light transition-all rounded-sm placeholder:text-slate-400 resize-none"></textarea>
              <button type="submit" className="w-full py-5 text-white font-medium tracking-widest uppercase text-xs transition-all hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 rounded-sm mt-2" style={{ backgroundColor: primaryColor }}>
                Submit Inquiry
              </button>
            </form>
          </div>



          {/* SHARE QR */}
          <div id="share" className="scroll-mt-6 pt-10 border-t border-slate-100 flex flex-col items-center">
            {data?.payment?.upi || data?.payment?.qrCode || data?.payment?.link ? (
              <div className="flex flex-col items-center gap-6 w-full px-4">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">Connect</span>
                  <div className="p-3.5 bg-white border border-slate-100 shadow-sm rounded-sm flex items-center justify-center w-[180px] h-[180px]">
                    <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} size={152} level="H" fgColor="#0F172A" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">Pay Now</span>
                  <div className="p-3.5 bg-white border border-slate-100 shadow-sm rounded-sm flex items-center justify-center w-[180px] h-[180px]">
                    {data.payment?.qrCode ? (
                      <img src={data.payment.qrCode} alt="Payment QR" className="w-full h-full object-contain" />
                    ) : data.payment?.upi ? (
                      <QRCodeSVG value={`upi://pay?pa=${encodeURIComponent(data.payment.upi)}&pn=${encodeURIComponent(data.name || 'Payment')}&cu=INR`} size={152} level="M" fgColor="#0F172A" />
                    ) : (
                      <span className="text-[9px] text-slate-400 font-mono">No QR</span>
                    )}
                  </div>
                </div>
                <div className="w-full max-w-[320px] px-4 space-y-4 flex flex-col items-center">
                  <button onClick={() => {
                    if (navigator.share) { navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
                  }} className="flex items-center justify-center gap-3 text-slate-500 font-medium tracking-widest uppercase text-xs hover:text-slate-900 transition-colors">
                    <Share2 className="w-4 h-4" /> Share Credentials
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 bg-white border border-slate-100 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] mb-8 rounded-sm">
                  <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} size={160} level="H" fgColor="#0F172A" />
                </div>
                <button onClick={() => {
                  if (navigator.share) { navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
                }} className="flex items-center justify-center gap-3 text-slate-500 font-medium tracking-widest uppercase text-xs hover:text-slate-900 transition-colors">
                  <Share2 className="w-4 h-4" /> Share Credentials
                </button>
              </>
            )}
          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center py-8 bg-slate-50 border-t border-slate-100">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400 uppercase">Powered by NexCard</p>
        </div>

      </div>

      {/* Injecting CSS logic to override background colors cleanly on hover */}
      <style dangerouslySetInnerHTML={{
        __html: `
        [style*="hoverBackgroundColor"]:hover { background-color: ${primaryColor} !important; border-color: ${primaryColor} !important; }
      `}} />
      {/* 📱 MOBILE APP BOTTOM NAVIGATION */}
      <BottomNav data={data} primaryColor={primaryColor} showWhatsAppInput={showWhatsAppInput} setShowWhatsAppInput={setShowWhatsAppInput} layout="classic" inPreview={inPreview} />
    </div>
  );
}
