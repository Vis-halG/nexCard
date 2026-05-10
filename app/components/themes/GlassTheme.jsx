"use client";

import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, Calendar, Share2, Star, CreditCard, User, Briefcase, Video, Link as LinkIcon, Send } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

export default function GlassTheme({ data }) {
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

  const primaryColor = data?.theme?.primary || "#E879F9";
  
  // High-end glass card styling
  const glassCardClasses = "bg-white/[0.04] backdrop-blur-3xl border-t border-l border-white/[0.1] border-b border-r border-transparent shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-3xl p-7 relative overflow-hidden";
  
  return (
    <div className="min-h-screen bg-black font-sans flex justify-center text-white selection:bg-white/30 selection:text-white relative overflow-hidden" style={{ scrollBehavior: "smooth" }}>
      
      {/* 🌌 MULTI-LAYERED ANIMATED ORBS */}
      <div className="fixed top-[-15%] left-[-15%] w-[70vw] h-[70vw] rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none animate-pulse duration-10000" style={{ backgroundColor: primaryColor }}></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-30 mix-blend-screen pointer-events-none" style={{ backgroundColor: primaryColor }}></div>
      <div className="fixed top-[40%] left-[20%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20 mix-blend-screen pointer-events-none" style={{ backgroundColor: "#3b82f6" }}></div>

      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>

      <div className="w-full max-w-[480px] min-h-screen relative z-10 px-5 py-12 pb-32">
        
        {/* HEADER GLASS CARD */}
        <div className={`flex flex-col items-center mt-6 mb-8 group ${glassCardClasses}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="w-36 h-36 rounded-full p-1 relative mb-6">
             <div className="absolute inset-0 rounded-full animate-spin-slow opacity-60" style={{ background: `linear-gradient(to right, ${primaryColor}, transparent)` }}></div>
             <div className="absolute inset-1 rounded-full bg-black"></div>
             <img src={data?.image || "https://i.pravatar.cc/150"} alt="Profile" className="w-full h-full object-cover rounded-full relative z-10 border-2 border-transparent" />
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-2">{data?.name || "Name"}</h1>
          <p className="text-transparent bg-clip-text font-bold text-center tracking-widest uppercase text-sm" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, #fff)` }}>{data?.title || "Title"}</p>
          {data?.company && <p className="text-white/40 text-xs mt-2 uppercase tracking-[0.2em] text-center font-medium">{data.company}</p>}
          
          {/* QUICK ICONS */}
          <div className="flex justify-center gap-4 mt-8 w-full">
            {data?.phone && <a href={`tel:${data.phone}`} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"><Phone className="w-5 h-5 text-white/90" /></a>}
            {data?.phone && <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-[#25D366]/80 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"><MessageCircle className="w-5 h-5 text-white/90" /></a>}
            {data?.email && <a href={`mailto:${data.email}`} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"><Mail className="w-5 h-5 text-white/90" /></a>}
            {data?.address && <a href="#map" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"><MapPin className="w-5 h-5 text-white/90" /></a>}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-4 mb-10">
          <button onClick={generateVcard} className="w-full py-4 rounded-2xl bg-white text-black font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] relative overflow-hidden group">
            <Download className="w-4 h-4" /> Save Credentials
          </button>
          
          {data?.calendarUrl && (
             <a href={data.calendarUrl} target="_blank" rel="noreferrer" className="w-full py-4 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:bg-white/10 transition-all hover:border-white/30">
                <Calendar className="w-4 h-4 text-white/60" /> Book Session
             </a>
          )}
        </div>

        <div className="space-y-8">
          
          {/* ABOUT */}
          {data?.about && (
            <div className={glassCardClasses}>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-5 flex items-center gap-3"><User className="w-4 h-4" /> Biography</h2>
              <p className="text-white/70 leading-loose font-light text-[15px]">{data.about}</p>
            </div>
          )}

          {/* SERVICES */}
          {data?.services?.length > 0 && (
            <div className={glassCardClasses}>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-5 flex items-center gap-3"><Briefcase className="w-4 h-4" /> Capabilities</h2>
              <div className="flex flex-wrap gap-2">
                {data.services.map((s, i) => (
                  <span key={i} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/90 shadow-inner hover:bg-white/10 transition-colors cursor-default">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* SOCIAL */}
          <div className={glassCardClasses}>
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-5 flex items-center gap-3"><Globe className="w-4 h-4" /> Network</h2>
            <div className="grid grid-cols-2 gap-3">
              {data?.social?.instagram && <a href={data.social.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"><InstagramIcon className="w-5 h-5" style={{color: primaryColor}}/> Instagram</a>}
              {data?.social?.linkedin && <a href={data.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"><LinkedinIcon className="w-5 h-5" style={{color: primaryColor}}/> LinkedIn</a>}
              {data?.social?.twitter && <a href={data.social.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"><TwitterIcon className="w-5 h-5" style={{color: primaryColor}}/> Twitter</a>}
              {data?.social?.youtube && <a href={data.social.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"><YoutubeIcon className="w-5 h-5" style={{color: primaryColor}}/> YouTube</a>}
              {data?.social?.facebook && <a href={data.social.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"><FacebookIcon className="w-5 h-5" style={{color: primaryColor}}/> Facebook</a>}
            </div>
          </div>

          {/* GALLERY */}
          {data?.gallery?.length > 0 && (
            <div className={glassCardClasses}>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-5">Portfolio</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.gallery.map((img, i) => img && (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative group">
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIDEOS */}
          {data?.videos?.length > 0 && (
            <div className={glassCardClasses}>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-5 flex items-center gap-3"><Video className="w-4 h-4" /> Transmissions</h2>
              <div className="space-y-6">
                {data.videos.map((vid, i) => (
                  <div key={i} className="w-full overflow-hidden rounded-2xl border border-white/10 shadow-inner relative pt-[56.25%] bg-black/40 group">
                    <iframe className="absolute top-0 left-0 w-full h-full group-hover:scale-[1.02] transition-transform duration-700" src={vid.includes('youtube.com/watch?v=') ? vid.replace('watch?v=', 'embed/') : vid} frameBorder="0" allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOM LINKS */}
          {data?.customLinks?.length > 0 && (
            <div className={glassCardClasses}>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-5 flex items-center gap-3"><LinkIcon className="w-4 h-4" /> Databases</h2>
              <div className="space-y-3">
                {data.customLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-white/90 text-[15px] font-medium group">
                    {link.title} <Globe className="w-4 h-4 text-white/20 group-hover:text-white/80 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENTS */}
          {data?.payment && (
            <div className={glassCardClasses}>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-5 flex items-center gap-3"><CreditCard className="w-4 h-4" /> Transactions</h2>
              <div className="space-y-5 text-[15px] text-white/80">
                {data.payment.upi && (
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/40 font-medium tracking-widest text-xs uppercase">UPI ID</span>
                    <span className="font-mono text-white tracking-widest">{data.payment.upi}</span>
                  </div>
                )}
                {data.payment.gstNumber && (
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/40 font-medium tracking-widest text-xs uppercase">GSTIN</span>
                    <span className="font-mono text-white tracking-widest uppercase">{data.gstNumber}</span>
                  </div>
                )}
                {data.payment.bankDetails && (
                  <div className="pt-2">
                    <span className="text-white/40 font-medium tracking-widest text-xs uppercase block mb-3">Bank Details</span>
                    <div className="bg-black/30 p-5 rounded-2xl border border-white/5 font-mono text-sm whitespace-pre-line text-white/70 shadow-inner leading-relaxed">
                      {data.payment.bankDetails}
                    </div>
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" className="block w-full text-center py-4 bg-white/10 border border-white/20 rounded-2xl text-white font-bold tracking-widest uppercase text-sm hover:bg-white/20 hover:border-white/40 transition-all mt-4 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    Initiate Transfer
                  </a>
                )}
              </div>
            </div>
          )}

          {/* LOCATION */}
          {data?.address && (
            <div id="map" className={glassCardClasses}>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-5 flex items-center gap-3"><MapPin className="w-4 h-4" /> Coordinates</h2>
              <p className="text-white/70 text-[15px] mb-6 font-light leading-relaxed">{data.address}</p>
              <div className="w-full h-56 rounded-2xl overflow-hidden border border-white/10 bg-black/40 mb-6 shadow-inner relative group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`} className="filter contrast-125"></iframe>
              </div>
            </div>
          )}

          {/* CONTACT FORM */}
          <div className={glassCardClasses}>
             <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-5 flex items-center gap-3"><MessageSquare className="w-4 h-4" /> Uplink</h2>
             <form onSubmit={handleEnquiry} className="space-y-4">
                <input type="text" name="name" required placeholder="Designation / Name" className="w-full p-5 bg-black/30 border border-white/10 rounded-2xl focus:outline-none focus:border-white/40 focus:bg-black/50 text-white placeholder:text-white/30 text-[15px] transition-all" />
                <input type="tel" name="phone" placeholder="Comm Link / Phone" className="w-full p-5 bg-black/30 border border-white/10 rounded-2xl focus:outline-none focus:border-white/40 focus:bg-black/50 text-white placeholder:text-white/30 text-[15px] transition-all" />
                <textarea name="message" required placeholder="Encrypted Message..." rows="4" className="w-full p-5 bg-black/30 border border-white/10 rounded-2xl focus:outline-none focus:border-white/40 focus:bg-black/50 text-white placeholder:text-white/30 text-[15px] transition-all resize-none"></textarea>
                <button type="submit" className="w-full py-4 bg-white/10 border border-white/20 text-white font-bold tracking-widest uppercase text-sm rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-white/20 transition-all mt-2 flex justify-center gap-2 items-center">
                  <Send className="w-4 h-4" /> Transmit
                </button>
             </form>
          </div>

          {/* REVIEWS */}
          {data?.googleReviewsUrl && (
            <div className={`${glassCardClasses} text-center overflow-visible`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <div className="flex justify-center mb-5 gap-2 relative z-10">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] fill-white" strokeWidth={1} />)}
              </div>
              <h3 className="font-bold text-xl mb-3 tracking-wide relative z-10">System Evaluation</h3>
              <p className="text-white/50 text-sm mb-8 font-light relative z-10">Log your experience in the central database.</p>
              <a href={data.googleReviewsUrl} target="_blank" rel="noreferrer" className="inline-block w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-white font-bold tracking-widest uppercase text-sm hover:bg-white/20 transition-all relative z-10">
                Write Log
              </a>
            </div>
          )}

          {/* QR */}
          <div className="pt-8 flex flex-col items-center">
             <div className="p-1 bg-gradient-to-br from-white/40 to-white/5 rounded-[2rem] shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-8">
               <div className="bg-black/80 backdrop-blur-xl p-5 rounded-[1.8rem]">
                 <div className="bg-white p-2 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                   <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} size={160} level="H" fgColor="#000" />
                 </div>
               </div>
             </div>
             <button onClick={() => {
                if (navigator.share) { navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
              }} className="flex items-center gap-3 text-white/50 font-bold tracking-widest uppercase text-xs hover:text-white transition-colors">
                <Share2 className="w-4 h-4" /> Share Matrix
             </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
