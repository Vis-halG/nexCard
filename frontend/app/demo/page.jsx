"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ArrowRight, Check, Smartphone } from "lucide-react";
import NexCard from "../components/NexCard";
import { db } from "../../lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const FALLBACK_PROFILE = {
  name: "Vishal Gupta",
  title: "Founder & Lead Engineer",
  company: "NexCard Corporation",
  phone: "+91 98765 43210",
  email: "vishal@nexcard.app",
  about: "Building the future of digital networking. Expert in Full Stack Development, Next.js, and Cloud Infrastructure.",
  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  address: "Mumbai, Maharashtra, India",
  website: "https://nexcard.app",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  services: ["Next.js & React", "Cloud Infrastructure", "Product Architecture", "SaaS Development"],
  gallery: [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=500&auto=format&fit=crop",
  ],
  customLinks: [{ title: "Visit Official Website", url: "https://nexcard.app" }],
  theme: {
    layout: "modern",
    primary: "#6366F1",
    background: "#F8FAFC",
  }
};

export default function DemoPage() {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCard = async () => {
      try {
        const targetUsername = "vishalgupta25980";
        // 1. Try Fast Index
        const usernameRef = doc(db, "usernames", targetUsername);
        const usernameSnap = await getDoc(usernameRef);

        let uid = null;
        if (usernameSnap.exists()) {
          uid = usernameSnap.data().uid;
        } else {
          // 2. Try Fallback Query
          const q = query(collection(db, "users"), where("username", "==", targetUsername));
          const querySnap = await getDocs(q);
          if (!querySnap.empty) {
            uid = querySnap.docs[0].id;
          }
        }

        if (uid) {
          const userRef = doc(db, "users", uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setCardData(userSnap.data());
          }
        }
      } catch (err) {
        console.error("Error fetching target user card:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCard();
  }, []);

  const finalData = cardData ? {
    ...FALLBACK_PROFILE,
    ...cardData,
    theme: {
      ...FALLBACK_PROFILE.theme,
      ...(cardData.theme || {})
    }
  } : FALLBACK_PROFILE;

  return (
    <div className="h-screen bg-slate-50 flex flex-col relative overflow-hidden selection:bg-brand-indigo selection:text-white font-sans">
      {/* Background decoration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-50">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-indigo/10 blur-[120px] animate-slow-spin" />
        <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-brand-purple/10 blur-[150px] animate-slow-spin" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='rgba(0,0,0,1)' stroke-width='1'/%3E%3C/svg%3E\")", maskImage: "linear-gradient(to bottom, white, transparent)" }} />
      </div>

      {/* Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 relative z-20 flex justify-between items-center shrink-0">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-brand-indigo transition-colors group bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <span className="text-xl font-black tracking-tight text-slate-800">NexCard</span>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto w-full px-6 lg:px-12 gap-8 lg:gap-16 relative z-10 overflow-hidden pb-8 lg:pb-0">
        
        {/* Left Side: Call to Action */}
        <section className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start max-w-xl justify-center h-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3 h-3" />
            Live Preview
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
            This could be<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-purple">your new card.</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-md font-light leading-relaxed">
            Beautifully designed, instantly shareable, and fully customizable. Experience the real-time interaction of a premium digital visiting card.
          </p>

          {/* Value Propositions */}
          <div className="space-y-3.5 mb-8 w-full max-w-sm text-left">
            <div className="flex items-start gap-2.5">
              <div className="w-4.5 h-4.5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
              <p className="text-xs text-slate-600 font-medium">
                <strong className="text-slate-800">Instant Sharing:</strong> Save contact details with a scan or tap.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-4.5 h-4.5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
              <p className="text-xs text-slate-600 font-medium">
                <strong className="text-slate-800">Premium Themes:</strong> Customize colors and layouts in real-time.
              </p>
            </div>
          </div>
          
          <div className="w-full sm:w-auto">
            <Link
              href="/admin"
              className="group flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 bg-slate-900 rounded-full hover:bg-slate-800 hover:-translate-y-0.5 shadow-[0_10px_20px_rgba(0,0,0,0.12)] border border-slate-700/50"
            >
              Start Building Now
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Right Side: Phone Mockup Container */}
        <section className="flex-1 w-full flex flex-col items-center justify-center lg:min-w-0 lg:h-full lg:max-h-[80vh] shrink-0">
          {/* Smartphone Mockup */}
          <div className="relative w-[300px] h-[510px] sm:w-[350px] sm:h-[580px] bg-slate-950 rounded-[2.75rem] p-3 border-[3px] border-slate-900 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.3)] ring-1 ring-slate-800/50 overflow-hidden flex flex-col">
            {/* Dynamic Island Notch */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-50 flex items-center justify-between px-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900/60" />
              <div className="w-1 h-1 rounded-full bg-slate-900" />
            </div>

            {/* Content Body */}
            <div className="flex-1 bg-white rounded-[2.1rem] overflow-y-auto scrollbar-none relative w-full h-full">
              <NexCard data={finalData} inPreview={true} />
            </div>
          </div>

          <div className="mt-3.5 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {loading ? "Loading..." : "Interactive Live Card"}
            </span>
          </div>
        </section>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
