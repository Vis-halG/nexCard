'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Camera, Trash2, Plus, GripVertical, ExternalLink, Copy, Eye, Check, QrCode, Upload, X, Palette, Layout, Box, Sparkles, RotateCcw, LogOut, User, Briefcase, MapPin, MessageSquare, Download, Globe, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import NexCard from "../../components/NexCard";
import { DEMO_EMAIL, createDemoProfile } from "../../demoProfile";
import {
  DASHBOARD_TABS,
  DEFAULT_COLOR_INDEXES,
  DEFAULT_THEME,
  INITIAL_FORM,
  THEME_PRESETS
} from "./constants";

const TAB_ICON_MAP = {
  profile: User,
  business: Briefcase,
  social: Share2,
  media: Camera,
  themes: Palette,
  design: Layout,
  visibility: Eye
};

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [form, setForm] = useState(INITIAL_FORM);

  const [activeTab, setActiveTab] = useState("profile");
  const [previewTheme, setPreviewTheme] = useState(null);
  const [selectedColorIndexes, setSelectedColorIndexes] = useState(DEFAULT_COLOR_INDEXES);

  // 🔐 AUTH & FETCH DATA
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/admin");
      } else {
        setUser(u);
        try {
          const docRef = doc(db, "users", u.uid);
          const docSnap = await getDoc(docRef);
          let data = docSnap.exists() ? docSnap.data() : {};

          if (u.email?.toLowerCase() === DEMO_EMAIL && !data.demoReady) {
            const fallbackUsername = u.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
            const demoProfile = createDemoProfile({
              uid: u.uid,
              username: data.username || fallbackUsername
            });

            await setDoc(docRef, demoProfile, { merge: true });
            data = { ...data, ...demoProfile };
          }

          setForm((prev) => ({ 
            ...prev, 
            ...data,
            social: { ...prev.social, ...(data.social || {}) },
            payment: { ...prev.payment, ...(data.payment || {}) },
            theme: { ...prev.theme, ...(data.theme || {}) },
            services: data.services || [],
            gallery: data.gallery || [],
            customLinks: data.customLinks || [],
            videos: data.videos || []
          }));
        } catch (e) {
          console.error("Error fetching data:", e);
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setForm(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setForm(prev => {
      const newArr = [...prev[field]];
      newArr[index] = value;
      return { ...prev, [field]: newArr };
    });
  };
  
  const handleCustomLinkChange = (index, key, value) => {
    setForm(prev => {
      const newLinks = [...prev.customLinks];
      newLinks[index] = { ...newLinks[index], [key]: value };
      return { ...prev, customLinks: newLinks };
    });
  };

  const addArrayItem = (field, initialValue = "") => {
    setForm(prev => ({ ...prev, [field]: [...prev[field], initialValue] }));
  };

  const removeArrayItem = (field, index) => {
    setForm(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  // 🔥 IMAGE UPLOADING (via ImgBB)
  const handleImageUpload = async (e, field, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(30);

    const IMGBB_API_KEY = "e074813eb2df7563edc1c0637ef77359"; 

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      setUploadProgress(80);
      const data = await response.json();

      if (data.success) {
        const downloadURL = data.data.url;
        
        if (index !== null && field === 'gallery') {
          handleArrayChange('gallery', index, downloadURL);
        } else if (field === 'image') {
          setForm(prev => ({ ...prev, image: downloadURL }));
        } else if (field === 'coverImage') {
          setForm(prev => ({ ...prev, coverImage: downloadURL }));
        } else {
            handleNestedChange("payment", "qrCode", downloadURL);
        }
      } else {
        console.error("ImgBB Error:", data);
        alert("Upload failed. Make sure you pasted your ImgBB API key in the code!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Network error during upload.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, "users", user.uid), { ...form, uid: user.uid });
      alert("Profile Saved Successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Error saving data. Check Firestore rules.");
    }
  };

  const handleLoadDemo = () => {
    if (!window.confirm("This will overwrite your current form values with the demo profile data. Proceed?")) return;
    const demoData = createDemoProfile({
      uid: user.uid,
      username: form.username || "vishalgupta25980790"
    });
    setForm(prev => ({
      ...prev,
      ...demoData,
      image: prev.image || demoData.image,
      social: { ...demoData.social, ...prev.social },
      payment: { ...demoData.payment, ...prev.payment },
      theme: { ...demoData.theme, ...prev.theme }
    }));
  };

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    try {
      await signOut(auth);
      router.push("/admin");
    } catch (err) {
      console.error("Error signing out:", err);
      alert("Failed to log out.");
    }
  };

  if (loading) return <DashboardSkeleton />;

  const profileUrl = typeof window !== 'undefined' && form.username ? `${window.location.origin}/${form.username}` : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    alert("Link copied to clipboard!");
  };

  const handleUpdateUsername = async () => {
    if (!newUsername || newUsername === form.username) {
      setIsEditingUsername(false);
      return;
    }

    const clean = newUsername.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (clean.length < 3) {
      alert("Username must be at least 3 characters.");
      return;
    }

    setIsUpdatingUsername(true);
    try {
      const usernameRef = doc(db, "usernames", clean);
      const usernameSnap = await getDoc(usernameRef);

      if (usernameSnap.exists() && usernameSnap.data().uid !== user.uid) {
        alert("This username is already taken. Please try another one.");
        setIsUpdatingUsername(false);
        return;
      }

      if (form.username) {
        await import("firebase/firestore").then(({ deleteDoc, doc }) => 
          deleteDoc(doc(db, "usernames", form.username))
        );
      }

      await setDoc(doc(db, "usernames", clean), { uid: user.uid });
      await setDoc(doc(db, "users", user.uid), { ...form, username: clean }, { merge: true });

      setForm(prev => ({ ...prev, username: clean }));
      setIsEditingUsername(false);
      alert("Username updated successfully! 🚀");
    } catch (err) {
      console.error(err);
      alert("Failed to update username.");
    } finally {
      setIsUpdatingUsername(false);
    }
  };

  const handleTabReset = (tabId) => {
    const confirmMsg = {
      themes: "Theme Preset reset ho jayega — layout aur colors default ho jayenge. Sure ho?",
      profile: "Profile Info reset ho jayegi — naam, title, bio, photos sab clear ho jayenge. Sure ho?",
      business: "Business & Contacts reset ho jayega — phone, email, payment sab clear ho jayega. Sure ho?",
      social: "Social Links reset ho jayenge — sab platforms clear ho jayenge. Sure ho?",
      media: "Media & Arrays reset ho jayenge — gallery, videos, badges, custom links sab hata diye jayenge. Sure ho?",
      design: "Design Settings reset ho jayengi — sab design options default pe aa jayenge. Sure ho?"
    };
    if (!window.confirm(confirmMsg[tabId] || "Is tab ka data reset karna chahte ho?")) return;

    if (tabId === "themes") {
      setForm(prev => ({ ...prev, theme: { ...prev.theme, layout: "modern" } }));
      setSelectedColorIndexes(DEFAULT_COLOR_INDEXES);
    } else if (tabId === "profile") {
      setForm(prev => ({ ...prev, name: "", title: "", company: "", about: "", image: "", coverImage: "" }));
    } else if (tabId === "business") {
      setForm(prev => ({
        ...prev,
        phone: "", email: "", address: "", website: "", calendarUrl: "",
        googleReviewsUrl: "",
        payment: { upi: "", link: "", bankDetails: "", qrCode: "" }
      }));
    } else if (tabId === "social") {
      setForm(prev => ({ ...prev, social: { instagram: "", linkedin: "", twitter: "", facebook: "", youtube: "" } }));
    } else if (tabId === "media") {
      setForm(prev => ({ ...prev, services: [], gallery: [], customLinks: [], videos: [] }));
    } else if (tabId === "design") {
      setForm(prev => ({ ...prev, theme: { ...prev.theme, ...DEFAULT_THEME } }));
    }
  };

  return (
    <div className="min-h-screen lg:h-screen bg-[linear-gradient(180deg,#e0fbff_0%,#fff7d6_52%,#ffe8f0_100%)] font-sans flex flex-col lg:overflow-hidden">
      <DashboardHeader
        profileUrl={profileUrl}
        onLoadDemo={handleLoadDemo}
        onLogout={handleLogout}
        onSave={handleSave}
      />

      <main className="flex-1 lg:overflow-hidden">
        <div className="max-w-[1500px] mx-auto h-full flex flex-col lg:flex-row gap-5 px-4 py-4 lg:px-6 lg:py-3">
          
            <div className="flex-1 lg:h-full lg:overflow-y-auto pr-0 lg:pr-4 space-y-5 pb-8 lg:pb-24 scroll-smooth custom-scrollbar">
            
            {user && (
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="flex-1 w-full">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 block">Public Link</span>
                  {isEditingUsername ? (
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <div className="flex-1 flex items-center bg-slate-50 border border-indigo-200 rounded-xl px-3 py-2 group focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                        <span className="text-slate-400 font-medium text-sm">/</span>
                        <input 
                          value={newUsername} 
                          onChange={(e) => setNewUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                          className="flex-1 bg-transparent border-none outline-none text-slate-900 font-bold text-sm ml-0.5"
                          autoFocus
                        />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleUpdateUsername} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all">Save</button>
                        <button onClick={() => setIsEditingUsername(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-xs font-bold transition-all">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold text-lg hover:underline break-all">
                        {profileUrl || 'Loading URL...'}
                      </a>
                      <div className="flex gap-2">
                        <button onClick={() => { setNewUsername(form.username || ""); setIsEditingUsername(true); }} className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-indigo-600 transition-all"><Plus className="w-4 h-4 rotate-45" /></button>
                        <button onClick={handleCopyLink} className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-indigo-600 transition-all"><Copy className="w-4 h-4" /></button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <nav
              aria-label="Dashboard sections"
              className="sticky top-[64px] lg:top-0 z-50 rounded-xl border border-cyan-100 bg-white/95 p-1.5 shadow-[0_10px_30px_rgba(6,182,212,0.16)] backdrop-blur-md"
            >
              <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
                {DASHBOARD_TABS.map((tab) => {
                  const TabIcon = TAB_ICON_MAP[tab.id] || Layout;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-current={isActive ? "page" : undefined}
                      title={tab.label}
                      className={`group flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-[11px] font-bold leading-none transition-all sm:text-xs ${
                        isActive
                          ? "border-indigo-600 bg-indigo-600 text-white shadow-[0_10px_24px_rgba(6,182,212,0.24)]"
                          : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                          isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-800"
                        }`}
                      >
                        <TabIcon className="h-4 w-4" />
                      </span>
                      <span className="max-w-full truncate">{tab.shortLabel || tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {uploading && (
              <div className="bg-indigo-600 rounded-xl p-4 text-white flex items-center justify-between animate-in slide-in-from-top">
                <span className="text-sm font-bold">Uploading Assets...</span>
                <span className="text-xs font-mono">{Math.round(uploadProgress)}%</span>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {activeTab === "profile" && (
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-bold text-xl text-slate-800">Personal Details</h2>
                <button
                  onClick={() => handleTabReset("profile")}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-white bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Tab
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Cover Image Upload */}
                <div className="flex-1 w-full flex flex-col items-start gap-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Banner / Cover Image</label>
                  <div className="w-full h-32 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden relative group hover:border-indigo-400 transition-colors flex items-center justify-center">
                    {form.coverImage ? (
                      <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-slate-400">
                        <Layout className="w-6 h-6 mb-1 opacity-50" />
                        <span className="text-[10px] font-bold uppercase">Upload Banner</span>
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-xs font-semibold">
                      <Camera className="w-6 h-6 mb-1" />
                      Change Cover
                      <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => handleImageUpload(e, 'coverImage')} />
                    </label>
                  </div>
                </div>

                {/* Profile Avatar Upload */}
                <div className="w-32 shrink-0 flex flex-col items-center gap-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Profile</label>
                  <div className="w-32 h-32 rounded-full border-4 border-slate-100 bg-slate-50 overflow-hidden relative group shadow-sm flex items-center justify-center">
                    {form.image ? (
                      <img src={form.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-slate-300" />
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-xs font-semibold">
                      <Camera className="w-6 h-6 mb-1" />
                      Upload
                      <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => handleImageUpload(e, 'image')} />
                    </label>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                      <input name="title" value={form.title} onChange={handleChange} placeholder="CEO" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio / About Me</label>
                    <textarea name="about" value={form.about} onChange={handleChange} rows="4" placeholder="Tell people about yourself..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "business" && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-4 mb-0">
                <h2 className="font-bold text-xl text-slate-800">Business & Contacts</h2>
                <button
                  onClick={() => handleTabReset("business")}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-white bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Tab
                </button>
              </div>
              <div>
                <h2 className="font-bold text-xl text-slate-800 border-b pb-4 mb-4">Contact Utilities</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (Call/SMS/WhatsApp)</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1234567890" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="contact@example.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Office Address (Google Maps Embed)</label>
                    <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, City, Country" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-bold text-xl text-slate-800 border-b pb-4 mb-4">Operations & Engagement</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
                    <input name="website" value={form.website} onChange={handleChange} placeholder="https://example.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Booking Link (Calendly)</label>
                    <input name="calendarUrl" value={form.calendarUrl} onChange={handleChange} placeholder="https://calendly.com/your-url" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Google Reviews URL</label>
                    <input name="googleReviewsUrl" value={form.googleReviewsUrl} onChange={handleChange} placeholder="https://g.page/r/..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-bold text-xl text-slate-800 border-b pb-4 mb-4">Payments & Billing</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">UPI ID</label>
                      <input value={form.payment.upi} onChange={(e) => handleNestedChange("payment", "upi", e.target.value)} placeholder="name@upi" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Payment Demo Link</label>
                      <input value={form.payment.link} onChange={(e) => handleNestedChange("payment", "link", e.target.value)} placeholder="https://rzp.io/..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bank Account Guidelines</label>
                    <textarea value={form.payment.bankDetails} onChange={(e) => handleNestedChange("payment", "bankDetails", e.target.value)} rows="3" placeholder={"Bank Name: \nAcct No: \nIFSC: "} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none" />
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <QrCode className="w-5 h-5 text-indigo-500" />
                      <h3 className="font-bold text-slate-800 text-[15px]">Payment QR Code</h3>
                    </div>

                    <div className="flex flex-wrap gap-6 items-start">
                      <div className="flex-1 space-y-3">
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Upload your own QR code image, or leave it blank to auto-generate one from your UPI ID.
                        </p>

                        {form.payment.qrCode ? (
                          <div className="relative w-fit">
                            <img
                              src={form.payment.qrCode}
                              alt="Payment QR Code"
                              className="w-40 h-40 object-contain rounded-xl border border-slate-200 bg-white shadow-sm"
                            />
                            <button
                              onClick={() => handleNestedChange("payment", "qrCode", "")}
                              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <p className="text-[11px] text-green-600 font-semibold mt-2 text-center">✓ Custom QR uploaded</p>
                          </div>
                        ) : (
                          <label className={`flex flex-col items-center justify-center gap-2 w-40 h-40 rounded-xl border-2 border-dashed ${uploading ? 'border-indigo-300 bg-indigo-50' : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-indigo-50'} cursor-pointer transition-all group`}>
                            <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                            <span className="text-xs font-semibold text-slate-500 group-hover:text-indigo-600 text-center leading-tight">Upload QR Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploading}
                              onChange={(e) => handleImageUpload(e, 'payment')}
                            />
                          </label>
                        )}
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Preview</span>
                        <div className="w-40 h-40 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                          {form.payment.qrCode ? (
                            <img src={form.payment.qrCode} alt="QR Preview" className="w-full h-full object-contain p-2" />
                          ) : form.payment.upi ? (
                            <QRCodeSVG
                              value={`upi://pay?pa=${encodeURIComponent(form.payment.upi)}&pn=${encodeURIComponent(form.name || 'Payment')}&cu=INR`}
                              size={136}
                              level="M"
                              fgColor="#0F172A"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-slate-300">
                              <QrCode className="w-10 h-10" />
                              <span className="text-[10px] font-semibold text-center leading-tight">Enter UPI ID to auto-generate</span>
                            </div>
                          )}
                        </div>
                        {!form.payment.qrCode && form.payment.upi && (
                          <p className="text-[11px] text-indigo-500 font-semibold text-center">Auto-generated from UPI ID</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h2 className="font-bold text-xl text-slate-800">Social Media Placements</h2>
                <button
                  onClick={() => handleTabReset("social")}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-white bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Tab
                </button>
              </div>
              <div className="space-y-4">
                {['instagram', 'linkedin', 'twitter', 'facebook', 'youtube'].map((network) => (
                  <div key={network} className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="w-32 text-sm font-bold text-slate-600 capitalize pl-2">{network}</span>
                    <input 
                      value={form.social[network]} 
                      onChange={(e) => handleNestedChange("social", network, e.target.value)} 
                      placeholder={`https://${network}.com/yourprofile`} 
                      className="flex-1 p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-bold text-xl text-slate-800">Media & Arrays</h2>
                <button
                  onClick={() => handleTabReset("media")}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-white bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Tab
                </button>
              </div>
              <div>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <h2 className="font-bold text-xl text-slate-800">Media Gallery</h2>
                  <button onClick={() => addArrayItem("gallery")} className="flex items-center gap-1 text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="w-4 h-4" /> Add Image Slot
                  </button>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-5">
                  {form.gallery.map((img, i) => (
                    <div key={i} className="aspect-square bg-slate-100 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                      {img ? (
                        <>
                          <img src={img} className="w-full h-full object-cover" alt={`gallery item ${i}`} />
                          <button onClick={() => removeArrayItem("gallery", i)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center text-slate-400 hover:text-indigo-500 w-full h-full justify-center transition-colors">
                          <Camera className="w-6 h-6 mb-2" />
                          <span className="text-xs font-semibold uppercase tracking-wider">Storage Upload</span>
                          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => handleImageUpload(e, 'gallery', i)} />
                        </label>
                      )}
                    </div>
                  ))}
                  {form.gallery.length === 0 && <p className="text-sm text-slate-500 col-span-full">Tap Add Image Slot to begin uploading gallery photos directly to Firebase.</p>}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <h2 className="font-bold text-xl text-slate-800">YouTube Embeds</h2>
                  <button onClick={() => addArrayItem("videos")} className="flex items-center gap-1 text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="w-4 h-4" /> Add Video
                  </button>
                </div>
                <div className="space-y-8">
                  {form.videos.map((vid, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input 
                        value={vid} 
                        onChange={(e) => handleArrayChange("videos", i, e.target.value)} 
                        placeholder="https://youtube.com/watch?v=..." 
                        className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" 
                      />
                      <button onClick={() => removeArrayItem("videos", i)} className="text-slate-400 hover:text-red-500 p-2"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                  {form.videos.length === 0 && <p className="text-sm text-slate-500 flex-1">No videos added.</p>}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <h2 className="font-bold text-xl text-slate-800">Specialty Badges</h2>
                  <button onClick={() => addArrayItem("services")} className="flex items-center gap-1 text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="w-4 h-4" /> Add Badge
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.services.map((srv, i) => (
                    <div key={i} className="flex items-center bg-indigo-50 border border-indigo-100 rounded-lg pr-1 pl-3 py-1 gap-2">
                      <input 
                        value={srv} 
                        onChange={(e) => handleArrayChange("services", i, e.target.value)} 
                        placeholder="Expertise" 
                        className="bg-transparent text-indigo-800 text-sm font-semibold uppercase focus:outline-none w-28" 
                      />
                      <button onClick={() => removeArrayItem("services", i)} className="text-indigo-400 hover:text-red-500 p-1"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  ))}
                  {form.services.length === 0 && <p className="text-sm text-slate-500 w-full">No badges added.</p>}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <h2 className="font-bold text-xl text-slate-800">Important Custom Links</h2>
                  <button onClick={() => addArrayItem("customLinks", {title:"", url:""})} className="flex items-center gap-1 text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="w-4 h-4" /> Add Link
                  </button>
                </div>
                <div className="space-y-3">
                  {form.customLinks.map((link, i) => (
                    <div key={i} className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 items-center">
                      <GripVertical className="w-5 h-5 text-slate-400" />
                      <div className="flex-1 space-y-2">
                        <input value={link.title} onChange={(e) => handleCustomLinkChange(i, "title", e.target.value)} placeholder="Link Title (e.g., View Portfolio)" className="w-full p-2.5 border border-slate-200 rounded-lg text-sm bg-white" />
                        <input value={link.url} onChange={(e) => handleCustomLinkChange(i, "url", e.target.value)} placeholder="https://..." className="w-full p-2.5 border border-slate-200 rounded-lg text-sm bg-white" />
                      </div>
                      <button onClick={() => removeArrayItem("customLinks", i)} className="text-slate-400 hover:text-red-500 p-2"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                  {form.customLinks.length === 0 && <p className="text-sm text-slate-500 w-full">No custom links appended.</p>}
                </div>
              </div>

            </div>
          )}

          {activeTab === "design" && (
            <div className="p-6 space-y-12">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-bold text-xl text-slate-800">Design Settings</h2>
                <button
                  onClick={() => handleTabReset("design")}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-white bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Tab
                </button>
              </div>
              
              {/* ======================================================== */}
              {/* 🌟 CATEGORY 1: GLOBAL IDENTITY & CANVAS PRESETS */}
              {/* ======================================================== */}
              <section className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/80 space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
                    <h2 className="font-extrabold text-xl text-slate-800">1. Global Identity & Canvas</h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Configure your digital card&apos;s structural canvas, preset color styles, banner heights, text alignment, and typography.</p>
                </div>

                {/* Grid 1: Layout presets & Effects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Background Presets */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Background Theme Preset</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'none', label: 'Solid Base Color', preview: 'bg-slate-100' },
                        { id: 'sunset', label: 'Sunset Coral', preview: 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53]' },
                        { id: 'cyberpunk', label: 'Cyber Purple', preview: 'bg-gradient-to-br from-[#FF007F] to-[#7F00FF]' },
                        { id: 'ocean', label: 'Ocean Cyan', preview: 'bg-gradient-to-br from-[#00C9FF] to-[#92FE9D]' },
                        { id: 'forest', label: 'Emerald Mint', preview: 'bg-gradient-to-br from-[#11998e] to-[#38ef7d]' },
                        { id: 'mystic', label: 'Orchid Dream', preview: 'bg-gradient-to-br from-[#7F00FF] to-[#E100FF]' },
                        { id: 'custom', label: 'Custom Gradient', preview: 'custom-grad-class' }
                      ].map((grad) => {
                        const isCustom = grad.id === 'custom';
                        const previewStyle = isCustom 
                          ? { background: `linear-gradient(135deg, ${form.theme.gradientStart || '#06B6D4'} 0%, ${form.theme.gradientEnd || '#FF2D55'} 100%)` }
                          : {};
                        return (
                          <button
                            key={grad.id}
                            onClick={() => handleNestedChange("theme", "bgGradient", grad.id)}
                            className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col gap-2 ${form.theme.bgGradient === grad.id ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                          >
                            <div className={`w-full h-6 rounded-lg ${isCustom ? '' : grad.preview}`} style={previewStyle} />
                            <span className="font-bold text-[10px] text-slate-700 block leading-tight">{grad.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {form.theme.bgGradient === 'custom' && (
                      <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-inner grid grid-cols-2 gap-4 animate-fadeIn">
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Gradient Start</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color" 
                              value={form.theme.gradientStart || "#06B6D4"} 
                              onChange={(e) => handleNestedChange("theme", "gradientStart", e.target.value)} 
                              className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 bg-transparent animate-pulse"
                            />
                            <input 
                              type="text" 
                              value={form.theme.gradientStart || "#06B6D4"} 
                              onChange={(e) => handleNestedChange("theme", "gradientStart", e.target.value)}
                              className="w-full p-1.5 bg-slate-50 border border-slate-100 rounded-md font-mono text-[10px] uppercase text-slate-600 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Gradient End</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color" 
                              value={form.theme.gradientEnd || "#FF2D55"} 
                              onChange={(e) => handleNestedChange("theme", "gradientEnd", e.target.value)} 
                              className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 bg-transparent animate-pulse"
                            />
                            <input 
                              type="text" 
                              value={form.theme.gradientEnd || "#FF2D55"} 
                              onChange={(e) => handleNestedChange("theme", "gradientEnd", e.target.value)}
                              className="w-full p-1.5 bg-slate-50 border border-slate-100 rounded-md font-mono text-[10px] uppercase text-slate-600 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Background Effects */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Canvas Backdrop Effect</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'none', label: 'No Canvas Effect' },
                        { id: 'mesh', label: 'Animated Mesh' },
                        { id: 'bubbles', label: 'Floating Bubbles' },
                        { id: 'aurora', label: 'Aurora Flow' }
                      ].map((eff) => (
                        <button
                          key={eff.id}
                          onClick={() => handleNestedChange("theme", "bgEffect", eff.id)}
                          className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 ${form.theme.bgEffect === eff.id ? 'border-indigo-600 bg-indigo-600 text-white shadow-md' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}
                        >
                          <div className={`w-2.5 h-2.5 rounded-full ${form.theme.bgEffect === eff.id ? 'bg-white animate-ping' : 'bg-slate-200'}`} />
                          <span className="font-bold text-[10px]">{eff.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grid 2: Fonts & Sizes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-100 pt-6">
                  {/* Font Type */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Typography Font</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'font-sans', label: 'Standard Sans', preview: 'Aa', class: 'font-sans' },
                        { id: 'font-serif', label: 'Elegant Serif', preview: 'Aa', class: 'font-serif' },
                        { id: 'font-mono', label: 'Modern Mono', preview: 'Aa', class: 'font-mono' },
                        { id: 'font-display', label: 'Playful Display', preview: 'Aa', class: 'font-display' }
                      ].map((font) => (
                        <button
                          key={font.id}
                          onClick={() => handleNestedChange("theme", "font", font.id)}
                          className={`p-3 rounded-xl border-2 text-left transition-all ${form.theme.font === font.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                        >
                          <span className={`text-xl block mb-0.5 ${font.class}`}>{font.preview}</span>
                          <span className="text-[10px] font-bold block">{font.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Alignment */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Text Alignment</label>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'left', label: 'Left Aligned (Offset)' },
                        { id: 'center', label: 'Centered (Balanced)' },
                        { id: 'right', label: 'Right Aligned (Classic)' }
                      ].map((align) => (
                        <button
                          key={align.id}
                          onClick={() => handleNestedChange("theme", "textAlign", align.id)}
                          className={`w-full py-2 px-4 rounded-xl border-2 font-bold text-xs text-left transition-all ${form.theme.textAlign === align.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                        >
                          {align.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Banner size & Bio Sizing */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Banner Height</label>
                      <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                        {[
                          { id: 'compact', label: 'Slim' },
                          { id: 'standard', label: 'Medium' },
                          { id: 'tall', label: 'Tall' }
                        ].map((banner) => (
                          <button
                            key={banner.id}
                            onClick={() => handleNestedChange("theme", "bannerSize", banner.id)}
                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${form.theme.bannerSize === banner.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            {banner.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Bio Description Sizing</label>
                      <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                        {[
                          { id: 'compact', label: 'Compact' },
                          { id: 'standard', label: 'Default' },
                          { id: 'editorial', label: 'Large' }
                        ].map((size) => (
                          <button
                            key={size.id}
                            onClick={() => handleNestedChange("theme", "bioFontSize", size.id)}
                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${form.theme.bioFontSize === size.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ======================================================== */}
              {/* 🎨 CATEGORY 2: GRANULAR BRAND COLORS */}
              {/* ======================================================== */}
              <section className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/80 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-extrabold text-xl text-slate-800">2. Custom Theme Palette</h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Establish comprehensive visual branding by mapping individual colors to specific elements, card backgrounds, buttons, and titles.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Primary Color */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Brand Accent Theme</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={form.theme.primary} 
                        onChange={(e) => handleNestedChange("theme", "primary", e.target.value)} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={form.theme.primary} 
                        onChange={(e) => handleNestedChange("theme", "primary", e.target.value)}
                        className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-xs uppercase text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Background Color */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Page Background</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={form.theme.background} 
                        onChange={(e) => handleNestedChange("theme", "background", e.target.value)} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={form.theme.background} 
                        onChange={(e) => handleNestedChange("theme", "background", e.target.value)}
                        className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-xs uppercase text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Primary Text Color */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Primary Text (Headings)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={form.theme.textPrimary || "#0f172a"} 
                        onChange={(e) => handleNestedChange("theme", "textPrimary", e.target.value)} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={form.theme.textPrimary || "#0f172a"} 
                        onChange={(e) => handleNestedChange("theme", "textPrimary", e.target.value)}
                        className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-xs uppercase text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Secondary Text Color */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Secondary Text (Bio)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={form.theme.textSecondary || "#64748b"} 
                        onChange={(e) => handleNestedChange("theme", "textSecondary", e.target.value)} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={form.theme.textSecondary || "#64748b"} 
                        onChange={(e) => handleNestedChange("theme", "textSecondary", e.target.value)}
                        className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-xs uppercase text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Card Background Color */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Card Container Surface</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={form.theme.cardBg || "#ffffff"} 
                        onChange={(e) => handleNestedChange("theme", "cardBg", e.target.value)} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={form.theme.cardBg || "#ffffff"} 
                        onChange={(e) => handleNestedChange("theme", "cardBg", e.target.value)}
                        className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-xs uppercase text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Card Text Color */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Card Text (Important Links)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={form.theme.cardText || "#1e293b"} 
                        onChange={(e) => handleNestedChange("theme", "cardText", e.target.value)} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={form.theme.cardText || "#1e293b"} 
                        onChange={(e) => handleNestedChange("theme", "cardText", e.target.value)}
                        className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-xs uppercase text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Button Background Color */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Save CTA Button Fill</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={form.theme.btnBg || "#06b6d4"} 
                        onChange={(e) => handleNestedChange("theme", "btnBg", e.target.value)} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={form.theme.btnBg || "#06b6d4"} 
                        onChange={(e) => handleNestedChange("theme", "btnBg", e.target.value)}
                        className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-xs uppercase text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Button Text Color */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Save CTA Label Text</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={form.theme.btnText || "#ffffff"} 
                        onChange={(e) => handleNestedChange("theme", "btnText", e.target.value)} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={form.theme.btnText || "#ffffff"} 
                        onChange={(e) => handleNestedChange("theme", "btnText", e.target.value)}
                        className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-xs uppercase text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Input Background Color */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Form Input Field Box</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={form.theme.inputBg || "#f1f5f9"} 
                        onChange={(e) => handleNestedChange("theme", "inputBg", e.target.value)} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={form.theme.inputBg || "#f1f5f9"} 
                        onChange={(e) => handleNestedChange("theme", "inputBg", e.target.value)}
                        className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-xs uppercase text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Input Text Color */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Form Input Field Font</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={form.theme.inputText || "#0f172a"} 
                        onChange={(e) => handleNestedChange("theme", "inputText", e.target.value)} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={form.theme.inputText || "#0f172a"} 
                        onChange={(e) => handleNestedChange("theme", "inputText", e.target.value)}
                        className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-xs uppercase text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ======================================================== */}
              {/* 📐 CATEGORY 3: SURFACES, BORDERS & SHADOW GEOMETRY */}
              {/* ======================================================== */}
              <section className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/80 space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Box className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-extrabold text-xl text-slate-800">3. Surfaces, Geometry & Outlines</h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Sculpt the visual depth, card layouts, edge outline patterns, and border radius properties of your content containers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card Styling */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Card Layout Backdrop</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'standard', label: 'Solid White' },
                        { id: 'glass', label: 'Frosted Glass' },
                        { id: 'outline', label: 'Minimal Border' }
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() => handleNestedChange("theme", "cardStyle", style.id)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all ${form.theme.cardStyle === style.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600 font-bold shadow-sm' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                        >
                          <span className="text-[11px] font-bold leading-tight block">{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Border Radius */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Container Corner Radius</label>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                      {[
                        { id: '0rem', label: 'Sharp' },
                        { id: '0.75rem', label: 'Soft' },
                        { id: '1.5rem', label: 'Round' },
                        { id: '3rem', label: 'Pill' }
                      ].map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleNestedChange("theme", "radius", r.id)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${form.theme.radius === r.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                  {/* Card Depth & Shadow */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Card Shadows & Depth</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'none', label: 'Flat Layer', desc: 'No shadows/strokes' },
                        { id: 'subtle', label: 'Sleek Shadow', desc: 'Elegant viewport lift' },
                        { id: 'bold', label: 'Neobrutalist', desc: 'Thick black bounds' },
                        { id: 'glow', label: 'Brand Neon Glow', desc: 'Primary color aura' }
                      ].map((shadow) => (
                        <button
                          key={shadow.id}
                          onClick={() => handleNestedChange("theme", "shadowDepth", shadow.id)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col gap-1 justify-center ${form.theme.shadowDepth === shadow.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                        >
                          <span className="text-xs font-bold block">{shadow.label}</span>
                          <span className="text-[9px] text-slate-400 block leading-tight">{shadow.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Outer Border Patterns */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Card Outlines & Glow Edges</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'none', label: 'Seamless Edge', desc: 'Borderless style' },
                        { id: 'dashed', label: 'Creative Dashed', desc: 'Vector-stitch dash' },
                        { id: 'neon-glow', label: 'Primary Edge Glow', desc: 'Glowing brand borders' }
                      ].map((pat) => (
                        <button
                          key={pat.id}
                          onClick={() => handleNestedChange("theme", "cardBorderPattern", pat.id)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col gap-1 justify-center ${form.theme.cardBorderPattern === pat.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                        >
                          <span className="text-xs font-bold block">{pat.label}</span>
                          <span className="text-[9px] text-slate-400 block leading-tight">{pat.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ======================================================== */}
              {/* 👤 CATEGORY 4: PERSONAL PORTRAIT & SOCIAL BUTTONS */}
              {/* ======================================================== */}
              <section className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/80 space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-extrabold text-xl text-slate-800">4. Profile Frame & Social Badges</h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Customize your primary avatar portrait shape, outer bordering frame, social icon style mappings, and hovering triggers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Photo Shape */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Profile Photo Geometry</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'circle', label: 'Circle', icon: '○' },
                        { id: 'rounded', label: 'Soft Square', icon: '▢' },
                        { id: 'square', label: 'Sharp Square', icon: '□' }
                      ].map((shape) => (
                        <button
                          key={shape.id}
                          onClick={() => handleNestedChange("theme", "avatarStyle", shape.id)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1 ${form.theme.avatarStyle === shape.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600 font-bold shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                        >
                          <span className="text-lg font-medium">{shape.icon}</span>
                          <span className="text-[10px] font-bold leading-tight">{shape.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Avatar Border Frame */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Photo Border Frame</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'none', label: 'No Outer Frame', desc: 'Borderless portrait' },
                        { id: 'thin', label: 'Sleek Line Frame', desc: 'Subtle 2px stroke border' },
                        { id: 'thick', label: 'Heavy Frame', desc: 'Bold 4px solid border' },
                        { id: 'glow', label: 'Glowing Accent Aura', desc: 'Interactive color halos' }
                      ].map((border) => (
                        <button
                          key={border.id}
                          onClick={() => handleNestedChange("theme", "avatarBorder", border.id)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col gap-1 justify-center ${form.theme.avatarBorder === border.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                        >
                          <span className="text-xs font-bold block">{border.label}</span>
                          <span className="text-[9px] text-slate-400 block leading-tight">{border.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                  {/* Social Icons Styling */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Social Badges Style</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'colored', label: 'Vibrant Native', desc: 'Authentic brand hues' },
                        { id: 'monochrome', label: 'Charcoal Minimal', desc: 'Sleek dark monochrome' },
                        { id: 'outline', label: 'Sleek Outlines', desc: 'Crisp transparent thin borders' },
                        { id: 'glow', label: 'Neon Glow Badges', desc: 'Glowing matrix halos' }
                      ].map((soc) => (
                        <button
                          key={soc.id}
                          onClick={() => handleNestedChange("theme", "socialStyle", soc.id)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col gap-1 justify-center ${form.theme.socialStyle === soc.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                        >
                          <span className="text-xs font-bold block">{soc.label}</span>
                          <span className="text-[9px] text-slate-400 block leading-tight">{soc.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions Animation FX */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Quick Action Hover Animations</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'none', label: 'Static Fades', desc: 'Instant color switches' },
                        { id: 'float', label: 'Smooth Floating Lift', desc: 'Lifts up by -6px offset' },
                        { id: 'pulse', label: 'Heartbeat Scale', desc: 'Pulsing scale trigger' },
                        { id: 'glow', label: 'Accent Halo Glow', desc: 'Vibrant color bloom glows' }
                      ].map((anim) => (
                        <button
                          key={anim.id}
                          onClick={() => handleNestedChange("theme", "actionAnimation", anim.id)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col gap-1 justify-center ${form.theme.actionAnimation === anim.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                        >
                          <span className="text-xs font-bold block">{anim.label}</span>
                          <span className="text-[9px] text-slate-400 block leading-tight">{anim.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ======================================================== */}
              {/* ✉️ CATEGORY 5: ENGAGEMENT, UTILITIES & SCANNING */}
              {/* ======================================================== */}
              <section className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/80 space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <QrCode className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-extrabold text-xl text-slate-800">5. Engagement, QR & Lead Capture</h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Wired custom center branding elements, direct scan behaviors, and enquiry lead input form boxes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Default QR View */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Default QR Profile View</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'share', label: 'Share NexCard Profile', desc: 'Default link' },
                        { id: 'payment', label: 'Receive UPI Payment', desc: 'Direct transactions' }
                      ].map((qr) => (
                        <button
                          key={qr.id}
                          onClick={() => handleNestedChange("theme", "defaultQr", qr.id)}
                          className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-1 ${form.theme.defaultQr === qr.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                        >
                          <span className="font-bold text-[11px] block">{qr.label}</span>
                          <span className="text-[9px] text-slate-400 block leading-tight">{qr.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* QR Logo Center Branding */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">QR Scan Center Branding</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'none', label: 'Standard Block QR', desc: 'Standard scans' },
                        { id: 'avatar', label: 'Integrated Profile Logo', desc: 'Excavates central avatar image' }
                      ].map((logo) => (
                        <button
                          key={logo.id}
                          onClick={() => handleNestedChange("theme", "qrLogo", logo.id)}
                          className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-1 ${form.theme.qrLogo === logo.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                        >
                          <span className="font-bold text-[11px] block">{logo.label}</span>
                          <span className="text-[9px] text-slate-400 block leading-tight">{logo.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-slate-100 pt-6">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Lead Enquiry Form Aesthetic Style</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'flat', label: 'Cozy Flat Fills', desc: 'Soft slate backdrop' },
                      { id: 'pill', label: 'Rounded Pills', desc: 'High curvature bounds' },
                      { id: 'brutalist', label: 'Solid Brutalist', desc: 'Thick retro outline borders' },
                      { id: 'frosted', label: 'Frosted Glass', desc: 'Beautiful transparent blurs' }
                    ].map((frm) => (
                      <button
                        key={frm.id}
                        onClick={() => handleNestedChange("theme", "formAesthetic", frm.id)}
                        className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col gap-1 justify-center ${form.theme.formAesthetic === frm.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-500'}`}
                      >
                        <span className="text-xs font-bold block">{frm.label}</span>
                        <span className="text-[9px] text-slate-400 block leading-tight">{frm.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

            </div>
          )}

          {activeTab === "themes" && (
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h2 className="font-bold text-xl text-slate-800">Select a Layout Theme</h2>
                <button
                  onClick={() => handleTabReset("themes")}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-white bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Tab
                </button>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
                {THEME_PRESETS.map((preset, idx) => {
                  const isActive = form.theme?.layout === preset.layout;
                  const colorIndex = selectedColorIndexes[preset.layout] || 0;
                  const activeCombo = preset.colorCombinations[colorIndex];
                  return (
                    <div 
                      key={idx}
                      className={`rounded-2xl border-2 transition-all overflow-hidden flex flex-col ${isActive ? 'border-indigo-600 scale-[1.02] shadow-md ring-4 ring-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}
                    >
                      <div className="h-28 w-full flex items-end p-4 relative" style={{ backgroundColor: activeCombo.background }}>
                        <div className="absolute top-0 left-0 w-full h-[60%]" style={{ background: `linear-gradient(145deg, ${activeCombo.primary} 0%, ${activeCombo.primary}dd 100%)`, clipPath: "ellipse(120% 100% at 50% 0%)" }}></div>
                        <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm absolute top-4 left-4 bg-white/50 backdrop-blur-sm"></div>
                        <span className="relative z-10 font-bold text-slate-800 bg-white/90 px-3 py-1.5 rounded-lg text-sm backdrop-blur-md shadow-sm">{preset.name}</span>
                      </div>
                      <div className="bg-white p-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs text-slate-500 font-mono border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: activeCombo.primary }}></div> {activeCombo.primary}</div>
                          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: activeCombo.background }}></div> {activeCombo.background}</div>
                        </div>

                        {/* Interactive Color selector */}
                        <div className="flex flex-col gap-2 pt-1">
                          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Select Style Color</span>
                          <div className="flex items-center gap-2 pb-2">
                            {preset.colorCombinations.map((combo, comboIdx) => {
                              const isComboSelected = colorIndex === comboIdx;
                              return (
                                <button
                                  key={comboIdx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedColorIndexes(prev => ({ ...prev, [preset.layout]: comboIdx }));
                                    // If this theme is currently active/applied, update it in real time
                                    if (isActive) {
                                      setForm(prev => ({ 
                                        ...prev, 
                                        theme: { 
                                          ...prev.theme, 
                                          primary: combo.primary, 
                                          background: combo.background 
                                        } 
                                      }));
                                    }
                                  }}
                                  className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 ${
                                    isComboSelected ? "border-indigo-600 scale-110 shadow-sm" : "border-transparent hover:scale-105"
                                  }`}
                                  title={`Palette ${comboIdx + 1}`}
                                >
                                  <div className="w-5 h-5 rounded-full overflow-hidden flex rotate-45 border border-black/5">
                                    <div className="w-1/2 h-full" style={{ backgroundColor: combo.primary }} />
                                    <div className="w-1/2 h-full" style={{ backgroundColor: combo.accent }} />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-1">
                          <button 
                            onClick={() => setPreviewTheme({
                              layout: preset.layout,
                              primary: activeCombo.primary,
                              background: activeCombo.background
                            })}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${previewTheme?.layout === preset.layout ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                          >
                            <Eye className="w-3.5 h-3.5" /> {previewTheme?.layout === preset.layout ? "Previewing" : "Preview"}
                          </button>
                          <button 
                            onClick={() => {
                              setForm(prev => ({ ...prev, theme: { ...prev.theme, primary: activeCombo.primary, background: activeCombo.background, layout: preset.layout } }));
                              setPreviewTheme(null);
                            }}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-900 text-white hover:bg-black'}`}
                          >
                            <Check className="w-3.5 h-3.5" /> {isActive ? "Applied" : "Apply"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-slate-500 mt-4 text-center bg-slate-50 p-3 rounded-xl border border-slate-200">Clicking a preset will automatically update your Custom Design settings.</p>
            </div>
          )}

          {activeTab === "visibility" && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-bold text-xl text-slate-800">Section Visibility</h2>
                <p className="text-sm text-slate-500">Toggle which sections appear on your card</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'showAbout', label: 'About Section', icon: <User className="w-4 h-4 text-slate-500" /> },
                  { id: 'showServices', label: 'Specialties / Services', icon: <Briefcase className="w-4 h-4 text-slate-500" /> },
                  { id: 'showSocial', label: 'Social Links', icon: <Globe className="w-4 h-4 text-slate-500" /> },
                  { id: 'showGallery', label: 'Image Gallery', icon: <Camera className="w-4 h-4 text-slate-500" /> },
                  { id: 'showVideos', label: 'Videos', icon: <Box className="w-4 h-4 text-slate-500" /> },
                  { id: 'showCustomLinks', label: 'Custom Links', icon: <ExternalLink className="w-4 h-4 text-slate-500" /> },
                  { id: 'showPayment', label: 'Payment / UPI', icon: <QrCode className="w-4 h-4 text-slate-500" /> },
                  { id: 'showLocation', label: 'Location Map', icon: <MapPin className="w-4 h-4 text-slate-500" /> },
                  { id: 'showContactForm', label: 'Contact Form', icon: <MessageSquare className="w-4 h-4 text-slate-500" /> },
                  { id: 'showShare', label: 'Share Buttons', icon: <Share2 className="w-4 h-4 text-slate-500" /> },
                  { id: 'showSaveContact', label: 'Save Contact Button', icon: <Download className="w-4 h-4 text-slate-500" /> }
                ].map((item) => {
                  const isChecked = form.preferences?.[item.id] !== false;
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg">{item.icon}</div>
                        <span className="font-semibold text-slate-700 text-sm">{item.label}</span>
                      </div>
                      <button
                        onClick={() => setForm(prev => ({ ...prev, preferences: { ...prev.preferences, [item.id]: !isChecked } }))}
                        className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${isChecked ? 'bg-indigo-600' : 'bg-slate-300'}`}
                      >
                        <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all shadow-sm ${isChecked ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

            <LivePreviewPanel form={form} previewTheme={previewTheme} />

          </div>
      </main>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e0fbff_0%,#fff7d6_52%,#ffe8f0_100%)] p-8 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="h-10 w-64 bg-slate-200 rounded-xl" />
          <div className="h-12 w-32 bg-slate-200 rounded-full" />
        </div>

        <div className="mb-8 p-6 bg-white border border-slate-200 rounded-2xl flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-3 w-32 bg-slate-100 rounded" />
            <div className="h-5 w-64 bg-slate-100 rounded" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-slate-100 rounded-xl" />
            <div className="h-10 w-24 bg-slate-100 rounded-xl" />
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 w-28 bg-white border border-slate-200 rounded-full" />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8">
          <div className="h-8 w-48 bg-slate-100 rounded" />
          <div className="flex gap-8">
            <div className="w-32 h-32 rounded-full bg-slate-100" />
            <div className="flex-1 space-y-4">
              <div className="h-12 w-full bg-slate-50 rounded-xl" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 w-full bg-slate-50 rounded-xl" />
                <div className="h-12 w-full bg-slate-50 rounded-xl" />
              </div>
              <div className="h-32 w-full bg-slate-50 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardHeader({ profileUrl, onLoadDemo, onLogout, onSave }) {
  return (
    <header className="sticky top-0 z-[60] border-b border-cyan-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-3 px-4 lg:px-6">
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-400 text-white shadow-[0_10px_24px_rgba(6,182,212,0.24)]">
            <Layout className="h-5 w-5" />
          </div>
          <h1 className="truncate text-lg font-black tracking-tight text-slate-950 sm:text-xl">NexCard Studio</h1>
        </div>
        <div className="ml-auto flex min-w-0 items-center justify-end gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={onLoadDemo}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Demo</span>
          </button>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Live</span>
          </a>
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(6,182,212,0.26)] transition-colors hover:bg-indigo-700"
          >
            <Check className="h-4 w-4" />
            <span>Save</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            aria-label="Logout"
            title="Logout"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

function LivePreviewPanel({ form, previewTheme }) {
  const previewData = previewTheme ? { ...form, theme: { ...form.theme, ...previewTheme } } : form;
  const previewKey = previewTheme ? `preview-${previewTheme.layout}` : `live-${form.theme.layout}`;

  return (
    <div className="w-full lg:w-[400px] shrink-0 h-[600px] lg:h-full flex flex-col pb-2 mt-8 lg:mt-0">
      <div
        className="relative group bg-white border border-slate-200 rounded-[1.75rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden flex-1 min-h-0"
        style={{ transform: "translateZ(0)" }}
      >
        <div className="w-full h-full overflow-hidden relative">
          <NexCard key={previewKey} data={previewData} inPreview={true} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>
      <div className="mt-2 flex items-center justify-center gap-2">
        <div className={`w-2 h-2 rounded-full ${previewTheme ? "bg-rose-500 animate-pulse" : "bg-indigo-500"}`}></div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {previewTheme ? "Theme Preview Active" : "Live Preview (Real-Time)"}
        </p>
      </div>
    </div>
  );
}
