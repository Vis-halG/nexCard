"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, IdCard, ImageIcon, ArrowRight, Sparkles, Share2, Palette } from "lucide-react";

const FEATURES = [
  "Digital Smartcards.",
  "Instant Qr Sharing.",
  "Digital Portfolios.",
  "Global Connection."
];

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 font-sans selection:bg-brand-indigo selection:text-white pb-12 overflow-hidden relative">
      <BackgroundEffects />
      <Navbar />

      <main className="relative z-10 pt-32 lg:pt-48 px-6 max-w-7xl mx-auto">
        <HeroSection />
        <BentoFeatures />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-50">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-indigo/10 blur-[120px] animate-slow-spin" />
      <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-brand-purple/10 blur-[150px] animate-slow-spin" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='rgba(0,0,0,1)' stroke-width='1'/%3E%3C/svg%3E\")", maskImage: "linear-gradient(to bottom, white, transparent)" }} />
    </div>
  );
}

function Navbar() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="w-full max-w-7xl bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 rounded-full pointer-events-auto">
        <div className="px-4 py-3 sm:px-6 flex justify-between items-center transition-all">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-purple">
            NexCard
          </h1>
          <a
            href="mailto:contact@nexcard.com"
            className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium text-brand-indigo transition-all duration-300 bg-brand-indigo/10 rounded-full hover:bg-brand-indigo hover:text-white ring-1 ring-inset ring-brand-indigo/20 focus:outline-none"
          >
            Contact Us
          </a>
        </div>
      </nav>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="text-left sm:text-center mb-24 md:mb-40 pt-4 md:pt-0 relative px-2 sm:px-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-[120%] h-[300px] bg-gradient-to-b from-brand-indigo/5 via-brand-purple/5 to-transparent blur-3xl -z-10 rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 text-brand-indigo text-[11px] md:text-sm font-bold mb-6 md:mb-8 shadow-[0_2px_10px_rgb(0,0,0,0.02)] uppercase tracking-widest"
      >
        <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
        The Future of Networking
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-5 md:mb-6 drop-shadow-sm min-h-[160px] md:min-h-0"
      >
        <span className="inline">The NexCard for the next level of </span>
        <div className="inline-block h-[45px] sm:h-[60px] md:h-auto md:ml-3 text-4xl sm:text-5xl md:text-7xl align-middle">
          <PixelatedText />
        </div>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-0 sm:mx-auto mb-10 leading-relaxed font-light pr-4 sm:pr-0"
      >
        Create a stunning digital visiting card in minutes. Share your contact info, social links, and portfolio with a simple scan or tap.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-start sm:justify-center items-center relative z-20"
      >
        <div className="relative group w-full sm:w-auto">
          <div className="absolute inset-0 bg-brand-indigo/30 blur-2xl rounded-full scale-110 group-hover:bg-brand-purple/40 group-hover:scale-125 transition-all duration-700 -z-10 animate-pulse"></div>
          <Link
            href="/demo"
            className="flex items-center justify-center w-full sm:w-auto px-10 py-4 md:py-4 text-base md:text-lg font-bold text-white transition-all duration-300 bg-slate-900 rounded-full hover:bg-slate-800 hover:scale-[1.02] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-700/50 focus:outline-none"
          >
            Create Your Card
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 text-brand-purple" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function PixelatedText() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(FEATURES[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let animationFrame;
    const interval = setInterval(() => {
      setIsAnimating(true);

      const nextIndex = (index + 1) % FEATURES.length;
      const nextWord = FEATURES[nextIndex];
      const oldWord = FEATURES[index];

      let frame = 0;
      const maxFrames = 40;
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*█▓▒░";

      const animate = () => {
        frame++;
        const progress = frame / maxFrames;

        let scrambled = "";
        const currentLen = Math.round(oldWord.length + (nextWord.length - oldWord.length) * progress);

        for (let i = 0; i < currentLen; i++) {
          const revealPoint = i / currentLen;

          if (progress > revealPoint + 0.3) {
            scrambled += nextWord[i] || "";
          } else if (progress > revealPoint) {
            scrambled += nextWord[i] === " " ? " " : characters[Math.floor(Math.random() * characters.length)];
          } else {
            scrambled += oldWord[i] || characters[Math.floor(Math.random() * characters.length)];
          }
        }

        setDisplayText(scrambled);

        if (frame < maxFrames) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setDisplayText(nextWord);
          setIndex(nextIndex);
          setTimeout(() => setIsAnimating(false), 150);
        }
      };

      animationFrame = requestAnimationFrame(animate);

    }, 4000);

    return () => {
      clearInterval(interval);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [index]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        layout
        className={`inline-block pb-2 transition-all duration-300 text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-indigo ${isAnimating ? "blur-[2px] opacity-50 scale-[0.99]" : "blur-0 opacity-100 scale-100"
          }`}
      >
        {displayText}
      </motion.span>
    </AnimatePresence>
  );
}

function BentoFeatures() {
  return (
    <section className="mb-40">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Everything you need to stand out</h2>
        <p className="text-slate-600 text-lg font-light">Powerful features wrapped in a beautiful, immersive interface.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto sm:auto-rows-[300px]">
        {/* Large Feature 1 */}
        <div className="md:col-span-2 group relative bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-indigo/30 transition-all duration-500 overflow-hidden cursor-default">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-brand-indigo/20 transition-all duration-500"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-brand-indigo mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
              <IdCard className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Digital Smart Card</h3>
              <p className="text-slate-600 leading-relaxed font-light max-w-sm">Keep all your professional details, social links, and contact info centralized in one beautifully designed portal.</p>
            </div>
          </div>
        </div>

        {/* Square Feature 2 */}
        <div className="group relative bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-purple/30 transition-all duration-500 overflow-hidden cursor-default">
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl -mr-10 -mb-10 group-hover:bg-brand-purple/20 transition-all duration-500"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-brand-purple mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
              <QrCode className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Instant QR Sharing</h3>
              <p className="text-slate-600 leading-relaxed font-light text-sm">No app required. Anyone can scan your completely unique generated QR code to instantly save your contact details.</p>
            </div>
          </div>
        </div>

        {/* Square Feature 3 */}
        <div className="group relative bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-default">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all duration-500"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
              <ImageIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Stunning Gallery</h3>
              <p className="text-slate-600 leading-relaxed font-light text-sm">Showcase your best work, products, or portfolio directly on your card with a dedicated image gallery plugin.</p>
            </div>
          </div>
        </div>

        {/* Horizontal Feature 4 */}
        <div className="md:col-span-2 group relative bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-500 overflow-hidden cursor-default flex items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-brand-indigo/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 w-full">
            <div className="w-16 h-16 shrink-0 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-500 shadow-sm">
              <Share2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Seamless Networking</h3>
              <p className="text-slate-600 leading-relaxed font-light max-w-lg">Create unlimited custom links. Direct people to your latest launch, calendar booking, or main website globally in seconds.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mb-40 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">How it works</h2>
        <p className="text-slate-600 text-lg font-light">Get started in three simple steps.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10"></div>

        <StepCard
          step="1"
          title="Create Profile"
          desc="Sign up and enter your basic contact details and professional links."
          icon={<IdCard className="w-5 h-5" />}
        />
        <StepCard
          step="2"
          title="Customize Design"
          desc="Choose themes, upload gallery images, and make your card uniquely yours."
          icon={<Palette className="w-5 h-5" />}
        />
        <StepCard
          step="3"
          title="Share Instantly"
          desc="Display your QR code or share your personal link with anyone, anywhere."
          icon={<Share2 className="w-5 h-5" />}
        />
      </div>
    </section>
  );
}

function StepCard({ step, title, desc, icon }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-brand-indigo/5 rounded-full blur-xl group-hover:bg-brand-indigo/10 transition-all duration-500"></div>
        <div className="relative z-10 w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl shadow-[0_0_20px_rgba(0,0,0,0.05)] group-hover:border-brand-indigo/30 transition-colors duration-300">
          {step}
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-brand-indigo shadow-md group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed font-light text-sm">{desc}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/60 bg-white/40 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-purple">NexCard</h2>
          <p className="text-sm text-slate-500 mt-2">The future of professional networking.</p>
        </div>
        <div className="flex gap-6">
          <a href="mailto:contact@nexcard.com" className="text-sm text-slate-500 hover:text-brand-indigo transition-colors">Contact</a>
          <Link href="#" className="text-sm text-slate-500 hover:text-brand-indigo transition-colors">Privacy</Link>
        </div>
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} NexCard. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
