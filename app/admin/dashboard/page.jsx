'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Camera, Trash2, Plus, GripVertical, ExternalLink, Copy, Eye, Check, QrCode, Upload, X, Palette, Layout, Type, Square, Box, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import NexCard from "../../components/NexCard";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [form, setForm] = useState({
    name: "", title: "", company: "", phone: "", email: "", about: "", image: "",
    address: "", website: "", calendarUrl: "", googleReviewsUrl: "", gstNumber: "",
    social: { instagram: "", linkedin: "", twitter: "", facebook: "", youtube: "" },
    payment: { upi: "", link: "", bankDetails: "", qrCode: "" },
    services: [], gallery: [], customLinks: [], videos: [],
    theme: { 
      primary: "#4f46e5", 
      background: "#f8fafc", 
      layout: "modern",
      font: "font-sans", 
      radius: "1rem", 
      cardStyle: "standard", 
      avatarStyle: "circle",
      bgEffect: "none"
    }
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [previewTheme, setPreviewTheme] = useState(null);

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
          if (docSnap.exists()) {
            const data = docSnap.data();
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
          }
        } catch (e) {
          console.error("Error fetching data:", e);
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleNestedChange = (category, field, value) => {
    setForm({
      ...form,
      [category]: {
        ...form[category],
        [field]: value
      }
    });
  };

  const handleArrayChange = (field, index, value) => {
    const newArr = [...form[field]];
    newArr[index] = value;
    setForm({ ...form, [field]: newArr });
  };
  
  const handleCustomLinkChange = (index, key, value) => {
    const newLinks = [...form.customLinks];
    newLinks[index] = { ...newLinks[index], [key]: value };
    setForm({ ...form, customLinks: newLinks });
  };

  const addArrayItem = (field, initialValue = "") => {
    setForm({ ...form, [field]: [...form[field], initialValue] });
  };

  const removeArrayItem = (field, index) => {
    const newArr = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: newArr });
  };

  // 🔥 IMAGE UPLOADING (via ImgBB)
  const handleImageUpload = async (e, field, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(30); // Fake progress for UI feedback

    // 🔴 IMPORTANT: Paste your free ImgBB API key here
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
        } else {
          setForm({ ...form, [field]: downloadURL });
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
      // Use the username from the form state instead of forcing email prefix
      await setDoc(doc(db, "users", user.uid), { ...form, uid: user.uid });
      alert("Profile Saved Successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Error saving data. Check Firestore rules.");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 animate-pulse">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-10 w-64 bg-slate-200 rounded-xl" />
          <div className="h-12 w-32 bg-slate-200 rounded-full" />
        </div>

        {/* Link Box Skeleton */}
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

        {/* Tabs Skeleton */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-10 w-28 bg-white border border-slate-200 rounded-full" />
          ))}
        </div>

        {/* Content Area Skeleton */}
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

      // 1. Delete old username mapping
      if (form.username) {
        await import("firebase/firestore").then(({ deleteDoc, doc }) => 
          deleteDoc(doc(db, "usernames", form.username))
        );
      }

      // 2. Create new username mapping
      await setDoc(doc(db, "usernames", clean), { uid: user.uid });

      // 3. Update user document
      await setDoc(doc(db, "users", user.uid), { ...form, username: clean }, { merge: true });

      setForm({ ...form, username: clean });
      setIsEditingUsername(false);
      alert("Username updated successfully! 🚀");
    } catch (err) {
      console.error(err);
      alert("Failed to update username.");
    } finally {
      setIsUpdatingUsername(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile Info" },
    { id: "business", label: "Business & Contacts" },
    { id: "social", label: "Social Links" },
    { id: "media", label: "Media & Arrays" },
    { id: "design", label: "Design Settings" },
    { id: "themes", label: "Theme Presets" }
  ];

  const dummyData = {
    name: "Alex Morgan",
    title: "Creative Director",
    company: "NexCard Design Studio",
    phone: "+1234567890",
    email: "hello@alexmorgan.design",
    about: "I am a passionate creative director with over 10 years of experience in crafting beautiful digital experiences. I specialize in UI/UX, branding, and pushing the boundaries of web design.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    address: "123 Innovation Drive, Tech City, TC 90210",
    website: "https://nexcard.com",
    calendarUrl: "https://calendly.com",
    social: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com"
    },
    services: ["UI/UX Design", "Brand Identity", "Web Development", "Marketing Strategy"],
    gallery: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop"
    ],
    customLinks: [
      { title: "View My Portfolio", url: "https://example.com" },
      { title: "Download Resume", url: "https://example.com" }
    ],
    payment: {
      upi: "alex@upi",
      gstNumber: "22AAAAA0000A1Z5",
      bankDetails: "Bank Name: Chase\nAcct No: 123456789\nIFSC: CHASE0001"
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-24">
      {/* 🚀 DASHBOARD HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-[60] px-4 md:px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
              <Layout className="w-6 h-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">NexCard Studio</h1>
          </div>
          <div className="flex items-center gap-3">
             <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold text-sm px-4 py-2 rounded-xl transition-all">
                <Eye className="w-4 h-4" /> View Live
             </a>
             <button onClick={handleSave} className="bg-slate-900 hover:bg-black text-white px-8 py-2.5 rounded-xl font-bold shadow-md transition-all">
               Save Changes
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 📝 LEFT COLUMN: FORM & EDITING */}
          <div className="flex-1 w-full space-y-8">
            
            {/* PUBLIC LINK BOX */}
            {user && (
              <div className="p-4 md:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="flex-1 w-full">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 block">Public Link</span>
                  {isEditingUsername ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1">
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

            {/* 🔘 TAB NAVIGATION */}
            <div className="bg-white border border-slate-200 rounded-2xl p-2 flex overflow-x-auto gap-1 scrollbar-none sticky top-24 z-50 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {uploading && (
              <div className="bg-indigo-600 rounded-xl p-4 text-white flex items-center justify-between animate-in slide-in-from-top">
                <span className="text-sm font-bold">Uploading Assets...</span>
                <span className="text-xs font-mono">{Math.round(uploadProgress)}%</span>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* ========================================================= */}
          {/* PROFILE INFO TAB */}
          {/* ========================================================= */}
          {activeTab === "profile" && (
            <div className="p-6 md:p-8 space-y-6">
              <h2 className="font-bold text-xl text-slate-800 border-b pb-4">Personal Details</h2>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3 flex flex-col items-center gap-3">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-100 bg-slate-50 overflow-hidden relative group shadow-sm flex items-center justify-center">
                    {form.image ? (
                      <img src={form.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-slate-300" />
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-xs font-semibold">
                      <Camera className="w-6 h-6 mb-1" />
                      Upload Photo
                      <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => handleImageUpload(e, 'image')} />
                    </label>
                  </div>
                  <p className="text-xs text-slate-500 text-center">Tap image to upload to Firebase Storage.</p>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* ========================================================= */}
          {/* BUSINESS / CONTACT TAB */}
          {/* ========================================================= */}
          {activeTab === "business" && (
            <div className="p-6 md:p-8 space-y-8">
              
              <div>
                <h2 className="font-bold text-xl text-slate-800 border-b pb-4 mb-4">Contact Utilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (Call/SMS/WhatsApp)</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1234567890" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="contact@example.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Office Address (Google Maps Embed)</label>
                    <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, City, Country" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-bold text-xl text-slate-800 border-b pb-4 mb-4">Operations & Engagement</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
                    <input name="website" value={form.website} onChange={handleChange} placeholder="https://example.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Booking Link (Calendly)</label>
                    <input name="calendarUrl" value={form.calendarUrl} onChange={handleChange} placeholder="https://calendly.com/your-url" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Google Reviews URL</label>
                    <input name="googleReviewsUrl" value={form.googleReviewsUrl} onChange={handleChange} placeholder="https://g.page/r/..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-bold text-xl text-slate-800 border-b pb-4 mb-4">Payments & Billing</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">GSTIN Number</label>
                    <input name="gstNumber" value={form.gstNumber} onChange={handleChange} placeholder="22AAAAA0000A1Z5" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bank Account Guidelines</label>
                    <textarea value={form.payment.bankDetails} onChange={(e) => handleNestedChange("payment", "bankDetails", e.target.value)} rows="3" placeholder={"Bank Name: \nAcct No: \nIFSC: "} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none" />
                  </div>

                  {/* ── QR CODE SECTION ── */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <QrCode className="w-5 h-5 text-indigo-500" />
                      <h3 className="font-bold text-slate-800 text-[15px]">Payment QR Code</h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* LEFT — upload or auto-gen */}
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
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setUploading(true);
                                setUploadProgress(30);
                                const IMGBB_API_KEY = "e074813eb2df7563edc1c0637ef77359";
                                const fd = new FormData();
                                fd.append("image", file);
                                try {
                                  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: "POST", body: fd });
                                  setUploadProgress(80);
                                  const json = await res.json();
                                  if (json.success) handleNestedChange("payment", "qrCode", json.data.url);
                                  else alert("Upload failed.");
                                } catch { alert("Network error."); }
                                finally { setUploading(false); setUploadProgress(0); }
                              }}
                            />
                          </label>
                        )}
                      </div>

                      {/* RIGHT — live preview */}
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
                  {/* ── END QR CODE SECTION ── */}

                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SOCIALS TAB */}
          {/* ========================================================= */}
          {activeTab === "social" && (
            <div className="p-6 md:p-8 space-y-6">
              <h2 className="font-bold text-xl text-slate-800 border-b pb-4 mb-4">Social Media Placements</h2>
              <div className="space-y-4">
                {['instagram', 'linkedin', 'twitter', 'facebook', 'youtube'].map((network) => (
                  <div key={network} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
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

          {/* ========================================================= */}
          {/* MEDIA & ARRAYS TAB */}
          {/* ========================================================= */}
          {activeTab === "media" && (
            <div className="p-6 md:p-8 space-y-10">
              
              {/* IMAGE GALLERY */}
              <div>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <h2 className="font-bold text-xl text-slate-800">Media Gallery</h2>
                  <button onClick={() => addArrayItem("gallery")} className="flex items-center gap-1 text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="w-4 h-4" /> Add Image Slot
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Storage Upload</span>
                          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => handleImageUpload(e, 'gallery', i)} />
                        </label>
                      )}
                    </div>
                  ))}
                  {form.gallery.length === 0 && <p className="text-sm text-slate-500 col-span-full">Tap Add Image Slot to begin uploading gallery photos directly to Firebase.</p>}
                </div>
              </div>

              {/* YOUTUBE VIDEOS */}
              <div>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <h2 className="font-bold text-xl text-slate-800">YouTube Embeds</h2>
                  <button onClick={() => addArrayItem("videos")} className="flex items-center gap-1 text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="w-4 h-4" /> Add Video
                  </button>
                </div>
                <div className="space-y-3">
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

              {/* SERVICES / SPECIALTIES */}
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

              {/* CUSTOM LINKS */}
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
                      <GripVertical className="w-5 h-5 text-slate-400 hidden sm:block" />
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

          {/* ========================================================= */}
          {/* DESIGN TAB */}
          {/* ========================================================= */}
          {activeTab === "design" && (
            <div className="p-6 md:p-8 space-y-6">
              <h2 className="font-bold text-xl text-slate-800 border-b pb-4 mb-4">Aesthetics & Palette</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Primary Theme Color</label>
                    <div className="flex gap-4 items-center">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                        <input type="color" value={form.theme.primary} onChange={(e) => handleNestedChange("theme", "primary", e.target.value)} className="absolute -top-2 -left-2 w-20 h-20 cursor-pointer" />
                      </div>
                      <span className="font-mono font-medium text-slate-600 text-sm uppercase bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">{form.theme.primary}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">App Background Color</label>
                    <div className="flex gap-4 items-center">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                        <input type="color" value={form.theme.background} onChange={(e) => handleNestedChange("theme", "background", e.target.value)} className="absolute -top-2 -left-2 w-20 h-20 cursor-pointer" />
                      </div>
                      <span className="font-mono font-medium text-slate-600 text-sm uppercase bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">{form.theme.background}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Preview Swatch</span>
                  <div className="w-full max-w-[200px] h-64 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-black/5" style={{ backgroundColor: form.theme.background }}>
                    <div className="h-20" style={{ background: `linear-gradient(135deg, ${form.theme.primary} 0%, ${form.theme.primary}dd 100%)` }}></div>
                    <div className="flex-1 px-4 text-center">
                      <div className="w-12 h-12 bg-white rounded-full mx-auto -mt-6 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                         {form.image ? <img src={form.image} alt="Preview" /> : null}
                      </div>
                      <div className="h-3 w-16 bg-slate-200/50 rounded-full mx-auto mt-3"></div>
                      <div className="h-2 w-10 bg-slate-200/50 rounded-full mx-auto mt-1.5"></div>
                      <div className="mt-5 space-y-2">
                        <div className="h-7 w-full rounded-lg opacity-20" style={{ backgroundColor: form.theme.primary }}></div>
                        <div className="h-7 w-full rounded-lg opacity-20" style={{ backgroundColor: form.theme.primary }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* DESIGN SETTINGS TAB */}
          {/* ========================================================= */}
          {activeTab === "design" && (
            <div className="p-6 md:p-8 space-y-10">
              
              {/* 🎨 Colors Section */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Palette className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-bold text-xl text-slate-800">Brand Colors</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-3">Primary Theme Color</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="color" 
                        value={form.theme.primary} 
                        onChange={(e) => handleNestedChange("theme", "primary", e.target.value)} 
                        className="w-14 h-14 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <div className="flex-1">
                        <input 
                          type="text" 
                          value={form.theme.primary} 
                          onChange={(e) => handleNestedChange("theme", "primary", e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-sm uppercase"
                        />
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">Main Buttons & Accents</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-3">Background Color</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="color" 
                        value={form.theme.background} 
                        onChange={(e) => handleNestedChange("theme", "background", e.target.value)} 
                        className="w-14 h-14 rounded-xl cursor-pointer border-none p-0 bg-transparent"
                      />
                      <div className="flex-1">
                        <input 
                          type="text" 
                          value={form.theme.background} 
                          onChange={(e) => handleNestedChange("theme", "background", e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-sm uppercase"
                        />
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">Page Base Color</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 🔤 Typography & Shape Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t pt-10">
                
                {/* Font Selection */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Type className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-bold text-lg text-slate-800">Typography</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'font-sans', label: 'Standard Sans', preview: 'Aa', class: 'font-sans' },
                      { id: 'font-serif', label: 'Elegant Serif', preview: 'Aa', class: 'font-serif' },
                      { id: 'font-mono', label: 'Modern Mono', preview: 'Aa', class: 'font-mono' },
                      { id: 'font-display', label: 'Playful Display', preview: 'Aa', class: 'font-display' }
                    ].map((font) => (
                      <button
                        key={font.id}
                        onClick={() => handleNestedChange("theme", "font", font.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${form.theme.font === font.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                      >
                        <span className={`text-2xl block mb-1 ${font.class}`}>{font.preview}</span>
                        <span className="text-xs font-bold text-slate-600">{font.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Corner Radius */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Box className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-bold text-lg text-slate-800">Card Geometry</h2>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Border Radius</label>
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
              </section>

              {/* 🎭 Visual Identity Section */}
              <section className="border-t pt-10">
                <div className="flex items-center gap-2 mb-6">
                  <Layout className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-bold text-xl text-slate-800">Visual Identity</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Card Style */}
                  <div className="space-y-4">
                    <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-1">Card Styling</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'standard', label: 'Solid White' },
                        { id: 'glass', label: 'Frosted Glass' },
                        { id: 'outline', label: 'Minimal Border' }
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() => handleNestedChange("theme", "cardStyle", style.id)}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${form.theme.cardStyle === style.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600' : 'border-slate-100 bg-white text-slate-500'}`}
                        >
                          <span className="text-[11px] font-bold leading-tight block">{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Avatar Shape */}
                  <div className="space-y-4">
                    <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-1">Profile Photo Shape</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'circle', label: 'Circle', icon: '○' },
                        { id: 'rounded', label: 'Soft Square', icon: '▢' },
                        { id: 'square', label: 'Sharp Square', icon: '□' }
                      ].map((shape) => (
                        <button
                          key={shape.id}
                          onClick={() => handleNestedChange("theme", "avatarStyle", shape.id)}
                          className={`p-3 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-1 ${form.theme.avatarStyle === shape.id ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600' : 'border-slate-100 bg-white text-slate-500'}`}
                        >
                          <span className="text-xl font-medium">{shape.icon}</span>
                          <span className="text-[11px] font-bold leading-tight">{shape.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 🌈 Background Effects */}
              <section className="border-t pt-10">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-bold text-xl text-slate-800">Background Effects</h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  {[
                    { id: 'none', label: 'No Effect' },
                    { id: 'mesh', label: 'Animated Mesh' },
                    { id: 'bubbles', label: 'Floating Bubbles' },
                    { id: 'aurora', label: 'Aurora Flow' }
                  ].map((eff) => (
                    <button
                      key={eff.id}
                      onClick={() => handleNestedChange("theme", "bgEffect", eff.id)}
                      className={`px-6 py-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${form.theme.bgEffect === eff.id ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}
                    >
                      <div className={`w-3 h-3 rounded-full ${form.theme.bgEffect === eff.id ? 'bg-white animate-ping' : 'bg-slate-200'}`} />
                      <span className="font-bold text-sm">{eff.label}</span>
                    </button>
                  ))}
                </div>
              </section>

            </div>
          )}

          {/* ========================================================= */}
          {/* THEMES TAB */}
          {/* ========================================================= */}
          {activeTab === "themes" && (
            <div className="p-6 md:p-8 space-y-6">
              <h2 className="font-bold text-xl text-slate-800 border-b pb-4 mb-4">Select a Layout Theme</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: "Modern (Curved)", layout: "modern", primary: "#4F46E5", background: "#F8FAFC" },
                  { name: "Classic Corporate", layout: "classic", primary: "#1D4ED8", background: "#EFF6FF" },
                  { name: "Swiss Minimal", layout: "minimal", primary: "#475569", background: "#FFFFFF" },
                  { name: "Rose Glass", layout: "glass", primary: "#B76E79", background: "#FFF7F3" },
                  { name: "Bold Luxe", layout: "bold", primary: "#0EA5A4", background: "#F7FBF8" }
                ].map((preset, idx) => {
                  const isActive = form.theme?.layout === preset.layout;
                  return (
                    <div 
                      key={idx}
                      className={`rounded-2xl border-2 transition-all overflow-hidden flex flex-col ${isActive ? 'border-indigo-600 scale-[1.02] shadow-md ring-4 ring-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}
                    >
                      <div className="h-28 w-full flex items-end p-4 relative" style={{ backgroundColor: preset.background }}>
                        <div className="absolute top-0 left-0 w-full h-[60%]" style={{ background: `linear-gradient(145deg, ${preset.primary} 0%, ${preset.primary}dd 100%)`, clipPath: "ellipse(120% 100% at 50% 0%)" }}></div>
                        <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm absolute top-4 left-4 bg-white/50 backdrop-blur-sm"></div>
                        <span className="relative z-10 font-bold text-slate-800 bg-white/90 px-3 py-1.5 rounded-lg text-sm backdrop-blur-md shadow-sm">{preset.name}</span>
                      </div>
                      <div className="bg-white p-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: preset.primary }}></div> {preset.primary}</div>
                          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: preset.background }}></div> {preset.background}</div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <button 
                            onClick={() => setPreviewTheme(preset)}
                            className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" /> Preview
                          </button>
                          <button 
                            onClick={() => setForm({ ...form, theme: { ...form.theme, primary: preset.primary, background: preset.background, layout: preset.layout } })}
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

          </div>
        </div>

          {/* 📱 RIGHT COLUMN: LIVE PREVIEW */}
          <div className="hidden lg:block w-[400px] sticky top-24 shrink-0">
            <div className="bg-slate-900 rounded-[3.5rem] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] border-8 border-slate-800 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-slate-800 rounded-b-3xl z-[70]"></div>
              
              <div className="bg-white w-full h-[750px] rounded-[2.5rem] overflow-hidden overflow-y-auto scrollbar-none relative group">
                <NexCard data={form} />
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-800 rounded-full"></div>
            </div>
            <p className="text-center mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Live Preview (Real-Time)</p>
          </div>

        </div>
      </div>
    </div>
  );
}
