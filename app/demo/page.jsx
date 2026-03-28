"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DemoCard from "../components/DemoCard";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden selection:bg-brand-indigo selection:text-white pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] md:top-[-10%] md:left-[-10%] md:w-[600px] md:h-[600px] rounded-full bg-brand-indigo/5 blur-[100px] animate-slow-spin" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] md:top-[10%] md:right-[-10%] md:w-[700px] md:h-[700px] rounded-full bg-brand-purple/5 blur-[120px] animate-slow-spin" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='rgba(0,0,0,1)' stroke-width='1'/%3E%3C/svg%3E\")", maskImage: "linear-gradient(to bottom, white, transparent)" }} />
      </div>

      {/* Navigation */}
      <div className="w-full max-w-7xl mx-auto px-6 py-6 pt-10 relative z-20">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-brand-indigo transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto w-full px-4 sm:px-6 gap-12 md:gap-24 relative z-10 pt-4 md:pt-12 pb-20">
        
        {/* Call to Action Text Area */}
        <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            Live Preview
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05] md:leading-[1.1] mb-6">
            This could be<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-purple">your new card.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 mb-10 max-w-md mx-auto md:mx-0 font-light leading-relaxed px-4 md:px-0">
            Beautifully designed, instantly shareable, and fully customizable. Claim your unique digital identity today before someone else does.
          </p>
          
          <div className="flex justify-center md:justify-start">
            <Link
              href="/admin"
              className="group flex items-center justify-center w-[calc(100%-2rem)] sm:w-auto px-10 py-4 text-base md:text-lg font-bold text-white transition-all duration-300 bg-slate-900 rounded-full hover:bg-slate-800 hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-700/50"
            >
              Start Building Now
            </Link>
          </div>
        </div>

        {/* Visual Showcase (The DemoCard Component) */}
        <div className="flex-1 w-full flex justify-center perspective-1000 mt-4 md:mt-0">
          <DemoCard />
        </div>

      </div>
    </div>
  );
}
