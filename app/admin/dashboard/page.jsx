'use client'

import { useState } from "react";
import { auth, db } from "../../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Dashboard() {
  const [form, setForm] = useState({
    name: "Test User",
    title: "Frontend Developer",
    phone: "919876543210",
    email: "test@email.com",
    about: "This is demo profile",
    image: "https://i.pravatar.cc/150?img=3",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Not logged in");
        return;
      }

      const username = user.email.split("@")[0];

      await setDoc(doc(db, "users", username), form);

      alert("Saved to Firebase ✅");
    } catch (err) {
      console.log(err);
      alert("Error saving data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-md">

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full mb-3 p-2 border rounded" />

        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full mb-3 p-2 border rounded" />

        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full mb-3 p-2 border rounded" />

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full mb-3 p-2 border rounded" />

        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full mb-3 p-2 border rounded" />

        <textarea name="about" value={form.about} onChange={handleChange} placeholder="About" className="w-full mb-3 p-2 border rounded" />

        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}