'use client'

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { db } from "../../lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import NexCard from "../components/NexCard";
import { createDemoProfile } from "../demoProfile";

export default function Page({ params }) {
  // ✅ Standard Next.js 16 way to unwrap params
  const resolvedParams = use(params);
  const username = resolvedParams.username;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // ⚡ Standardize username (must match signup/dashboard logic)
        const cleanUsername = username.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
        
        // 1. Try Fast Index
        const usernameRef = doc(db, "usernames", cleanUsername);
        const usernameSnap = await getDoc(usernameRef);

        let uid = null;
        if (usernameSnap.exists()) {
          uid = usernameSnap.data().uid;
        } else {
          // 2. Try Fallback Query
          const q = query(collection(db, "users"), where("username", "==", cleanUsername));
          const querySnap = await getDocs(q);
          if (!querySnap.empty) {
            uid = querySnap.docs[0].id;
          }
        }

        if (!uid) {
          setLoading(false);
          return;
        }

        // 3. Get Full User Data
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const profileData = userSnap.data();
          const isDemoUsername = cleanUsername === "vishalgupta25980";
          setData(
            isDemoUsername && !profileData.demoReady
              ? { ...profileData, ...createDemoProfile({ uid, username: cleanUsername }) }
              : profileData
          );
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Failed to connect to database");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // 🦴 SKELETON LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-[430px] h-[90vh] max-h-[850px] bg-white rounded-2xl shadow border border-slate-200 overflow-hidden flex flex-col relative p-6 space-y-8 animate-pulse">
          <div className="flex flex-col items-center space-y-4 pt-8">
            <div className="w-28 h-28 rounded-full bg-slate-100" />
            <div className="w-48 h-8 bg-slate-100 rounded-full" />
            <div className="w-32 h-4 bg-slate-50 rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="w-full h-4 bg-slate-50 rounded-full" />
            <div className="w-5/6 h-4 bg-slate-50 rounded-full" />
          </div>
          <div className="flex justify-center gap-4 pt-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="w-12 h-12 rounded-2xl bg-slate-50" />)}
          </div>
          <div className="space-y-3 pt-4">
            {[1, 2, 3].map(i => <div key={i} className="w-full h-16 bg-slate-50 rounded-2xl" />)}
          </div>
        </div>
      </div>
    );
  }

  // ❌ ERROR / NOT FOUND
  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">NexCard Not Found</h1>
        <p className="text-slate-500 max-w-xs mb-8">
          The username <span className="font-bold text-slate-900">&quot;{username}&quot;</span> doesn&apos;t seem to exist yet.
        </p>
        <Link href="/" className="bg-brand-indigo hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-colors cursor-pointer border-0">
          Back to Home
        </Link>
      </div>
    );
  }

  // ✅ SHOW CARD
  return <NexCard data={data} />;
}
