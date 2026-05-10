"use client";

import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, Calendar, Share2, Star, ArrowRight, User, Play, Briefcase } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

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

  const primaryColor = data?.theme?.primary || "#111111";
  
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans flex justify-center text-slate-800 selection:bg-slate-200" style={{ scrollBehavior: "smooth" }}>
      <div className="w-full max-w-[500px] min-h-screen bg-white shadow-[0_0_80px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col">
        
        {/* AVANT-GARDE HEADER */}
        <div className="w-full pt-20 pb-16 px-10 flex flex-col items-center relative">
          
          {data?.image && (
            <div className="w-48 h-48 rounded-full overflow-hidden mb-12 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] relative group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img src={data.image} alt={data.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
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
        <div className="flex justify-center gap-10 px-10 mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[1px] bg-slate-100 -z-10"></div>
          
          {data?.phone && <a href={`tel:${data.phone}`} className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:scale-110 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"><Phone className="w-5 h-5" strokeWidth={1} /></a>}
          {data?.phone && <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:scale-110 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"><MessageCircle className="w-5 h-5" strokeWidth={1} /></a>}
          {data?.email && <a href={`mailto:${data.email}`} className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:scale-110 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"><Mail className="w-5 h-5" strokeWidth={1} /></a>}
          {data?.address && <a href="#map" className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:scale-110 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"><MapPin className="w-5 h-5" strokeWidth={1} /></a>}
        </div>

        <div className="flex-1 flex flex-col gap-28 pb-32">
          
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
          <div className="px-10 flex flex-col gap-4">
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
              <div className="flex flex-col gap-5">
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
              <div className="flex flex-col items-center gap-6">
                {['instagram', 'linkedin', 'twitter', 'youtube', 'facebook'].map(network => 
                  data.social[network] && (
                    <a key={network} href={data.social[network]} target="_blank" rel="noreferrer" className="text-2xl font-extralight capitalize text-slate-400 hover:text-slate-900 transition-colors duration-500 relative group overflow-hidden">
                      {network}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-900 -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500"></div>
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
            <form onSubmit={handleEnquiry} className="flex flex-col gap-10">
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
