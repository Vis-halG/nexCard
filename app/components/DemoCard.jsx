"use client";

import { Mail, Phone, Globe, MessageCircle, User, Briefcase } from "lucide-react";

export default function DemoCard() {
  return (
    <div className="w-full max-w-[340px] sm:max-w-sm mx-auto bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
      {/* Background Subtle Blurs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/15 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-brand-indigo/25 transition-all duration-700"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-purple/15 rounded-full blur-2xl -ml-10 -mb-10 group-hover:bg-brand-purple/25 transition-all duration-700"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Avatar */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[3px] border-white shadow-lg bg-gradient-to-br from-brand-indigo/20 to-brand-purple/20 mb-4 flex items-center justify-center overflow-hidden">
           <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-indigo to-brand-purple">AS</span>
        </div>

        {/* Name & Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Alex Sterling</h2>
        <p className="text-brand-indigo font-semibold text-xs sm:text-sm mb-6 uppercase tracking-wider">Product Designer</p>
        
        {/* Contact Links */}
        <div className="w-full space-y-3 mb-8">
          <ContactButton icon={<Mail className="w-4 h-4" />} text="alex@nexcard.com" />
          <ContactButton icon={<Phone className="w-4 h-4" />} text="+1 (555) 123-4567" />
          <ContactButton icon={<Globe className="w-4 h-4" />} text="alexsterling.design" />
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <SocialButton icon={<MessageCircle className="w-5 h-5" />} />
          <SocialButton icon={<User className="w-5 h-5" />} />
          <SocialButton icon={<Briefcase className="w-5 h-5" />} />
        </div>
      </div>
    </div>
  );
}

function ContactButton({ icon, text }) {
  return (
    <button className="w-full flex items-center gap-4 bg-white/60 border border-slate-100 hover:border-brand-indigo/30 hover:bg-white transition-colors duration-300 rounded-2xl p-3.5 text-sm text-slate-700 font-medium shadow-sm hover:shadow-md">
      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-brand-indigo">
        {icon}
      </div>
      {text}
    </button>
  );
}

function SocialButton({ icon }) {
  return (
    <button className="w-12 h-12 flex items-center justify-center bg-white/60 border border-slate-100 hover:border-brand-indigo/30 hover:bg-white transition-all duration-300 rounded-full text-slate-600 hover:text-brand-indigo shadow-sm hover:shadow-md hover:-translate-y-1">
      {icon}
    </button>
  );
}
