"use client";

import { Phone, Mail, Globe, MapPin, Download, MessageCircle, MessageSquare, User, Briefcase, Send, QrCode, Eye, Calendar, CreditCard, Share2, Star } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

export default function NexCard({ data }) {
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

  const primaryColor = data?.theme?.primary || "#4f46e5";
  const bgColor = data?.theme?.background || "#f8fafc";

  return (
    <div className="min-h-screen flex justify-center bg-slate-100 font-sans pb-24 selection:bg-indigo-500 selection:text-white" style={{ scrollBehavior: "smooth" }}>
      <div
        className="w-full max-w-[480px] min-h-screen relative bg-white shadow-2xl overflow-hidden shadow-indigo-900/5 target:scroll-mt-6"
        style={{ backgroundColor: bgColor }}
      >
        {/* 🔥 HERO SECTION */}
        <div id="home" className="relative pb-6">
          <div
            className="h-44 w-full relative"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
              borderBottomLeftRadius: '2rem',
              borderBottomRightRadius: '2rem'
            }}
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
          </div>

          <div className="px-6 relative -mt-16 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-[5px] border-white shadow-xl overflow-hidden bg-white relative z-10">
              <img
                src={data?.image || "https://i.pravatar.cc/150"}
                alt={data?.name || "profile"}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 mt-4 tracking-tight text-center">{data?.name || "Your Name"}</h1>
            <div className="flex flex-col items-center mt-1">
              <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider text-center">{data?.title || "Professional Title"}</p>
              {data?.company && (
                <p className="text-slate-500 font-medium text-xs text-center mt-0.5 tracking-wide">
                  at <span className="font-semibold">{data.company}</span>
                </p>
              )}
            </div>
          </div>

          {/* ⚡ QUICK ACTIONS (Floating Row) */}
          <div className="flex justify-center flex-wrap gap-4 mt-6 px-4">
            {data?.phone && (
              <a href={`tel:${data.phone}`} className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-sm">
                <Phone className="w-5 h-5" />
              </a>
            )}
            {data?.phone && (
              <a href={`sms:${data.phone}`} className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 text-slate-700 hover:text-purple-500 hover:border-purple-200 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </a>
            )}
            {data?.phone && (
              <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 text-slate-700 hover:text-green-500 hover:border-green-200 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-sm">
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
            {data?.email && (
              <a href={`mailto:${data.email}`} className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 text-slate-700 hover:text-rose-500 hover:border-rose-200 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-sm">
                <Mail className="w-5 h-5" />
              </a>
            )}
            {data?.website && (
              <a href={data.website} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 text-slate-700 hover:text-blue-500 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-sm">
                <Globe className="w-5 h-5" />
              </a>
            )}
            {data?.address && (
              <a href="#map" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 text-slate-700 hover:text-amber-500 hover:border-amber-200 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* 📥 SAVE CONTACT */}
          <div className="px-6 mt-8">
            <button
              onClick={generateVcard}
              className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
              style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}ee)` }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10 tracking-wide uppercase text-sm">Save Contact</span>
            </button>
          </div>

          {/* 📅 BOOK APPOINTMENT */}
          {data?.calendarUrl && (
            <div className="px-6 mt-3 text-center">
              <a 
                href={data.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl text-slate-800 font-bold flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all duration-300 relative group shadow-sm hover:shadow-md"
              >
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span className="uppercase tracking-wide text-sm">Schedule a Meeting</span>
              </a>
            </div>
          )}
        </div>

        {/* 🌟 ABOUT SECTION */}
        {data?.about && (
          <div id="about" className="px-6 py-6 border-t border-slate-100 scroll-mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" />
              About Me
            </h2>
            <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/60 shadow-inner">
              <p className="text-slate-600 text-sm leading-relaxed">{data.about}</p>
            </div>
          </div>
        )}

        {/* 🛠 SPECIALITY / SERVICES */}
        {data?.services?.length > 0 && (
          <div className="px-6 py-6 border-t border-slate-100 scroll-mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              My Specialties
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.services.map((s, i) => (
                <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-indigo-100 shadow-sm transition-transform hover:-translate-y-0.5 cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 🌐 SOCIAL MEDIA LINKS */}
        <div id="social" className="px-6 py-6 border-t border-slate-100 scroll-mt-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-500" />
            Connect with me
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data?.social?.instagram && (
              <a href={data.social.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-pink-300 hover:bg-pink-50 transition-colors text-slate-700 group shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Instagram</span>
              </a>
            )}
            {data?.social?.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-colors text-slate-700 group shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">LinkedIn</span>
              </a>
            )}
            {data?.social?.twitter && (
              <a href={data.social.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-sky-300 hover:bg-sky-50 transition-colors text-slate-700 group shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                  <TwitterIcon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Twitter</span>
              </a>
            )}
            {data?.social?.facebook && (
              <a href={data.social.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-400 hover:bg-blue-50 transition-colors text-slate-700 group shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                  <FacebookIcon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Facebook</span>
              </a>
            )}
            {data?.social?.youtube && (
              <a href={data.social.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-red-300 hover:bg-red-50 transition-colors text-slate-700 group shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                  <YoutubeIcon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">YouTube</span>
              </a>
            )}
            {!data?.social && (
              <div className="col-span-2 text-center text-sm text-slate-500 py-4">
                No social links provided.
              </div>
            )}
          </div>
        </div>

        {/* 🖼 IMAGE GALLERY */}
        {data?.gallery?.length > 0 && (
          <div className="px-6 py-6 border-t border-slate-100 scroll-mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-500" />
              Gallery
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {data.gallery.map((img, i) =>
                img ? (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer relative">
                    <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    <img
                      src={img}
                      alt={`Gallery image ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* 🎬 VIDEO EMBEDDING */}
        {data?.videos?.length > 0 && (
          <div className="px-6 py-6 border-t border-slate-100 scroll-mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <YoutubeIcon className="w-5 h-5 text-indigo-500" />
              Videos
            </h2>
            <div className="flex flex-col gap-4">
              {data.videos.map((vid, i) => (
                <div key={i} className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-slate-100 relative pt-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={vid.includes('youtube.com/watch?v=') ? vid.replace('watch?v=', 'embed/') : vid}
                    title={`Video ${i + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔗 CUSTOM WEB LINKS (Linktree Style) */}
        {data?.customLinks?.length > 0 && (
          <div className="px-6 py-6 border-t border-slate-100 scroll-mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              Important Links
            </h2>
            <div className="flex flex-col gap-3">
              {data.customLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-slate-800 group"
                >
                  <span className="font-semibold text-sm">{link.title}</span>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 🔗 CUSTOM WEB LINKS (Linktree Style) */}
        {data?.customLinks?.length > 0 && (
          <div className="px-6 py-6 border-t border-slate-100 scroll-mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              Important Links
            </h2>
            <div className="flex flex-col gap-3">
              {data.customLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-slate-800 group"
                >
                  <span className="font-semibold text-sm">{link.title}</span>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 💳 PAYMENT INTEGRATION */}
        {data?.payment && (
          <div className="px-6 py-6 border-t border-slate-100 scroll-mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-500" />
              Make a Payment
            </h2>
            <div className="flex flex-col gap-3">
              {data.payment.upi && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between shadow-sm">
                  <span className="font-semibold text-sm text-slate-700">UPI ID</span>
                  <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">{data.payment.upi}</span>
                </div>
              )}
              {data.payment.link && (
                <a href={data.payment.link} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center p-4 rounded-xl text-white font-bold bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  Pay Now
                </a>
              )}
              {data.payment.bankDetails && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mt-1 shadow-sm">
                  <h3 className="font-semibold text-sm text-slate-800 mb-2">Bank Transfer Details</h3>
                  <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{data.payment.bankDetails}</p>
                </div>
              )}
              {data.gstNumber && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between shadow-sm mt-1">
                  <span className="font-semibold text-sm text-slate-700">GSTIN</span>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">{data.gstNumber}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🗺 ADDRESS & MAP */}
        {data?.address && (
          <div id="map" className="px-6 py-6 border-t border-slate-100 scroll-mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-500" />
              Visit Us
            </h2>
            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/60 shadow-inner mb-4">
              <p className="text-slate-600 text-sm leading-relaxed">{data.address}</p>
            </div>
            
            {/* Google Map Embed */}
            <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative mb-4">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>
            
            {/* Get Directions Button */}
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.address)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl text-indigo-600 font-semibold bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 flex items-center justify-center gap-2 transition-all duration-300"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        )}

        {/* ✉ ENQUIRY FORM */}
        <div id="contact" className="px-6 py-8 border-t border-slate-100 bg-slate-50/30 scroll-mt-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-500" />
            Get in touch
          </h2>
          <p className="text-sm text-slate-500 mb-6">Fill out the form below and I'll get back to you soon.</p>

          <form onSubmit={handleEnquiry} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Full Name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm shadow-sm placeholder:text-slate-400"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm shadow-sm placeholder:text-slate-400"
              />
            </div>
            <div>
              <textarea
                name="message"
                required
                placeholder="How can I help you?"
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm shadow-sm resize-none placeholder:text-slate-400"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full py-4 rounded-xl text-white font-bold bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* ⭐ GOOGLE REVIEWS */}
        {data?.googleReviewsUrl && (
          <div className="px-6 pb-8 border-t border-slate-100 scroll-mt-6 pt-8 bg-white">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100/50 shadow-sm text-center">
              <div className="flex justify-center mb-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-6 h-6 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Rate your experience</h3>
              <p className="text-sm text-slate-600 mb-4">Loved working with us? Leave a review!</p>
              <a 
                href={data.googleReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full py-3.5 rounded-xl text-amber-700 font-bold bg-white border border-amber-200 hover:bg-amber-50 shadow-sm transition-all"
              >
                Write a Review
              </a>
            </div>
          </div>
        )}

        {/* 📲 SHARING & QR CODE */}
        <div id="share" className="px-6 py-8 border-t border-slate-100 scroll-mt-6 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-center gap-2">
            <QrCode className="w-5 h-5 text-indigo-500" />
            Share Profile
          </h2>
          <div className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4">
              <QRCodeSVG 
                value={typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'} 
                size={160} 
                level="Q"
                className="rounded-lg"
              />
            </div>
            <p className="text-sm text-slate-500 mb-6 text-center font-medium">Scan to view my digital card</p>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card',
                    url: window.location.href
                  }).catch(console.error);
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="w-full py-3.5 rounded-xl text-indigo-600 font-bold bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share Link
            </button>
          </div>
        </div>

        {/* FOOTER & VIEW COUNTER */}
        <div className="text-center pb-12 pt-4 bg-slate-50">
          <div className="flex items-center justify-center gap-1 text-xs font-semibold text-slate-500 pt-4 rounded-full bg-slate-100 mx-auto w-fit px-4 py-1.5 shadow-inner">
            <Eye className="w-3 h-3" />
            <span>Profile views: 1,337</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 font-black tracking-widest uppercase">Powered by NexCard</p>
        </div>
      </div>

      {/* 📱 STICKY BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 md:pb-8 pointer-events-none px-4">
        <div className="pointer-events-auto bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-full px-6 py-3 flex items-center gap-6 sm:gap-8 justify-between">
          <a href="#home" className="text-slate-400 hover:text-indigo-600 transition-colors flex flex-col items-center gap-1 group">
            <div className="group-hover:-translate-y-1 transition-transform">
              <User size={22} className="group-hover:fill-indigo-50" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest hidden sm:block delay-75">Home</span>
          </a>
          <a href="#about" className="text-slate-400 hover:text-indigo-600 transition-colors flex flex-col items-center gap-1 group">
            <div className="group-hover:-translate-y-1 transition-transform">
              <Briefcase size={22} className="group-hover:fill-indigo-50" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest hidden sm:block delay-75">About</span>
          </a>
          <a href="#social" className="text-slate-400 hover:text-indigo-600 transition-colors flex flex-col items-center gap-1 group">
            <div className="group-hover:-translate-y-1 transition-transform">
              <Globe size={22} className="group-hover:fill-indigo-50" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest hidden sm:block delay-75">Social</span>
          </a>
          <a href="#contact" className="text-slate-400 hover:text-indigo-600 transition-colors flex flex-col items-center gap-1 group">
            <div className="group-hover:-translate-y-1 transition-transform">
              <MessageCircle size={22} className="group-hover:fill-indigo-50" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest hidden sm:block delay-75">Contact</span>
          </a>
          <a href="#map" className="text-slate-400 hover:text-indigo-600 transition-colors flex flex-col items-center gap-1 group">
            <div className="group-hover:-translate-y-1 transition-transform">
              <QrCode size={22} className="group-hover:fill-indigo-50" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest hidden sm:block delay-75">QR / Share</span>
          </a>
        </div>
      </div>
    </div>
  );
}