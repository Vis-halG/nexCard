'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    about: "",
    image: "",
    theme: {
      primary: "#6366f1",
      background: "#f3f4f6",
    }
  });

  const [activeTab, setActiveTab] = useState("profile");

  // 🔐 AUTH PROTECTION
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/admin");
      } else {
        setUser(u);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleThemeChange = (key, value) => {
    setForm({
      ...form,
      theme: {
        ...form.theme,
        [key]: value
      }
    });
  };

  const handleSave = async () => {
    try {
      if (!user) return;

      const uid = user.uid;
      const username = user.email.split("@")[0];

      await setDoc(doc(db, "users", uid), {
        ...form,
        username,
        uid,
      });

      await setDoc(doc(db, "usernames", username), {
        uid,
      });

      alert("Saved Successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Error saving data");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <h1 className="text-2xl font-bold mb-4 text-center">
        NexCard Dashboard 🚀
      </h1>

      {/* 🔘 TAB SWITCH */}
      <div className="flex justify-center mb-4 gap-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded ${activeTab === "profile" ? "bg-indigo-600 text-white" : "bg-white border"}`}
        >
          Profile
        </button>

        <button
          onClick={() => setActiveTab("design")}
          className={`px-4 py-2 rounded ${activeTab === "design" ? "bg-indigo-600 text-white" : "bg-white border"}`}
        >
          Design
        </button>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4">

        {/* 🟦 PROFILE SECTION */}
        {activeTab === "profile" && (
          <>
            <h2 className="font-semibold text-lg">Profile Info</h2>

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />

            <input name="image" value={form.image} onChange={handleChange} placeholder="Profile Image URL" className="w-full p-2 border rounded" />

            {/* 👀 Preview */}
            {form.image && (
              <img src={form.image} alt="preview" className="w-20 h-20 rounded-full object-cover mx-auto" />
            )}

            <textarea name="about" value={form.about} onChange={handleChange} placeholder="About" className="w-full p-2 border rounded" />
          </>
        )}

        {/* 🟪 DESIGN SECTION */}
        {activeTab === "design" && (
          <>
            <h2 className="font-semibold text-lg">Design Settings</h2>

            <div>
              <p className="text-sm mb-1">Primary Color</p>
              <input
                type="color"
                value={form.theme.primary}
                onChange={(e) => handleThemeChange("primary", e.target.value)}
              />
            </div>

            <div>
              <p className="text-sm mb-1">Background Color</p>
              <input
                type="color"
                value={form.theme.background}
                onChange={(e) => handleThemeChange("background", e.target.value)}
              />
            </div>

            {/* 🎨 LIVE PREVIEW */}
            <div
              className="p-4 rounded text-white mt-4"
              style={{
                background: form.theme.primary
              }}
            >
              Live Preview Card
            </div>
          </>
        )}

        {/* 💾 SAVE */}
        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 text-white py-2 rounded mt-4"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}