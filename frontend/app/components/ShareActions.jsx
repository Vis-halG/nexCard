"use client";

import { useState } from "react";
import { Share2, Copy, Check, Mail, MessageSquare } from "lucide-react";

// Brand Custom Icons
const WhatsAppBrandIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TelegramBrandIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.467-.168.583-.48 1.134-.73 1.341-.542.449-1.281.332-1.921-.122l-1.932-1.328-1.564 1.442c-.22.203-.43.376-.84.376-.41 0-.324-.316-.484-.937l-1.12-3.437-3.08-1.077c-.642-.224-.652-.638.136-.931L16.2 5.86c.696-.258 1.44-.112 1.362 2.301z"/>
  </svg>
);

const FacebookBrandIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
  </svg>
);

const TwitterBrandIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInBrandIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function ShareActions({ data, layout = "modern", primaryColor = "#4f46e5" }) {
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
      <div className="flex items-center gap-4.5 whitespace-nowrap pb-3 pt-1 select-none w-full">
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

        {/* Telegram */}
        <button 
          onClick={() => {
            const shareText = `Hi! Check out my digital visiting card on NexCard: ${cardUrl}`;
            window.open(`https://t.me/share/url?url=${encodeURIComponent(cardUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer border-none bg-transparent outline-none"
        >
          <div className={appIconWrapperClasses} style={getIconStyle('#0088cc')}>
            <TelegramBrandIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: textSecondaryColor }}>Telegram</span>
        </button>

        {/* Twitter / X */}
        <button 
          onClick={() => {
            const shareText = `Hi! Check out my digital visiting card on NexCard: ${cardUrl}`;
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(cardUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer border-none bg-transparent outline-none"
        >
          <div className={appIconWrapperClasses} style={getIconStyle('#0f1419')}>
            <TwitterBrandIcon className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: textSecondaryColor }}>Twitter (X)</span>
        </button>

        {/* Facebook */}
        <button 
          onClick={() => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}`, '_blank');
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer border-none bg-transparent outline-none"
        >
          <div className={appIconWrapperClasses} style={getIconStyle('#1877F2')}>
            <FacebookBrandIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: textSecondaryColor }}>Facebook</span>
        </button>

        {/* LinkedIn */}
        <button 
          onClick={() => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cardUrl)}`, '_blank');
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer border-none bg-transparent outline-none"
        >
          <div className={appIconWrapperClasses} style={getIconStyle('#0077B5')}>
            <LinkedInBrandIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: textSecondaryColor }}>LinkedIn</span>
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

        {/* SMS */}
        <button 
          onClick={() => {
            window.location.href = `sms:?body=Check out my digital visiting card here: ${cardUrl}`;
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer border-none bg-transparent outline-none"
        >
          <div className={appIconWrapperClasses} style={getIconStyle('#8b5cf6')}>
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: textSecondaryColor }}>SMS</span>
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
