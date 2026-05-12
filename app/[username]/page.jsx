'use client'

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import NexCard from "../components/NexCard";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  // ✅ STEP 1: unwrap params (Next.js 16 fix)
  useEffect(() => {
    const getParams = async () => {
      const p = await params;
      setUsername(p.username);
    };

    getParams();
  }, [params]);

  // ✅ STEP 2: fetch data using username → UID
  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const cleanUsername = username.toLowerCase().trim();
        console.log("Fetching clean username:", cleanUsername);

        // 🔥 step 1: try the fast index (usernames collection)
        const usernameRef = doc(db, "usernames", cleanUsername);
        const usernameSnap = await getDoc(usernameRef);

        let uid = null;

        if (usernameSnap.exists()) {
          uid = usernameSnap.data().uid;
          console.log("UID found via index:", uid);
        } else {
          // ⚠️ Fallback: Query the users collection directly
          // This helps if the index is missing or for legacy accounts
          console.log("Index not found, trying direct query...");
          const { collection, query, where, getDocs } = await import("firebase/firestore");
          const q = query(collection(db, "users"), where("username", "==", cleanUsername));
          const querySnap = await getDocs(q);
          
          if (!querySnap.empty) {
            uid = querySnap.docs[0].id;
            console.log("UID found via fallback query:", uid);
          }
        }

        if (!uid) {
          console.log("Username not found anywhere");
          setLoading(false);
          return;
        }

        // 🔥 step 2: get user data from users collection
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setData(userSnap.data());
        } else {
          console.log("User data not found for UID:", uid);
        }

      } catch (err) {
        console.log("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // ⏳ LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-[430px] h-[90vh] max-h-[850px] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative border-8 border-white p-6 space-y-8">
          {/* Header Skeleton */}
          <div className="flex flex-col items-center space-y-4 pt-8">
            <div className="w-28 h-28 rounded-full bg-slate-200 animate-pulse" />
            <div className="w-48 h-8 bg-slate-100 rounded-full animate-pulse" />
            <div className="w-32 h-4 bg-slate-100 rounded-full animate-pulse" />
          </div>

          {/* About Skeleton */}
          <div className="space-y-3">
            <div className="w-full h-4 bg-slate-100 rounded-full animate-pulse" />
            <div className="w-5/6 h-4 bg-slate-100 rounded-full animate-pulse" />
          </div>

          {/* Social Icons Skeleton */}
          <div className="flex justify-center gap-4 pt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>

          {/* Action Buttons Skeleton */}
          <div className="space-y-3 pt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-full h-16 bg-slate-50 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ❌ USER NOT FOUND
  if (!data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>User not found ❌</p>
      </div>
    );
  }

  // ✅ SHOW CARD
  return <NexCard data={data} />;
}