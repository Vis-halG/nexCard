'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import NexCard from "../../components/NexCard";
import { Check, Eye, ArrowRight, Sparkles, X, Crown, Palette } from "lucide-react";

const THEMES = [
  {
    id: "modern",
    name: "Modern Elegance",
    tagline: "Refined curves with sophisticated depth and organic flow",
    primary: "#4F46E5",
    background: "#F8FAFC",
    accent: "#6366F1",
    previewBg: "linear-gradient(135deg, #c7d2fe 0%, #ede9fe 55%, #ffffff 100%)",
    previewAccent: "#a78bfa",
    badge: "MOST POPULAR",
    badgeBg: "linear-gradient(135deg, #6366F1, #8B5CF6)",
  },
  {
    id: "classic",
    name: "Classic Corporate",
    tagline: "Authoritative blue tones that command professional trust",
    primary: "#1D4ED8",
    background: "#EFF6FF",
    accent: "#3B82F6",
    previewBg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 55%, #ffffff 100%)",
    previewAccent: "#93c5fd",
    badge: "PROFESSIONAL",
    badgeBg: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
  },
  {
    id: "minimal",
    name: "Swiss Minimal",
    tagline: "Pure white-space philosophy with typographic precision",
    primary: "#475569",
    background: "#FFFFFF",
    accent: "#525252",
    previewBg: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 55%, #ffffff 100%)",
    previewAccent: "#94a3b8",
    badge: "EDITORIAL",
    badgeBg: "linear-gradient(135deg, #334155, #475569)",
  },
  {
    id: "glass",
    name: "Rose Glass",
    tagline: "Soft frosted layers with a luxury rose-gold finish",
    primary: "#B76E79",
    background: "#FFF7F3",
    accent: "#EAB8A6",
    previewBg: "linear-gradient(135deg, #fff7f3 0%, #f7c8b7 55%, #ffffff 100%)",
    previewAccent: "#b76e79",
    badge: "PREMIUM",
    badgeBg: "linear-gradient(135deg, #9333EA, #EC4899)",
  },
  {
    id: "bold",
    name: "Bold Luxe",
    tagline: "Editorial statement layout with crisp premium contrast",
    primary: "#0EA5A4",
    background: "#F7FBF8",
    accent: "#F4B860",
    previewBg: "linear-gradient(135deg, #ecfeff 0%, #ccfbf1 50%, #fff7ed 100%)",
    previewAccent: "#0ea5a4",
    badge: "SIGNATURE",
    badgeBg: "linear-gradient(135deg, #059669, #10B981)",
  },
];

const DUMMY_DATA = {
  name: "Alex Morgan",
  title: "Creative Director",
  company: "NexCard Studio",
  phone: "+1234567890",
  email: "hello@alexmorgan.design",
  about: "Passionate creative director crafting beautiful digital experiences for over a decade.",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
  address: "123 Innovation Drive, Tech City",
  website: "https://nexcard.com",
  calendarUrl: "https://calendly.com",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  services: ["UI/UX Design", "Branding", "Web Dev"],
  gallery: [
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop",
  ],
  customLinks: [{ title: "View Portfolio", url: "https://example.com" }],
  payment: { upi: "alex@upi" },
};

export default function SetupPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [previewTheme, setPreviewTheme] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/admin");
        return;
      }
      setUser(u);

      // If they already set up a theme, go straight to dashboard
      try {
        const snap = await getDoc(doc(db, "users", u.uid));
        if (snap.exists() && snap.data()?.theme?.layout) {
          router.push("/admin/dashboard");
          return;
        }
      } catch (_) {}

      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  const handleApply = async () => {
    if (!selected || !user) return;
    setSaving(true);
    try {
      const username = user.email.split("@")[0];
      const theme = {
        layout: selected.id,
        primary: selected.primary,
        background: selected.background,
      };
      await setDoc(
        doc(db, "users", user.uid),
        { theme, username, uid: user.uid },
        { merge: true }
      );
      await setDoc(doc(db, "usernames", username), { uid: user.uid }, { merge: true });
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 animate-pulse">
        <div className="max-w-6xl mx-auto pt-16">
          <div className="flex flex-col items-center mb-12 space-y-4">
            <div className="h-6 w-40 bg-indigo-100 rounded-full" />
            <div className="h-12 w-96 bg-slate-200 rounded-2xl" />
            <div className="h-4 w-64 bg-slate-100 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
                <div className="aspect-[4/3] bg-slate-100 rounded-2xl" />
                <div className="space-y-3">
                  <div className="h-6 w-3/4 bg-slate-100 rounded-lg" />
                  <div className="h-4 w-full bg-slate-50 rounded-lg" />
                </div>
                <div className="flex gap-3">
                  <div className="h-4 w-4 rounded-full bg-slate-100" />
                  <div className="h-4 w-4 rounded-full bg-slate-100" />
                  <div className="h-4 w-4 rounded-full bg-slate-100" />
                </div>
                <div className="flex gap-3 pt-2">
                  <div className="h-10 flex-1 bg-slate-50 rounded-xl" />
                  <div className="h-10 flex-1 bg-slate-50 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-sans overflow-x-hidden relative">

      {/* Subtle decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-100/40 to-purple-100/30 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-50/50 to-cyan-50/30 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-rose-50/40 to-amber-50/20 blur-3xl" />
      </div>

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-extrabold text-slate-800 tracking-tight text-lg">NexCard</span>
          </div>
          {selected && (
            <button
              onClick={handleApply}
              disabled={saving}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-[0.98]"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Continue with {selected.name.split(" ")[0]}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-wider uppercase shadow-sm">
          <Crown className="w-3.5 h-3.5" />
          Choose Your Identity
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-[1.1] mb-5 text-slate-900">
          Select your{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            signature theme
          </span>
        </h1>
        <p className="text-slate-500 text-base sm:text-lg max-w-md mx-auto font-medium leading-relaxed">
          Your card&apos;s first impression starts here. Choose a layout that reflects your brand.
        </p>
      </div>

      {/* ── THEME CARDS GRID ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {THEMES.map((theme) => {
            const isSelected = selected?.id === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => setSelected(theme)}
                className={`group relative rounded-3xl transition-all duration-400 cursor-pointer overflow-hidden flex flex-col bg-white ${
                  isSelected
                    ? "ring-[3px] ring-indigo-500 shadow-2xl shadow-indigo-500/15 scale-[1.01]"
                    : "ring-1 ring-slate-200/80 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-slate-300/40 hover:ring-slate-300 hover:scale-[1.005]"
                }`}
              >
                {/* ── CARD HERO / PREVIEW AREA ── */}
                <div
                  className="relative h-56 sm:h-52 flex flex-col items-center justify-center p-5 overflow-hidden"
                  style={{ background: theme.previewBg }}
                >
                  {/* Mesh overlay */}
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />

                  {/* Floating orbs */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/8 blur-lg" />

                  {/* Badge */}
                  <div
                    className="absolute top-4 right-4 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-wider shadow-lg"
                    style={{ background: theme.badgeBg }}
                  >
                    {theme.badge}
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4.5 h-4.5 text-indigo-600" strokeWidth={3} />
                    </div>
                  )}

                  {/* Mini phone mockup */}
                  <div className="relative z-10 w-[130px]">
                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
                      <div className="w-12 h-12 rounded-full border-2 border-white/40 bg-white/20 mx-auto mb-2.5 overflow-hidden">
                        <img src={DUMMY_DATA.image} alt="preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-white text-[11px] leading-tight">Alex Morgan</div>
                        <div className="text-[9px] mt-0.5 text-white/60 font-medium">Creative Director</div>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <div className="h-[6px] w-full rounded-full" style={{ backgroundColor: theme.previewAccent, opacity: 0.5 }} />
                        <div className="h-[6px] w-3/4 rounded-full mx-auto" style={{ backgroundColor: theme.previewAccent, opacity: 0.35 }} />
                        <div className="h-[6px] w-1/2 rounded-full mx-auto" style={{ backgroundColor: theme.previewAccent, opacity: 0.2 }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CARD INFO ── */}
                <div className="p-5 flex-1 flex flex-col gap-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-[15px] tracking-tight mb-1">{theme.name}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{theme.tagline}</p>
                  </div>

                  {/* Color palette */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full shadow-sm ring-1 ring-black/5" style={{ backgroundColor: theme.primary }} />
                      <div className="w-5 h-5 rounded-full shadow-sm ring-1 ring-black/5" style={{ backgroundColor: theme.background }} />
                      <div className="w-5 h-5 rounded-full shadow-sm ring-1 ring-black/5" style={{ backgroundColor: theme.accent }} />
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">3 Colors</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2.5 mt-auto pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTheme(theme);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all active:scale-[0.97]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(theme);
                      }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.97] ${
                        isSelected
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Selected
                        </>
                      ) : (
                        <>
                          <Palette className="w-3.5 h-3.5" /> Select
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip */}
        <p className="text-center text-sm text-slate-400 mt-8 font-medium">
          💡 You can always change your theme later from the Dashboard.
        </p>
      </div>

      {/* ── STICKY BOTTOM BAR ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          selected ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-2xl border-t border-slate-200/80 shadow-[0_-10px_40px_rgba(0,0,0,0.06)] p-4 sm:p-5">
          <div className="max-w-lg mx-auto flex items-center gap-4">
            {selected && (
              <>
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: selected.previewBg }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm">{selected.name}</p>
                  <p className="text-slate-400 text-xs truncate">{selected.tagline}</p>
                </div>
                <button
                  onClick={handleApply}
                  disabled={saving}
                  className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-indigo-600/25 active:scale-[0.97]"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  {saving ? "Saving…" : "Continue"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── FULL PREVIEW MODAL ── */}
      {previewTheme && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full max-w-[400px] h-[88vh] max-h-[850px] bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)] border border-slate-200/50 flex flex-col">

            {/* Modal top bar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50">
              <span className="bg-white/95 backdrop-blur-md text-slate-700 text-xs font-bold px-4 py-2 rounded-full border border-slate-200 shadow-lg flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-indigo-500" />
                {previewTheme.name}
              </span>
              <button
                onClick={() => setPreviewTheme(null)}
                className="bg-white/95 hover:bg-white text-slate-600 w-9 h-9 rounded-full flex items-center justify-center shadow-lg border border-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Card render */}
            <div className="flex-1 overflow-y-auto scrollbar-none">
              <NexCard
                data={{
                  ...DUMMY_DATA,
                  theme: {
                    layout: previewTheme.id,
                    primary: previewTheme.primary,
                    background: previewTheme.background,
                  },
                }}
              />
            </div>

            {/* Bottom CTA */}
            <div className="absolute bottom-5 left-5 right-5 z-50">
              <button
                onClick={() => {
                  setSelected(previewTheme);
                  setPreviewTheme(null);
                }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Check className="w-5 h-5" />
                Select {previewTheme.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fonts & Utilities */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
