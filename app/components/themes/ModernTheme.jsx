"use client";

import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, User, Briefcase, Send, QrCode, Eye, Calendar, CreditCard, Share2, Star } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

export default function ModernTheme({ data }) {
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

  const primaryColor = data?.theme?.primary || "#111111";
  const bgColor = data?.theme?.background || "#ffffff";

  return (
    <div className="min-h-screen flex justify-center bg-slate-50 font-sans pb-28 selection:bg-black selection:text-white" style={{ scrollBehavior: "smooth" }}>
      <div 
        className="w-full max-w-[430px] min-h-screen relative overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.05)] sm:rounded-b-[2.5rem]"
        style={{ backgroundColor: bgColor }}
      >
        {/* 🔥 HERO SECTION (Organic & Clean) */}
        <div id="home" className="relative pb-10">
          <div 
            className="h-64 w-full relative" 
            style={{ 
              background: `linear-gradient(145deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
              clipPath: "ellipse(120% 100% at 50% 0%)"
            }}
          >
            {/* Subtle mesh background effect inside the hero header */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)", backgroundSize: "32px 32px" }}></div>
          </div>

          <div className="px-6 relative -mt-24 flex flex-col items-center">
            {/* Subtly Floating Profile Image */}
            <div className="w-40 h-40 rounded-full border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden bg-white relative z-10 transition-transform hover:scale-105 duration-500">
              <img 
                src={data?.image || "https://i.pravatar.cc/150"} 
                alt={data?.name || "profile"} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-5 flex flex-col items-center">
              <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight text-center">
                {data?.name || "Your Name"}
              </h1>
              <p className="text-slate-500 font-medium text-[15px] mt-1 text-center" style={{ color: primaryColor }}>
                {data?.title || "Professional Title"}
              </p>
              {data?.company && (
                <p className="text-slate-400 font-medium text-sm text-center mt-1 tracking-wide">
                  at <span className="font-semibold text-slate-600">{data.company}</span>
                </p>
              )}
            </div>
          </div>

          {/* ⚡ CLEAN QUICK ACTIONS (Glass/Soft Shadows) */}
          <div className="flex justify-center flex-wrap gap-4 mt-8 px-6">
            {data?.phone && (
              <a href={`tel:${data.phone}`} className="w-[52px] h-[52px] rounded-2xl bg-white text-slate-700 hover:text-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-center justify-center hover:-translate-y-1 group" style={{ hoverBackgroundColor: primaryColor }}>
                <Phone className="w-5 h-5 group-hover:stroke-current" />
              </a>
            )}
            {data?.phone && (
              <a href={`sms:${data.phone}`} className="w-[52px] h-[52px] rounded-2xl bg-white text-slate-700 hover:text-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-center justify-center hover:-translate-y-1 group hover:bg-[#8B5CF6]">
                <MessageSquare className="w-5 h-5 group-hover:stroke-white" />
              </a>
            )}
            {data?.phone && (
              <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-[52px] h-[52px] rounded-2xl bg-white text-slate-700 hover:text-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-center justify-center hover:-translate-y-1 group hover:bg-[#25D366]">
                <MessageCircle className="w-5 h-5 group-hover:stroke-white" />
              </a>
            )}
            {data?.email && (
              <a href={`mailto:${data.email}`} className="w-[52px] h-[52px] rounded-2xl bg-white text-slate-700 hover:text-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-center justify-center hover:-translate-y-1 group hover:bg-[#EA4335]">
                <Mail className="w-5 h-5 group-hover:stroke-white" />
              </a>
            )}
            {data?.address && (
              <a href="#map" className="w-[52px] h-[52px] rounded-2xl bg-white text-slate-700 hover:text-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-center justify-center hover:-translate-y-1 group hover:bg-[#F59E0B]">
                <MapPin className="w-5 h-5 group-hover:stroke-white" />
              </a>
            )}
          </div>

          {/* 📥 SAVE CONTACT (Ultra Premium Button) */}
          <div className="px-8 mt-10">
            <button 
              onClick={generateVcard}
              className="w-full py-[18px] rounded-[1.25rem] text-white font-bold flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-400 relative overflow-hidden group"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}ee)` }}
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
                className="w-full mt-4 py-[16px] rounded-[1.25rem] text-slate-700 bg-white border border-slate-100 font-semibold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:bg-slate-50 transition-all duration-300"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Book a Meeting</span>
              </a>
            )}
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* CLEAN CONTENT SECTIONS (Whitespace > Borders) */}
        {/* --------------------------------------------------------- */}
        <div className="space-y-14 px-8 pt-6">

          {/* 🌟 ABOUT SECTION */}
          {data?.about && (
            <div id="about" className="scroll-mt-6">
              <h2 className="text-[20px] font-bold text-slate-900 mb-4 tracking-tight">About</h2>
              <p className="text-slate-500 text-[15px] leading-relaxed font-normal">{data.about}</p>
            </div>
          )}

          {/* 🛠 SPECIALTIES */}
          {data?.services?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[20px] font-bold text-slate-900 mb-4 tracking-tight">Core Services</h2>
              <div className="flex flex-wrap gap-2.5">
                {data.services.map((s, i) => (
                  <span key={i} className="px-5 py-2.5 bg-slate-50 text-slate-700 text-[13px] font-semibold rounded-full border border-slate-100/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors hover:bg-slate-100 cursor-default">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 🌐 SOCIAL MEDIA LINKS (Monochrome to Brand Color Hover) */}
          <div id="social" className="scroll-mt-6">
            <h2 className="text-[20px] font-bold text-slate-900 mb-4 tracking-tight">Connect</h2>
            <div className="flex flex-col gap-3">
              {data?.social?.instagram && (
                <a href={data.social.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-pink-200 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(236,72,153,0.08)] transition-all duration-300 text-slate-700 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-pink-50 group-hover:text-pink-500 transition-all">
                      <InstagramIcon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-[15px]">Instagram</span>
                  </div>
                  <Globe className="w-4 h-4 text-slate-300 group-hover:text-pink-300 transition-colors" />
                </a>
              )}
              {data?.social?.linkedin && (
                <a href={data.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(59,130,246,0.08)] transition-all duration-300 text-slate-700 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-[15px]">LinkedIn</span>
                  </div>
                  <Globe className="w-4 h-4 text-slate-300 group-hover:text-blue-300 transition-colors" />
                </a>
              )}
              {data?.social?.twitter && (
                <a href={data.social.twitter} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(14,165,233,0.08)] transition-all duration-300 text-slate-700 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-sky-50 group-hover:text-sky-500 transition-all">
                      <TwitterIcon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-[15px]">X (Twitter)</span>
                  </div>
                  <Globe className="w-4 h-4 text-slate-300 group-hover:text-sky-300 transition-colors" />
                </a>
              )}
              {data?.social?.youtube && (
                <a href={data.social.youtube} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-red-200 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(239,68,68,0.08)] transition-all duration-300 text-slate-700 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-600 transition-all">
                      <YoutubeIcon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-[15px]">YouTube</span>
                  </div>
                  <Globe className="w-4 h-4 text-slate-300 group-hover:text-red-300 transition-colors" />
                </a>
              )}
              {!data?.social && (
                <p className="text-sm text-slate-400">No social profiles added.</p>
              )}
            </div>
          </div>

          {/* 🖼 IMAGE GALLERY */}
          {data?.gallery?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[20px] font-bold text-slate-900 mb-4 tracking-tight">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.gallery.map((img, i) => img ? (
                  <div key={i} className="aspect-square rounded-3xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.06)] relative group cursor-pointer focus-within:ring-2">
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
              <div className="flex flex-col gap-6">
                {data.videos.map((vid, i) => (
                  <div key={i} className="w-full overflow-hidden rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-slate-100 relative pt-[56.25%]">
                    <iframe className="absolute top-0 left-0 w-full h-full" src={vid.includes('youtube.com/watch?v=') ? vid.replace('watch?v=', 'embed/') : vid} title={`Video ${i + 1}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🔗 MODERN CUSTOM LINKS (Soft Cards) */}
          {data?.customLinks?.length > 0 && (
            <div className="scroll-mt-6">
              <h2 className="text-[20px] font-bold text-slate-900 mb-4 tracking-tight">Important Links</h2>
              <div className="flex flex-col gap-3">
                {data.customLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="w-full flex items-center justify-between p-5 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 shadow-[0_4px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 text-slate-800 group">
                    <span className="font-bold text-[15px]">{link.title}</span>
                    <div className="w-10 h-10 rounded-full bg-white text-slate-400 group-hover:text-slate-800 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-colors">
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
              <h2 className="text-[20px] font-bold text-slate-900 mb-4 tracking-tight">Payments</h2>
              <div className="flex flex-col gap-4">
                {data.payment.upi && (
                  <div className="px-5 py-4 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-semibold text-[14px] text-slate-500">UPI ID</span>
                    <span className="text-[15px] font-bold text-slate-900 font-mono tracking-tight">{data.payment.upi}</span>
                  </div>
                )}
                {data.gstNumber && (
                  <div className="px-5 py-4 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-semibold text-[14px] text-slate-500">GSTIN</span>
                    <span className="text-[15px] font-bold text-slate-900 font-mono tracking-tight uppercase">{data.gstNumber}</span>
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center py-4 rounded-3xl text-white font-bold bg-slate-900 hover:bg-black shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 mt-2">
                    Make a Payment
                  </a>
                )}
                {data.payment.bankDetails && (
                  <div className="p-6 rounded-3xl bg-slate-50 border border-transparent shadow-inner mt-2">
                    <h3 className="font-bold text-[14px] text-slate-800 mb-3 uppercase tracking-wider">Bank Details</h3>
                    <p className="text-[14px] text-slate-500 whitespace-pre-line leading-relaxed font-medium">{data.payment.bankDetails}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 🗺 ADDRESS & MAP (Edge to Edge Radius) */}
          {data?.address && (
            <div id="map" className="scroll-mt-6">
              <h2 className="text-[20px] font-bold text-slate-900 mb-4 tracking-tight">Location</h2>
              <p className="text-slate-500 text-[15px] leading-relaxed mb-5 font-normal">{data.address}</p>
              
              <div className="w-full h-56 rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] relative mb-5 border border-slate-100">
                <iframe width="100%" height="100%" style={{ border: 0, position: 'absolute', top: 0, left: 0 }} loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}></iframe>
              </div>
              
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.address)}`} target="_blank" rel="noreferrer" className="w-full py-4 rounded-2xl text-slate-800 font-bold bg-white border border-slate-100 hover:bg-slate-50 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300" style={{ color: primaryColor }}>
                <MapPin className="w-4 h-4" />
                Navigate
              </a>
            </div>
          )}

          {/* ✉ ENQUIRY FORM (Ultra Minimalistic) */}
          <div id="contact" className="scroll-mt-6 pt-6">
            <h2 className="text-[28px] font-extrabold text-slate-900 mb-2 tracking-tight">Let's talk.</h2>
            <p className="text-[15px] text-slate-500 mb-8 font-normal">Send me a direct message and I'll respond shortly.</p>

            <form onSubmit={handleEnquiry} className="space-y-4">
              <div>
                <input type="text" name="name" required placeholder="Full Name" className="w-full px-5 py-4 rounded-2xl border-0 bg-slate-50 text-[15px] focus:outline-none focus:ring-2 focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-800" style={{ focusRingColor: primaryColor }} />
              </div>
              <div>
                <input type="tel" name="phone" placeholder="Phone Number" className="w-full px-5 py-4 rounded-2xl border-0 bg-slate-50 text-[15px] focus:outline-none focus:ring-2 focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-800" />
              </div>
              <div>
                <textarea name="message" required placeholder="Your message..." rows="4" className="w-full px-5 py-4 rounded-2xl border-0 bg-slate-50 text-[15px] focus:outline-none focus:ring-2 focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-800 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-[18px] rounded-2xl text-white font-bold shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 mt-2" style={{ backgroundColor: primaryColor }}>
                Send Message
              </button>
            </form>
          </div>

          {/* ⭐ GOOGLE REVIEWS (Glass Banner) */}
          {data?.googleReviewsUrl && (
            <div className="pt-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-[2rem] p-8 text-center relative overflow-hidden">
                <div className="flex justify-center mb-4 gap-1">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-6 h-6 text-amber-500 fill-amber-500 drop-shadow-sm" />)}
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-1 tracking-tight">Rate your experience</h3>
                <p className="text-[14px] text-slate-500 mb-6 font-medium">Loved working with us? Leave a review!</p>
                <a href={data.googleReviewsUrl} target="_blank" rel="noreferrer" className="inline-block w-full py-4 rounded-2xl text-amber-700 font-bold bg-white/80 backdrop-blur-sm border border-white hover:bg-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all">
                  Write a Review
                </a>
              </div>
            </div>
          )}

          {/* 📲 SHARING & QR CODE (Minimalist) */}
          <div id="share" className="scroll-mt-6 pt-6 pb-4">
            <h2 className="text-[20px] font-bold text-slate-900 mb-6 tracking-tight text-center">Share Profile</h2>
            <div className="flex flex-col items-center">
              <div className="p-5 bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] mb-6 border border-slate-50">
                <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} size={180} level="Q" className="rounded-xl" fgColor="#0F172A" />
              </div>
              <button onClick={() => {
                if (navigator.share) { navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
              }} className="px-8 py-3.5 rounded-full text-slate-700 font-bold bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Link
              </button>
            </div>
          </div>
          
        </div>

        {/* FOOTER & VIEW COUNTER */}
        <div className="text-center pb-12 pt-10">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-400 bg-slate-50 mx-auto w-fit px-4 py-2 rounded-full uppercase tracking-widest">
            <Eye className="w-3.5 h-3.5" />
            Profile views: 1,337
          </div>
          <p className="text-[10px] text-slate-300 mt-5 font-bold tracking-[0.2em] uppercase">Built with NexCard</p>
        </div>
      </div>

      {/* 📱 ULTRA-PREMIUM STICKY BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 md:pb-8 pointer-events-none px-4">
        <div className="pointer-events-auto bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[2rem] px-6 py-3.5 flex items-center gap-7 sm:gap-9 justify-between">
          <a href="#home" className="text-slate-400 hover:text-slate-900 transition-colors flex flex-col items-center gap-1 group">
            <User size={22} className="group-hover:-translate-y-1 transition-transform duration-300" style={{ hoverColor: primaryColor }} />
          </a>
          <a href="#about" className="text-slate-400 hover:text-slate-900 transition-colors flex flex-col items-center gap-1 group">
            <Briefcase size={22} className="group-hover:-translate-y-1 transition-transform duration-300" style={{ hoverColor: primaryColor }} />
          </a>
          <a href="#social" className="text-slate-400 hover:text-slate-900 transition-colors flex flex-col items-center gap-1 group">
            <Globe size={22} className="group-hover:-translate-y-1 transition-transform duration-300" style={{ hoverColor: primaryColor }} />
          </a>
          <a href="#contact" className="text-slate-400 hover:text-slate-900 transition-colors flex flex-col items-center gap-1 group">
            <MessageCircle size={22} className="group-hover:-translate-y-1 transition-transform duration-300" style={{ hoverColor: primaryColor }} />
          </a>
          <a href="#share" className="text-slate-400 hover:text-slate-900 transition-colors flex flex-col items-center gap-1 group">
            <QrCode size={22} className="group-hover:-translate-y-1 transition-transform duration-300" style={{ hoverColor: primaryColor }} />
          </a>
        </div>
      </div>

      {/* Injecting some custom style mapping for hover utilities */}
      <style dangerouslySetInnerHTML={{__html: `
        .group:hover svg.hoverColor { stroke: ${primaryColor}; }
        .focus-color:focus { border-color: ${primaryColor}; box-shadow: 0 0 0 4px ${primaryColor}20; }
      `}} />
    </div>
  );
}