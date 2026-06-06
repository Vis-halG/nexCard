'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { User, Lock, ArrowRight, ShieldCheck, Sparkles, KeyRound } from "lucide-react";

export default function AdminPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }

    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email! Check your inbox.");
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setResetLoading(false);
    }
  };

  const handleAuth = async () => {
    try {
      if (!email || !password) {
        alert("Enter email & password");
        return;
      }

      setLoading(true);

      if (isLogin) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          router.push("/admin/dashboard");
        } catch (err) {
          console.log(err);
          if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
            alert("Invalid credentials. Please check your email and password, or Sign Up.");
          } else {
            alert("Login failed: " + err.message);
          }
        }
      } else {
        try {
          // Derive a username from the email for the public URL
          let cleanUsername = email.trim().toLowerCase().split("@")[0].replace(/[^a-z0-9]/g, "");

          // Check if username is already taken by someone else
          const usernameRef = doc(db, "usernames", cleanUsername);
          const usernameSnap = await getDoc(usernameRef);

          if (usernameSnap.exists()) {
            // Append some random digits if common username is taken
            cleanUsername = `${cleanUsername}${Math.floor(100 + Math.random() * 900)}`;
          }

          const newUser = await createUserWithEmailAndPassword(auth, email, password);
          const uid = newUser.user.uid;

          // 🔥 username mapping
          await setDoc(doc(db, "usernames", cleanUsername), {
            uid
          });

          // 🔥 save user data with default theme
          await setDoc(doc(db, "users", uid), {
            username: cleanUsername,
            email,
            uid,
            theme: {
              layout: "modern",
              primary: "#4f46e5",
              background: "#f8fafc"
            }
          });

          router.push("/admin/dashboard");
        } catch (err) {
          console.log(err);
          if (err.code === 'auth/email-already-in-use') {
            alert("This email is already registered.");
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
          await setDoc(doc(db, "usernames", finalUsername), { uid: user.uid });
        }
      } else {
        await setDoc(doc(db, "usernames", finalUsername), { uid: user.uid });
      }

      // Check if user already has a theme
      const gSnap = await getDoc(doc(db, "users", user.uid));
      const gHasTheme = gSnap.exists() && gSnap.data()?.theme?.layout;

      const googleUserData = {
        name: user.displayName || "",
        email: user.email,
        image: user.photoURL || "",
        uid: user.uid,
        username: finalUsername,
      };

      if (!gHasTheme) {
        googleUserData.theme = {
          layout: "modern",
          primary: "#4f46e5",
          background: "#f8fafc"
        };
      }

      // 🔥 SAVE GOOGLE USER DATA
      await setDoc(doc(db, "users", user.uid), googleUserData, { merge: true });

      router.push("/admin/dashboard");

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
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">NexCard Portal</h2>
            <p className="text-slate-500 mt-2 text-sm">{isLogin ? "Sign in to manage your card" : "Create your professional account"}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                {isLogin && (
                  <button
                    onClick={handleResetPassword}
                    disabled={resetLoading}
                    className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {resetLoading ? "Sending..." : "Forgot Password?"}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleAuth}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="text-center mt-6">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              {isLogin ? "New to NexCard? Register here" : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-slate-100"></div>
            <div className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Entry</div>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl border border-slate-200 transition-all flex justify-center items-center gap-3 shadow-sm active:scale-[0.98]"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin" />
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                Continue with Google
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}