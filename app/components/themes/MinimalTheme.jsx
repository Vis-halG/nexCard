"use client";

import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, Calendar, Share2, Star, ArrowRight, User, Briefcase } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import BottomNav from "../BottomNav";

const SOCIAL_ICONS = {
  instagram: (cls) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
  linkedin: (cls) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  twitter: (cls) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>,
  youtube: (cls) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>,
  facebook: (cls) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>,
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
  const primaryColor = theme.primary || "#000000";
  const bgColor = theme.background || "#ffffff";
  const fontClass = theme.font || "font-sans";

  return (
    <div className={`min-h-screen ${fontClass} flex justify-center text-black selection:bg-black selection:text-white overflow-x-hidden bg-[#f4f4f5]`} style={{ scrollBehavior: "smooth" }}>
      <div className="w-full max-w-[500px] min-h-screen relative flex flex-col bg-white border-x-4 border-black" style={{ backgroundColor: bgColor }}>
        
        {/* TOP BORDER ACCENT */}
        <div className="w-full h-4 bg-black" style={{ backgroundColor: primaryColor }}></div>

        {data?.coverImage && (
          <div className="w-full h-56 relative border-b-4 border-black">
            <img src={data.coverImage} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" alt="Cover" />
          </div>
        )}

        {/* BRUTALIST HEADER */}
        <div id="home" className={`w-full ${data?.coverImage ? 'pt-8' : 'pt-20'} pb-12 px-8 flex flex-col items-start relative border-b-4 border-black`}>
          <div className="w-full flex justify-between items-start mb-8">
            {data?.image && (
              <div className="w-32 h-32 border-4 border-black shadow-[8px_8px_0_0_#000] relative group bg-white">
                <img src={data.image} alt={data.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
            )}
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black px-2 py-1 bg-black text-white" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>ID: {Math.floor(Math.random() * 9000) + 1000}</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-black mb-4">
            {data?.name || "YOUR NAME"}
          </h1>
          
          <div className="flex flex-col gap-1 w-full border-t-2 border-black pt-4 mt-2">
            <p className="text-sm font-bold uppercase tracking-widest text-black">
              {data?.title || "TITLE"}
            </p>
            {data?.company && (
               <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                 {data.company}
               </p>
            )}
          </div>
        </div>

        {/* BRUTALIST ACTIONS */}
        <div className="grid grid-cols-4 border-b-4 border-black divide-x-4 divide-black bg-white">
          {data?.phone && <a href={`tel:${data.phone}`} className="h-16 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 group"><Phone className="w-6 h-6 stroke-black group-hover:stroke-white" strokeWidth={2.5} /></a>}
          {data?.phone && <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="h-16 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 group"><MessageCircle className="w-6 h-6 stroke-black group-hover:stroke-white" strokeWidth={2.5} /></a>}
          {data?.email && <a href={`mailto:${data.email}`} className="h-16 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 group"><Mail className="w-6 h-6 stroke-black group-hover:stroke-white" strokeWidth={2.5} /></a>}
          {data?.address && <a href="#map" className="h-16 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 group"><MapPin className="w-6 h-6 stroke-black group-hover:stroke-white" strokeWidth={2.5} /></a>}
        </div>

        <div className="flex-1 flex flex-col pb-32 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
          
          {/* ABOUT */}
          {data?.about && (
            <div id="about" className="p-8 border-b-4 border-black bg-white">
              <span className="text-xs font-black uppercase tracking-widest text-black bg-yellow-300 px-2 py-1 inline-block mb-6 shadow-[4px_4px_0_0_#000] border-2 border-black">Overview</span>
              <p className="text-base leading-relaxed text-black font-medium">
                {data.about}
              </p>
            </div>
          )}

          {/* CTA SECTIONS */}
          <div className="p-8 border-b-4 border-black flex flex-col gap-4 bg-[#f4f4f5]">
             <button onClick={generateVcard} className="w-full py-4 border-4 border-black bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300 shadow-[6px_6px_0_0_#000] active:shadow-[0_0_0_0_#000] active:translate-x-1.5 active:translate-y-1.5 flex justify-between px-6 items-center">
               <span>Save Contact</span> <Download className="w-5 h-5" />
             </button>
             {data?.calendarUrl && (
               <a href={data.calendarUrl} target="_blank" rel="noreferrer" className="w-full mt-4 py-4 border-4 border-black bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300 shadow-[6px_6px_0_0_#000] active:shadow-[0_0_0_0_#000] active:translate-x-1.5 active:translate-y-1.5 flex justify-between px-6 items-center" style={{ backgroundColor: primaryColor, color: '#fff' }}>
                 <span>Book Meeting</span> <Calendar className="w-5 h-5" />
               </a>
             )}
          </div>

          {/* SERVICES / EXPERTISE */}
          {data?.services?.length > 0 && (
            <div className="p-8 border-b-4 border-black bg-white">
              <span className="text-xs font-black uppercase tracking-widest text-black bg-cyan-300 px-2 py-1 inline-block mb-6 shadow-[4px_4px_0_0_#000] border-2 border-black">Capabilities</span>
              <div className="flex flex-col gap-0 divide-y-2 divide-black border-2 border-black">
                {data.services.map((s, i) => (
                  <div key={i} className="px-4 py-4 text-lg font-bold tracking-tight text-black hover:bg-black hover:text-white transition-colors duration-300">
                    <span className="text-xs font-mono mr-4 opacity-50">{(i+1).toString().padStart(2, '0')}</span> {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOCIAL LINKS */}
          {data?.social && Object.keys(data.social).some(k => data.social[k]) && (
            <div id="social" className="p-8 border-b-4 border-black bg-[#f4f4f5]">
              <span className="text-xs font-black uppercase tracking-widest text-black bg-pink-300 px-2 py-1 inline-block mb-6 shadow-[4px_4px_0_0_#000] border-2 border-black">Network</span>
              <div className="grid grid-cols-5 gap-0 border-2 border-black bg-white divide-x-2 divide-black">
                {['instagram', 'linkedin', 'twitter', 'youtube', 'facebook'].map(network =>
                  data.social[network] ? (
                    <a key={network} href={data.social[network]} target="_blank" rel="noreferrer" aria-label={network}
                      className="aspect-square flex items-center justify-center hover:bg-black hover:text-white text-black transition-colors duration-300">
                      {SOCIAL_ICONS[network] ? SOCIAL_ICONS[network]("w-6 h-6") : <Globe className="w-6 h-6" />}
                    </a>
                  ) : <div key={network} className="aspect-square bg-slate-100"></div>
                )}
              </div>
            </div>
          )}

          {/* GALLERY - EDGE TO EDGE */}
          {data?.gallery?.length > 0 && (
            <div className="w-full border-b-4 border-black bg-white">
               <div className="p-8 pb-4">
                 <span className="text-xs font-black uppercase tracking-widest text-black bg-green-300 px-2 py-1 inline-block shadow-[4px_4px_0_0_#000] border-2 border-black">Gallery</span>
               </div>
               <div className="flex flex-col gap-0 border-t-4 border-black divide-y-4 divide-black">
                 {data.gallery.map((img, i) => img && (
                   <div key={i} className="w-full aspect-video overflow-hidden relative group">
                     <div className="absolute top-4 left-4 bg-white border-2 border-black px-2 py-1 text-xs font-black z-10 shadow-[2px_2px_0_0_#000]">IMG_{(i+1).toString().padStart(2, '0')}</div>
                     <img src={img} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* VIDEOS */}
          {data?.videos?.length > 0 && (
            <div className="w-full border-b-4 border-black bg-white">
               <div className="p-8 pb-4">
                 <span className="text-xs font-black uppercase tracking-widest text-black bg-orange-300 px-2 py-1 inline-block shadow-[4px_4px_0_0_#000] border-2 border-black">Media</span>
               </div>
               <div className="flex flex-col gap-0 border-t-4 border-black divide-y-4 divide-black">
                {data.videos.map((vid, i) => (
                  <div key={i} className="w-full overflow-hidden relative pt-[56.25%] bg-black">
                    <div className="absolute top-4 right-4 bg-black text-white border-2 border-white px-2 py-1 text-xs font-black z-10 shadow-[2px_2px_0_0_#fff]">VID_{(i+1).toString().padStart(2, '0')}</div>
                    <iframe className="absolute top-0 left-0 w-full h-full filter grayscale hover:grayscale-0 transition-all duration-700" src={vid.includes('youtube.com/watch?v=') ? vid.replace('watch?v=', 'embed/') : vid} frameBorder="0" allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENT */}
          {data?.payment && (
            <div className="p-8 border-b-4 border-black bg-[#f4f4f5]">
              <span className="text-xs font-black uppercase tracking-widest text-black bg-purple-300 px-2 py-1 inline-block mb-6 shadow-[4px_4px_0_0_#000] border-2 border-black">Payment</span>
              <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]">
                {data.payment.upi && (
                  <div className="mb-4 pb-4 border-b-2 border-black border-dashed">
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-500 block mb-1">UPI ID</span>
                    <span className="text-lg font-black text-black">{data.payment.upi}</span>
                  </div>
                )}
                {data.payment.gstNumber && (
                  <div className="mb-4 pb-4 border-b-2 border-black border-dashed">
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-500 block mb-1">GSTIN</span>
                    <span className="text-lg font-black text-black">{data.gstNumber}</span>
                  </div>
                )}
                {data.payment.bankDetails && (
                  <div className="mb-6">
                     <span className="text-xs font-bold tracking-widest uppercase text-slate-500 block mb-2">Bank Info</span>
                     <p className="text-sm font-bold leading-relaxed text-black whitespace-pre-line bg-slate-100 p-4 border-2 border-black">{data.payment.bankDetails}</p>
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" className="block w-full py-4 bg-black text-white text-center font-black uppercase tracking-widest hover:bg-white hover:text-black border-4 border-black transition-colors duration-300">
                    Execute Transfer
                  </a>
                )}
              </div>
            </div>
          )}

          {/* CONTACT FORM */}
          <div id="contact" className="p-8 border-b-4 border-black bg-white">
            <span className="text-xs font-black uppercase tracking-widest text-black bg-red-400 px-2 py-1 inline-block mb-6 shadow-[4px_4px_0_0_#000] border-2 border-black text-white">Direct Line</span>
            <form onSubmit={handleEnquiry} className="flex flex-col gap-4">
              <input type="text" name="name" required placeholder="IDENTIFIER (NAME)" className="w-full px-4 py-4 bg-slate-100 border-2 border-black font-bold uppercase placeholder:text-slate-400 focus:outline-none focus:bg-white shadow-[4px_4px_0_0_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all" />
              <input type="tel" name="phone" placeholder="COMM LINK (PHONE)" className="w-full px-4 py-4 bg-slate-100 border-2 border-black font-bold uppercase placeholder:text-slate-400 focus:outline-none focus:bg-white shadow-[4px_4px_0_0_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all" />
              <textarea name="message" required placeholder="PAYLOAD (MESSAGE)" rows="4" className="w-full px-4 py-4 bg-slate-100 border-2 border-black font-bold uppercase placeholder:text-slate-400 focus:outline-none focus:bg-white shadow-[4px_4px_0_0_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all resize-none"></textarea>
              <button type="submit" className="w-full mt-4 py-4 border-4 border-black bg-black text-white font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                Transmit
              </button>
            </form>
          </div>
          
          {/* FOOTER & QR */}
          <div className="p-8 flex flex-col items-center bg-white border-b-4 border-black pb-20">
             <div className="border-8 border-black p-4 bg-white shadow-[12px_12px_0_0_#000] mb-10">
               <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} size={140} level="H" fgColor="#000" />
             </div>
             <button onClick={() => {
                if (navigator.share) { navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
              }} className="flex items-center gap-3 text-black hover:bg-black hover:text-white border-4 border-black px-8 py-3 transition-colors duration-300 font-black uppercase tracking-widest shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-y-1 active:translate-x-1">
                <Share2 className="w-5 h-5" strokeWidth={2.5} /> Share Profile
             </button>
          </div>

          <div className="p-4 bg-black text-center">
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">NEXCARD // BRUTALIST</p>
          </div>

        </div>
      </div>
      {/* 📱 MOBILE APP BOTTOM NAVIGATION */}
      <BottomNav data={data} primaryColor={primaryColor} />
    </div>
  );
}
