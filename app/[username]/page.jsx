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
        console.log("Fetching username:", username);

        // 🔥 step 1: get UID from usernames collection
        const usernameRef = doc(db, "usernames", username);
        const usernameSnap = await getDoc(usernameRef);

        if (!usernameSnap.exists()) {
          console.log("Username not found");
          setLoading(false);
          return;
        }

        const uid = usernameSnap.data().uid;

        console.log("UID:", uid);

        // 🔥 step 2: get user data from users collection
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setData(userSnap.data());
        } else {
          console.log("User data not found");
        }

      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // ⏳ LOADING UI
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading card...</p>
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