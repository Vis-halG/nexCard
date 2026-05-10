"use client";

import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, Calendar, Share2, Star, ArrowUpRight, ArrowRight, Play, Terminal, Box, Code, Cpu, ShieldAlert, Fingerprint, CreditCard } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

export default function BoldTheme({ data }) {
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

  const primaryColor = data?.theme?.primary || "#10B981";

  return (
    <div className="min-h-screen bg-zinc-950 font-mono flex justify-center text-zinc-300 selection:bg-zinc-800 selection:text-white" style={{ scrollBehavior: "smooth" }}>
      <div className="w-full max-w-[480px] min-h-screen relative border-x border-zinc-900 bg-[#09090b] shadow-[0_0_100px_rgba(0,0,0,1)] pb-20 overflow-hidden">
        
        {/* Subtle grid background to simulate IDE canvas */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

        {/* HEADER / COMMAND LINE */}
        <div className="p-6 pt-10 flex flex-col relative z-10">
           <div className="flex items-center gap-2 mb-8 border-b border-zinc-800 pb-4">
             <Terminal className="w-5 h-5 text-zinc-500" />
             <span className="text-zinc-500 text-xs">~/profiles/{data?.name?.split(' ')[0]?.toLowerCase() || 'user'}/init.sh</span>
           </div>

           <div className="flex flex-col items-center">
             <div className="w-32 h-32 rounded-full border border-zinc-800 p-1 mb-6 relative group overflow-hidden bg-zinc-900">
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: `inset 0 0 20px ${primaryColor}` }}></div>
               <img src={data?.image || "https://i.pravatar.cc/150"} className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-700" />
             </div>

             <div className="flex items-center gap-2 mb-2">
               <span style={{ color: primaryColor }}>$</span>
               <h1 className="text-3xl font-bold text-white tracking-tight">
                 {data?.name || "Name"}
               </h1>
             </div>
             
             <p className="text-zinc-400 text-sm mt-1 flex items-center gap-2">
               <span className="text-zinc-600">role=</span>"{data?.title || "Title"}"
             </p>
             {data?.company && (
               <p className="text-zinc-500 text-xs mt-2">
                 @ {data.company}
               </p>
             )}
           </div>
        </div>

        <div className="px-6 space-y-6 relative z-10">
          
          {/* QUICK COMMANDS */}
          <div className="grid grid-cols-4 gap-3 py-4">
            {data?.phone && <a href={`tel:${data.phone}`} className="h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-700 transition-colors hover:text-white group"><Phone className="w-5 h-5 group-hover:scale-110 transition-transform"/></a>}
            {data?.phone && <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-800 hover:border-[#25D366] transition-colors hover:text-[#25D366] group"><MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform"/></a>}
            {data?.email && <a href={`mailto:${data.email}`} className="h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-700 transition-colors hover:text-white group"><Mail className="w-5 h-5 group-hover:scale-110 transition-transform"/></a>}
            {data?.address && <a href="#map" className="h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-700 transition-colors hover:text-white group"><MapPin className="w-5 h-5 group-hover:scale-110 transition-transform"/></a>}
          </div>

          {/* MAIN EXECUTION */}
          <div className="flex flex-col gap-3 pb-4">
            <button onClick={generateVcard} className="w-full py-4 bg-zinc-100 text-zinc-900 font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-white transition-colors">
              <Download className="w-4 h-4"/> execute --save-contact
            </button>
            {data?.calendarUrl && (
               <a href={data.calendarUrl} target="_blank" rel="noreferrer" className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium rounded-xl flex justify-center items-center gap-2 hover:bg-zinc-800 hover:text-white transition-colors">
                 <Calendar className="w-4 h-4"/> schedule --meeting
               </a>
            )}
          </div>

          {/* README.md */}
          {data?.about && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group">
              <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
                <ShieldAlert className="w-3 h-3" /> README.md
              </div>
              <div className="p-5 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
                <span className="text-zinc-600 mr-2">1</span> {data.about}
              </div>
            </div>
          )}

          {/* TECH STACK / SERVICES */}
          {data?.services?.length > 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
                <Code className="w-3 h-3" /> modules.json
              </div>
              <div className="p-5 flex flex-wrap gap-2">
                {data.services.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-300 flex items-center gap-2" style={{ borderLeftColor: primaryColor, borderLeftWidth: '2px' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* SOCIAL LINKS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
              <Globe className="w-3 h-3" /> network_connections
            </div>
            <div className="flex flex-col">
              {data?.social?.linkedin && <a href={data.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border-b border-zinc-800/50 hover:bg-zinc-800 hover:text-white transition-colors text-sm"><div className="flex items-center gap-3"><LinkedinIcon className="w-4 h-4"/> <span className="text-zinc-400">linkedin.com</span></div> <ArrowUpRight className="w-4 h-4 text-zinc-600"/></a>}
              {data?.social?.twitter && <a href={data.social.twitter} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border-b border-zinc-800/50 hover:bg-zinc-800 hover:text-white transition-colors text-sm"><div className="flex items-center gap-3"><TwitterIcon className="w-4 h-4"/> <span className="text-zinc-400">twitter.com</span></div> <ArrowUpRight className="w-4 h-4 text-zinc-600"/></a>}
              {data?.social?.instagram && <a href={data.social.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border-b border-zinc-800/50 hover:bg-zinc-800 hover:text-white transition-colors text-sm"><div className="flex items-center gap-3"><InstagramIcon className="w-4 h-4"/> <span className="text-zinc-400">instagram.com</span></div> <ArrowUpRight className="w-4 h-4 text-zinc-600"/></a>}
              {data?.social?.youtube && <a href={data.social.youtube} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border-b border-zinc-800/50 hover:bg-zinc-800 hover:text-white transition-colors text-sm"><div className="flex items-center gap-3"><YoutubeIcon className="w-4 h-4"/> <span className="text-zinc-400">youtube.com</span></div> <ArrowUpRight className="w-4 h-4 text-zinc-600"/></a>}
            </div>
          </div>

          {/* GALLERY */}
          {data?.gallery?.length > 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
                <Box className="w-3 h-3" /> assets/images/
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                {data.gallery.map((img, i) => img && (
                  <div key={i} className="aspect-square rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden relative group">
                    <img src={img} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIDEOS */}
          {data?.videos?.length > 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
                <Play className="w-3 h-3" /> assets/media/
              </div>
              <div className="p-4 space-y-4">
                {data.videos.map((vid, i) => (
                  <div key={i} className="w-full rounded-lg border border-zinc-800 bg-zinc-950 relative pt-[56.25%] overflow-hidden">
                    <iframe className="absolute top-0 left-0 w-full h-full opacity-80 hover:opacity-100 transition-opacity" src={vid.includes('youtube.com/watch?v=') ? vid.replace('watch?v=', 'embed/') : vid} frameBorder="0" allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOM LINKS */}
          {data?.customLinks?.length > 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
                <Globe className="w-3 h-3" /> external_dependencies
              </div>
              <div className="flex flex-col">
                {data.customLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border-b border-zinc-800/50 hover:bg-zinc-800 hover:text-white transition-colors text-sm group">
                    <span className="text-zinc-300">{link.title}</span> <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:-rotate-45 transition-transform"/>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENT */}
          {data?.payment && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
                <CreditCard className="w-3 h-3" /> transactions.env
              </div>
              <div className="p-5 space-y-4 text-sm">
                {data.payment.upi && <div className="flex justify-between items-center border-b border-zinc-800 pb-3"><span className="text-zinc-500">UPI_ID</span> <span className="text-white">{data.payment.upi}</span></div>}
                {data.payment.gstNumber && <div className="flex justify-between items-center border-b border-zinc-800 pb-3"><span className="text-zinc-500">GSTIN</span> <span className="text-white">{data.gstNumber}</span></div>}
                {data.payment.bankDetails && (
                  <div>
                    <span className="text-zinc-500 block mb-2">BANK_DETAILS</span>
                    <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg text-zinc-400 whitespace-pre-line text-xs font-mono leading-relaxed">
                      {data.payment.bankDetails}
                    </div>
                  </div>
                )}
                {data.payment.link && (
                  <a href={data.payment.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 mt-2 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors rounded-lg font-medium">
                    <Fingerprint className="w-4 h-4" /> Authenticate Payment
                  </a>
                )}
              </div>
            </div>
          )}

          {/* LOCATION */}
          {data?.address && (
            <div id="map" className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
                <MapPin className="w-3 h-3" /> geo_location.map
              </div>
              <div className="p-5">
                <p className="text-zinc-400 text-sm mb-4">"{data.address}"</p>
                <div className="w-full h-48 rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
                  <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}></iframe>
                </div>
              </div>
            </div>
          )}

          {/* ENQUIRY FORM */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
             <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
               <Cpu className="w-3 h-3" /> post_request.sh
             </div>
             <form onSubmit={handleEnquiry} className="p-5 space-y-4">
                <input type="text" name="name" required placeholder="--user name" className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-zinc-600 text-white placeholder:text-zinc-600 text-sm font-mono" />
                <input type="tel" name="phone" placeholder="--contact phone" className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-zinc-600 text-white placeholder:text-zinc-600 text-sm font-mono" />
                <textarea name="message" required placeholder="--payload message" rows="4" className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-zinc-600 text-white placeholder:text-zinc-600 text-sm font-mono resize-none"></textarea>
                <button type="submit" className="w-full py-4 bg-zinc-100 text-zinc-900 font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <Terminal className="w-4 h-4" /> Run Script
                </button>
             </form>
          </div>

          {/* REVIEWS */}
          {data?.googleReviewsUrl && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden text-center">
              <div className="p-8">
                <div className="flex justify-center mb-4 gap-2">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 text-zinc-600 fill-zinc-600 hover:text-yellow-500 hover:fill-yellow-500 transition-colors cursor-pointer" />)}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Compile Feedback</h3>
                <p className="text-zinc-500 text-sm mb-6">Log your execution time.</p>
                <a href={data.googleReviewsUrl} target="_blank" rel="noreferrer" className="inline-block px-6 py-3 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-lg transition-colors text-sm font-medium">
                  Push Review
                </a>
              </div>
            </div>
          )}

          {/* QR */}
          <div className="pt-8 pb-4 flex flex-col items-center">
             <div className="p-3 border border-zinc-800 rounded-xl bg-zinc-900 mb-6">
               <div className="bg-white p-2 rounded-lg">
                 <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} size={140} level="M" fgColor="#09090b" />
               </div>
             </div>
             <button onClick={() => {
                if (navigator.share) { navigator.share({ title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card', url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
              }} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm">
                <Share2 className="w-4 h-4" /> broadcast --url
             </button>
          </div>

        </div>
        
      </div>
    </div>
  );
}
