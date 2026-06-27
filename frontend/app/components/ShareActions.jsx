"use client";

import { useState } from "react";
import { Share2, Copy, Check, Mail, MessageSquare } from "lucide-react";

// Brand Custom Icons
const WhatsAppBrandIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ShareActions({ data, layout = "modern", primaryColor = "#00C2FF" }) {
  const [copied, setCopied] = useState(false);

  const getCardUrl = () => {
    if (typeof window === 'undefined') return '';
    if (data?.username) {
      return `${window.location.origin}/${data.username}`;
    }
    return window.location.href;
  };

  const handleCopy = () => {
    const cardUrl = getCardUrl();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const theme = data?.theme || {};
  const textSecondaryColor = theme.textSecondary || (layout === 'neo' ? '#a1a1aa' : '#64748b');

  let appIconWrapperClasses = "w-11 h-11 flex items-center justify-center transition-all rounded-full shrink-0";
  
  if (layout === "minimal") {
    appIconWrapperClasses = "w-11 h-11 flex items-center justify-center transition-all bg-white border-2 border-black rounded-none text-black shadow-[3px_3px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shrink-0";
  } else if (layout === "neo") {
    appIconWrapperClasses = "w-11 h-11 flex items-center justify-center transition-all bg-zinc-900 border border-zinc-850 hover:border-emerald-400 hover:text-emerald-400 text-zinc-400 rounded-none shrink-0";
  } else if (layout === "glass") {
    appIconWrapperClasses = "w-11 h-11 flex items-center justify-center transition-all bg-white/45 hover:bg-white/65 border border-white/50 backdrop-blur-md rounded-2xl shadow-sm text-slate-700 shrink-0";
  } else if (layout === "bold") {
    appIconWrapperClasses = "w-11 h-11 flex items-center justify-center transition-all bg-white border-2 border-slate-850 hover:bg-slate-50 text-slate-950 rounded-2xl hover:-translate-y-0.5 shrink-0";
  } else if (layout === "classic") {
    appIconWrapperClasses = "w-11 h-11 flex items-center justify-center transition-all bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg shrink-0";
  } else {
    appIconWrapperClasses = "w-11 h-11 flex items-center justify-center transition-all bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-full text-slate-700 shrink-0";
  }

  const getIconStyle = (brandColor) => {
    if (layout === 'minimal' || layout === 'neo') return {};
    return { color: brandColor, backgroundColor: `${brandColor}12` };
  };

  const cardUrl = getCardUrl();

  return (
    <div className="w-full">
      <div className="flex items-center gap-4.5 whitespace-nowrap pb-3 pt-1 select-none w-full overflow-x-auto scrollbar-none">
        {/* Copy Link */}
        <button 
          onClick={handleCopy}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer border-none bg-transparent outline-none"
        >
          <div className={appIconWrapperClasses}>
            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
          </div>
          <span className="text-[10px] font-semibold" style={{ color: textSecondaryColor }}>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        {/* WhatsApp */}
        <button 
          onClick={() => {
            const shareText = `Hi! Check out my digital visiting card on NexCard: ${cardUrl}`;
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer border-none bg-transparent outline-none"
        >
          <div className={appIconWrapperClasses} style={getIconStyle('#25D366')}>
            <WhatsAppBrandIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: textSecondaryColor }}>WhatsApp</span>
        </button>

        {/* Email */}
        <button 
          onClick={() => {
            window.location.href = `mailto:?subject=Digital Visiting Card&body=Hi! Check out my digital visiting card here: ${cardUrl}`;
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer border-none bg-transparent outline-none"
        >
          <div className={appIconWrapperClasses} style={getIconStyle('#ea4335')}>
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: textSecondaryColor }}>Email</span>
        </button>

        {/* Message */}
        <button 
          onClick={() => {
            window.location.href = `sms:?body=Check out my digital visiting card here: ${cardUrl}`;
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer border-none bg-transparent outline-none"
        >
          <div className={appIconWrapperClasses} style={getIconStyle('#8b5cf6')}>
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: textSecondaryColor }}>Message</span>
        </button>

        {/* More */}
        <button 
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.share) {
              navigator.share({
                title: data?.name ? `${data.name}'s Digital Card` : 'Digital Card',
                url: cardUrl
              }).catch(console.error);
            } else {
              handleCopy();
            }
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer border-none bg-transparent outline-none"
        >
          <div className={appIconWrapperClasses} style={getIconStyle('#64748b')}>
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: textSecondaryColor }}>More</span>
        </button>
      </div>

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
