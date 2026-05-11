'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { User, Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function AdminPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (!username || !password) {
        alert("Enter username & password");
        return;
      }

      setLoading(true);

      let cleanUsername = username.trim().toLowerCase();

      if (cleanUsername.includes("@")) {
        cleanUsername = cleanUsername.split("@")[0];
      }

      const email = `${cleanUsername}@nexcard.com`;

      if (isLogin) {
        try {
          const userCred = await signInWithEmailAndPassword(auth, email, password);
          // Check if user already has a theme → go to dashboard, else setup
          const snap = await import("firebase/firestore").then(({ doc, getDoc }) =>
            getDoc(doc(db, "users", userCred.user.uid))
          );
          const hasTheme = snap.exists() && snap.data()?.theme?.layout;
          router.push(hasTheme ? "/admin/dashboard" : "/admin/setup");
        } catch (err) {
          console.log(err);
          if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
            alert("Invalid credentials. Please check your username and password, or Sign Up.");
          } else {
            alert("Login failed: " + err.message);
          }
        }
      } else {
        try {
          // We don't check Firestore first because unauthenticated users lack permissions.
          // Firebase Auth will throw 'auth/email-already-in-use' if the username (email) is taken.
          const newUser = await createUserWithEmailAndPassword(auth, email, password);
          const uid = newUser.user.uid;

          // 🔥 username mapping
          await setDoc(doc(db, "usernames", cleanUsername), {
            uid
          });

          // 🔥 save user data
          await setDoc(doc(db, "users", uid), {
            username: cleanUsername,
            email,
            uid,
          });

          router.push("/admin/setup"); // New user → pick theme first
        } catch (err) {
          console.log(err);
          if (err.code === 'auth/email-already-in-use') {
             alert("Username is already taken.");
          } else {
             alert("Sign up failed: " + err.message);
          }
        }
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔥 CLEAN USERNAME
      let baseUsername = user.email
        .split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

      let finalUsername = baseUsername;

      const usernameRef = doc(db, "usernames", baseUsername);
      const usernameDoc = await getDoc(usernameRef);

      if (usernameDoc.exists()) {
        if (usernameDoc.data().uid !== user.uid) {

          const randomSuffix = Math.floor(100 + Math.random() * 900);
          finalUsername = `${baseUsername}${randomSuffix}`;

          await setDoc(doc(db, "usernames", finalUsername), {
            uid: user.uid
          });

        }
      } else {
        await setDoc(doc(db, "usernames", finalUsername), {
          uid: user.uid
        });
      }

      // 🔥 SAVE GOOGLE USER DATA
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "",
        email: user.email,
        image: user.photoURL || "",
        uid: user.uid,
        username: finalUsername,
      }, { merge: true });

      console.log("Google Login success:", finalUsername);

      // Google login → check if theme is already set
      const gSnap = await import("firebase/firestore").then(({ doc, getDoc }) =>
        getDoc(doc(db, "users", user.uid))
      );
      const gHasTheme = gSnap.exists() && gSnap.data()?.theme?.layout;
      router.push(gHasTheme ? "/admin/dashboard" : "/admin/setup");

    } catch (err) {
      console.log(err);
      alert("Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xl">

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">NexCard 🔐</h2>
            <p className="text-slate-500 mt-2 text-sm">{isLogin ? "Welcome back" : "Create your digital presence"}</p>
          </div>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-3 border rounded"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 border rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded mb-4"
          >
            {loading ? "Please wait..." : (isLogin ? "Login" : "Sign Up")}
          </button>
          
          <div className="text-center mb-4">
             <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-indigo-600 hover:underline">
               {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
             </button>
          </div>

          <div className="text-center my-3 text-gray-400 text-sm">OR</div>

          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full border py-3 rounded flex justify-center items-center gap-2"
          >
            {googleLoading ? "Loading..." : "Continue with Google"}
          </button>

        </div>
      </motion.div>
    </div>
  );
}