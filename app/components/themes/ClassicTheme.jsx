"use client";

import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, User, Briefcase, Send, QrCode, Eye, Calendar, CreditCard, Share2, Star, Check, ExternalLink } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import BottomNav from "../BottomNav";

const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

export default function ClassicTheme({ data }) {
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
    <div className="min-h-screen flex justify-center font-sans pb-16 pt-8 selection:bg-slate-900 selection:text-white" style={{ backgroundColor: wrapperBg, scrollBehavior: "smooth" }}>
      
        <div className="w-full max-w-[480px] min-h-screen bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.18)] overflow-hidden relative border border-white bg-clip-padding">
        
        {/* EXECUTIVE TOP BAR */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="font-serif font-bold text-slate-900 tracking-tight text-xl flex items-center gap-3">
             <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }}></div>
             {data?.name ? data.name.split(' ')[0] : 'Profile'}
          </div>
          <div className="flex gap-5">
             <a href="#about" className="text-slate-400 hover:text-slate-900 transition-all hover:-translate-y-0.5"><User size={20} strokeWidth={1.5} /></a>
             <a href="#contact" className="text-slate-400 hover:text-slate-900 transition-all hover:-translate-y-0.5"><Mail size={20} strokeWidth={1.5} /></a>
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
          <div className="flex justify-center gap-4 mt-10 w-full px-4">
            {data?.phone && (
              <a href={`tel:${data.phone}`} className="w-12 h-12 rounded-full border border-slate-200 text-slate-600 hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] hover:-translate-y-1" style={{ hoverBackgroundColor: primaryColor }}>
                <Phone className="w-5 h-5" strokeWidth={1.5} />
              </a>
            )}
            {data?.phone && (
              <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-slate-200 text-slate-600 hover:text-white hover:bg-[#25D366] hover:border-transparent flex items-center justify-center transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(37,211,102,0.3)] hover:-translate-y-1">
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              </a>
            )}
            {data?.email && (
              <a href={`mailto:${data.email}`} className="w-12 h-12 rounded-full border border-slate-200 text-slate-600 hover:text-white hover:bg-slate-900 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] hover:-translate-y-1">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </a>
            )}
            {data?.address && (
              <a href="#map" className="w-12 h-12 rounded-full border border-slate-200 text-slate-600 hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] hover:-translate-y-1" style={{ hoverBackgroundColor: primaryColor }}>
                <MapPin className="w-5 h-5" strokeWidth={1.5} />
              </a>
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
          {data?.about && (
            <div id="about" className="scroll-mt-24">
              <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
                Biography
                <div className="w-10 h-0.5" style={{ backgroundColor: primaryColor }}></div>
              </h2>
              <p className="text-slate-500 leading-loose text-[15px] font-light">{data.about}</p>
            </div>
          )}

          {/* SERVICES */}
          {data?.services?.length > 0 && (
            <div className="scroll-mt-24">
              <h2 className="text-2xl font-serif text-slate-900 mb-6 flex flex-col gap-2">
                Areas of Practice
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
            <div className="flex flex-wrap gap-3">
              {data?.social?.instagram && (
                <a href={data.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                  className="w-14 h-14 border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-pink-600 hover:bg-pink-50 hover:border-pink-300 hover:shadow-[0_10px_20px_-5px_rgba(236,72,153,0.15)] transition-all duration-300 hover:-translate-y-0.5 rounded-sm">
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
          {data?.gallery?.length > 0 && (
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
          {data?.videos?.length > 0 && (
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
          {data?.customLinks?.length > 0 && (
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
          {data?.payment && (
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
                {data.payment.gstNumber && (
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <span className="text-slate-400 font-medium tracking-widest uppercase text-xs">GSTIN</span>
                    <span className="font-mono font-medium text-slate-900 text-[15px] uppercase">{data.gstNumber}</span>
                  </div>
                )}
                {data.payment.bankDetails && (
                  <div className="pt-2">
                    <span className="text-slate-400 font-medium tracking-widest uppercase text-xs block mb-3">Bank Details</span>
                    <p className="text-[13px] font-mono leading-relaxed text-slate-600 whitespace-pre-line bg-slate-50 p-4 border border-slate-100 rounded-sm">{data.payment.bankDetails}</p>
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" className="block w-full text-center py-4 text-white font-medium tracking-widest uppercase text-xs mt-6 transition-all hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 rounded-sm" style={{ backgroundColor: primaryColor }}>
                    Make a Secure Payment
                  </a>
                )}
              </div>
            </div>
          )}

          {/* LOCATION */}
          {data?.address && (
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

          {/* GOOGLE REVIEWS */}
          {data?.googleReviewsUrl && (
            <div className="bg-slate-50 text-slate-900 p-10 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.10)] rounded-sm relative overflow-hidden text-center border border-slate-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>
              
              <div className="flex justify-center mb-5 gap-1.5 relative z-10">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-6 h-6 text-yellow-500 fill-yellow-500" strokeWidth={1.5} />)}
              </div>
              <h3 className="font-serif text-2xl mb-3 relative z-10">Client Feedback</h3>
              <p className="text-slate-500 font-light text-[15px] mb-8 relative z-10">Your experience is paramount to us.</p>
              <a href={data.googleReviewsUrl} target="_blank" rel="noreferrer" className="inline-block w-full py-4 text-white font-medium tracking-widest uppercase text-xs transition-colors relative z-10 rounded-sm shadow-[0_10px_20px_-5px_rgba(15,23,42,0.15)]" style={{ backgroundColor: primaryColor }}>
                Leave a Review
              </a>
            </div>
          )}

          {/* SHARE QR */}
          <div className="pt-10 border-t border-slate-100 flex flex-col items-center">
             <div className="p-4 bg-white border border-slate-100 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] mb-8 rounded-sm">
                <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} size={160} level="H" fgColor="#0F172A" />
             </div>
             <button onClick={() => {
                if (navigator.share) { navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
              }} className="flex items-center justify-center gap-3 text-slate-500 font-medium tracking-widest uppercase text-xs hover:text-slate-900 transition-colors">
                <Share2 className="w-4 h-4" /> Share Credentials
             </button>
          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center py-8 bg-slate-50 border-t border-slate-100">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400 uppercase">Powered by NexCard</p>
        </div>

      </div>
      
      {/* Injecting CSS logic to override background colors cleanly on hover */}
      <style dangerouslySetInnerHTML={{__html: `
        [style*="hoverBackgroundColor"]:hover { background-color: ${primaryColor} !important; border-color: ${primaryColor} !important; }
      `}} />
      {/* 📱 MOBILE APP BOTTOM NAVIGATION */}
      <BottomNav data={data} primaryColor={primaryColor} />
    </div>
  );
}
