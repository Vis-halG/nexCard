"use client";

import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, Calendar, Share2, Star, ArrowRight, User, Play, Briefcase } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

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

const SOCIAL_HOVER = {
  instagram: "hover:text-pink-500",
  linkedin:  "hover:text-blue-600",
  twitter:   "hover:text-sky-500",
  youtube:   "hover:text-red-600",
  facebook:  "hover:text-blue-700",
};

export default function MinimalTheme({ data }) {
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
  const primaryColor = theme.primary || "#111111";
  const bgColor = theme.background || "#ffffff";
  const fontClass = theme.font || "font-sans";
  const borderRadius = theme.radius || "1rem";
  const avatarRadius = theme.avatarStyle === 'circle' ? '9999px' : (theme.avatarStyle === 'rounded' ? '1.5rem' : '0px');
  
  const cardStyle = theme.cardStyle || 'standard';
  const cardClasses = cardStyle === 'glass' 
    ? 'bg-white/70 backdrop-blur-md border border-white/40' 
    : (cardStyle === 'outline' ? 'bg-transparent border border-slate-200' : 'bg-white border border-slate-100');

  return (
    <div className={`min-h-screen ${fontClass} flex justify-center text-slate-800 selection:bg-slate-200 overflow-x-hidden`} style={{ scrollBehavior: "smooth", backgroundColor: bgColor }}>
      <div className="w-full min-h-screen relative overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.03)]" style={{ backgroundColor: bgColor }}>
        
        {/* ✨ Background Effects Layer */}
        {theme.bgEffect === 'mesh' && (
          <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ background: `radial-gradient(at 0% 0%, ${primaryColor}44 0, transparent 50%), radial-gradient(at 100% 100%, ${primaryColor}33 0, transparent 50%)` }}></div>
        )}

        {/* AVANT-GARDE HEADER */}
        <div className="w-full pt-20 pb-16 px-10 flex flex-col items-center relative">
          
          {data?.image && (
            <div 
              className="w-48 h-48 overflow-hidden mb-12 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] relative group"
              style={{ borderRadius: avatarRadius }}
            >
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img src={data.image} alt={data.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out" />
            </div>
          )}
          
          <h1 className="text-5xl md:text-6xl font-extralight tracking-tighter text-center leading-none text-slate-900 mb-6">
            {data?.name || "Name"}
          </h1>
          
          <div className="flex flex-col items-center gap-1">
            <p className="text-[11px] uppercase tracking-[0.4em] font-medium text-slate-500 text-center">
              {data?.title || "Title"}
            </p>
            {data?.company && (
               <p className="text-[10px] uppercase tracking-[0.3em] font-light text-slate-400 text-center mt-2">
                 {data.company}
               </p>
            )}
          </div>
        </div>

        {/* ULTRA MINIMAL ACTIONS */}
        <div className="flex justify-center gap-8 px-10 mb-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[1px] bg-slate-100 -z-10"></div>
          
          {data?.phone && <a href={`tel:${data.phone}`} className="w-14 h-14 bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:scale-110 transition-all duration-500 shadow-sm" style={{ borderRadius: borderRadius }}><Phone className="w-5 h-5" strokeWidth={1} /></a>}
          {data?.phone && <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-14 h-14 bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:scale-110 transition-all duration-500 shadow-sm" style={{ borderRadius: borderRadius }}><MessageCircle className="w-5 h-5" strokeWidth={1} /></a>}
          {data?.email && <a href={`mailto:${data.email}`} className="w-14 h-14 bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:scale-110 transition-all duration-500 shadow-sm" style={{ borderRadius: borderRadius }}><Mail className="w-5 h-5" strokeWidth={1} /></a>}
          {data?.address && <a href="#map" className="w-14 h-14 bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:scale-110 transition-all duration-500 shadow-sm" style={{ borderRadius: borderRadius }}><MapPin className="w-5 h-5" strokeWidth={1} /></a>}
        </div>

        <div className="flex-1 flex flex-col gap-8 pb-32">
          
          {/* ABOUT */}
          {data?.about && (
            <div className="px-12 text-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300 block mb-6">Introduction</span>
              <p className="text-sm md:text-[15px] leading-loose text-slate-600 font-light max-w-sm mx-auto">
                {data.about}
              </p>
            </div>
          )}

          {/* CTA SECTIONS */}
          <div className="px-10 flex flex-col gap-8">
             <button onClick={generateVcard} className="w-full py-5 border border-slate-900 bg-slate-900 text-white text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-white hover:text-slate-900 transition-colors duration-500">
               Save to Contacts
             </button>
             {data?.calendarUrl && (
               <a href={data.calendarUrl} target="_blank" rel="noreferrer" className="w-full py-5 border border-slate-200 bg-transparent text-slate-900 text-[11px] font-medium tracking-[0.3em] uppercase text-center hover:border-slate-900 transition-colors duration-500">
                 Book Appointment
               </a>
             )}
          </div>

          {/* SERVICES / EXPERTISE */}
          {data?.services?.length > 0 && (
            <div className="px-10 text-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300 block mb-10">Expertise</span>
              <div className="flex flex-col gap-8">
                {data.services.map((s, i) => (
                  <div key={i} className="text-xl md:text-2xl font-extralight tracking-tight text-slate-800">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOCIAL LINKS */}
          {data?.social && Object.keys(data.social).some(k => data.social[k]) && (
            <div className="px-10 text-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300 block mb-10">Connect</span>
              <div className="flex flex-wrap justify-center gap-8">
                {['instagram', 'linkedin', 'twitter', 'youtube', 'facebook'].map(network =>
                  data.social[network] && (
                    <a key={network} href={data.social[network]} target="_blank" rel="noreferrer" aria-label={network}
                      className={`w-14 h-14 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-300 transition-all duration-500 hover:scale-110 hover:border-slate-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] ${SOCIAL_HOVER[network] || 'hover:text-slate-900'}`}>
                      {SOCIAL_ICONS[network] ? SOCIAL_ICONS[network]("w-6 h-6") : <Globe className="w-6 h-6" />}
                    </a>
                  )
                )}
              </div>
            </div>
          )}

          {/* GALLERY - EDGE TO EDGE */}
          {data?.gallery?.length > 0 && (
            <div className="w-full">
               <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300 block mb-10 text-center">Selected Works</span>
               <div className="flex flex-col gap-1">
                 {data.gallery.map((img, i) => img && (
                   <div key={i} className="w-full aspect-[4/3] overflow-hidden group">
                     <img src={img} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out scale-105 group-hover:scale-100" />
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* VIDEOS */}
          {data?.videos?.length > 0 && (
            <div className="px-6">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300 block mb-10 text-center">Media</span>
              <div className="flex flex-col gap-8">
                {data.videos.map((vid, i) => (
                  <div key={i} className="w-full overflow-hidden relative pt-[56.25%] bg-slate-50 group">
                    <iframe className="absolute top-0 left-0 w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-1000" src={vid.includes('youtube.com/watch?v=') ? vid.replace('watch?v=', 'embed/') : vid} frameBorder="0" allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DIRECTORY LINKS */}
          {data?.customLinks?.length > 0 && (
            <div className="px-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300 block mb-10 text-center">Directory</span>
              <div className="flex flex-col">
                {data.customLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="w-full py-8 border-b border-slate-100 flex items-center justify-between group">
                    <span className="text-2xl font-extralight text-slate-500 group-hover:text-slate-900 transition-colors duration-500">{link.title}</span>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 -translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500" strokeWidth={1} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENT */}
          {data?.payment && (
            <div className="px-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300 block mb-10 text-center">Billing</span>
              <div className="flex flex-col items-center gap-8 text-center">
                {data.payment.upi && (
                  <div>
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-slate-400 block mb-2">UPI ID</span>
                    <span className="text-xl font-light text-slate-800">{data.payment.upi}</span>
                  </div>
                )}
                {data.payment.gstNumber && (
                  <div>
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-slate-400 block mb-2">GSTIN</span>
                    <span className="text-xl font-light text-slate-800">{data.gstNumber}</span>
                  </div>
                )}
                {data.payment.bankDetails && (
                  <div>
                     <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-slate-400 block mb-4">Bank Details</span>
                     <p className="text-sm font-light leading-loose text-slate-600 whitespace-pre-line">{data.payment.bankDetails}</p>
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" className="mt-4 px-10 py-4 border border-slate-900 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-slate-900 hover:text-white transition-colors duration-500">
                    Make Payment
                  </a>
                )}
              </div>
            </div>
          )}

          {/* MAP */}
          {data?.address && (
            <div id="map" className="w-full">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300 block mb-10 text-center">Location</span>
              <p className="text-sm font-light text-center text-slate-600 mb-10 px-10 max-w-sm mx-auto leading-loose">{data.address}</p>
              <div className="w-full h-80 filter grayscale hover:grayscale-0 transition-all duration-1000 bg-slate-50">
                <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}></iframe>
              </div>
            </div>
          )}

          {/* CONTACT FORM */}
          <div id="contact" className="px-10">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300 block mb-12 text-center">Inquiries</span>
            <form onSubmit={handleEnquiry} className="flex flex-col gap-8">
              <div className="relative group">
                <input type="text" name="name" required placeholder=" " className="peer w-full bg-transparent border-b border-slate-200 text-sm py-2 focus:outline-none focus:border-slate-900 transition-colors font-light text-slate-900" />
                <label className="absolute left-0 top-2 text-slate-400 text-xs uppercase tracking-widest peer-focus:-translate-y-6 peer-focus:text-[9px] peer-focus:text-slate-900 peer-valid:-translate-y-6 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">Name</label>
              </div>
              <div className="relative group">
                <input type="tel" name="phone" placeholder=" " className="peer w-full bg-transparent border-b border-slate-200 text-sm py-2 focus:outline-none focus:border-slate-900 transition-colors font-light text-slate-900" />
                <label className="absolute left-0 top-2 text-slate-400 text-xs uppercase tracking-widest peer-focus:-translate-y-6 peer-focus:text-[9px] peer-focus:text-slate-900 peer-valid:-translate-y-6 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">Phone</label>
              </div>
              <div className="relative group mt-2">
                <textarea name="message" required placeholder=" " rows="1" className="peer w-full bg-transparent border-b border-slate-200 text-sm py-2 focus:outline-none focus:border-slate-900 transition-colors font-light text-slate-900 resize-none overflow-hidden" onInput={(e) => {e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'}}></textarea>
                <label className="absolute left-0 top-2 text-slate-400 text-xs uppercase tracking-widest peer-focus:-translate-y-6 peer-focus:text-[9px] peer-focus:text-slate-900 peer-valid:-translate-y-6 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">Message</label>
              </div>
              <button type="submit" className="w-full py-5 border border-slate-900 text-slate-900 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-slate-900 hover:text-white transition-colors duration-500 mt-4">
                Send Request
              </button>
            </form>
          </div>

          {/* REVIEWS */}
          {data?.googleReviewsUrl && (
            <div className="px-10 text-center">
               <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300 block mb-10">Feedback</span>
               <div className="flex justify-center mb-10 gap-4">
                 {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 text-slate-300" strokeWidth={1} />)}
               </div>
               <a href={data.googleReviewsUrl} target="_blank" rel="noreferrer" className="text-[11px] uppercase tracking-[0.3em] text-slate-500 hover:text-slate-900 border-b border-slate-300 hover:border-slate-900 pb-2 transition-all duration-500">
                 Write a Review
               </a>
            </div>
          )}
          
          {/* FOOTER & QR */}
          <div className="pt-20 flex flex-col items-center px-10">
             <div className="mb-16">
               <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} size={120} level="L" fgColor="#000" />
             </div>
             <button onClick={() => {
                if (navigator.share) { navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
              }} className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors duration-500 mb-20 text-xs tracking-widest uppercase">
                <Share2 className="w-4 h-4" strokeWidth={1} /> Share Profile
             </button>

             <p className="text-[9px] uppercase tracking-[0.5em] text-slate-300 mb-10">NexCard Minimal</p>
          </div>

        </div>
      </div>
    </div>
  );
}
