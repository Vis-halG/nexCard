import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFSqYPS2AG4ljN2YXRyWwEV3-DvpS6q0U",
  authDomain: "flexcard-ff8ec.firebaseapp.com",
  projectId: "flexcard-ff8ec",
  storageBucket: "flexcard-ff8ec.appspot.com",
  messagingSenderId: "447761555985",
  appId: "1:447761555985:web:633893f8ef93a7168507b0",
  measurementId: "G-9Z08JQF600"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const targetEmail = "vishalgupta25980@gmail.com";
const targetUsername = "vishalgupta25980";

const dummyProfile = {
  name: "Vishal Gupta",
  title: "Founder & Lead Engineer",
  company: "NexCard Corporation",
  phone: "+91 98765 43210",
  email: targetEmail,
  about: "Building the next generation of digital networking tools. Expert in Full Stack Development, Next.js, React, Node.js, and Cloud Infrastructure.",
  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  address: "Mumbai, Maharashtra, India",
  website: "https://nexcard.app",
  social: {
    instagram: "https://instagram.com/vishalgupta25980",
    linkedin: "https://linkedin.com/in/vishalgupta25980",
    twitter: "https://twitter.com/vishalgupta25980",
    youtube: "https://youtube.com/c/vishalgupta25980"
  },
  services: [
    "Full-Stack Web Development",
    "Next.js & React Applications",
    "Cloud Architecture & DevOps",
    "Mobile Responsive UI/UX Design"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=500&auto=format&fit=crop",
  ],
  customLinks: [
    { title: "View Portfolio Website", url: "https://nexcard.app" },
    { title: "Book a 1-on-1 Consultation", url: "https://calendly.com" }
  ],
  payment: {
    upi: "vishalgupta25980@okaxis",
    bankDetails: "State Bank of India\nAccount: 12345678901\nIFSC: SBIN0001234",
    link: "https://paytm.me"
  },
  gstNumber: "27AAAAA1111A1Z1",
  theme: {
    layout: "modern",
    primary: "#6366F1",
    background: "#F8FAFC"
  },
  username: targetUsername
};

async function run() {
  try {
    console.log(`Searching for user doc with email: ${targetEmail}...`);
    const q = query(collection(db, "users"), where("email", "==", targetEmail));
    const querySnap = await getDocs(q);

    let uid = null;
    if (!querySnap.empty) {
      uid = querySnap.docs[0].id;
      console.log(`Found existing user with UID: ${uid}`);
      // Merge/update profile
      await setDoc(doc(db, "users", uid), { ...dummyProfile, uid }, { merge: true });
      console.log("Updated existing user profile document successfully.");
    } else {
      uid = "vishalgupta25980_uid";
      console.log(`No existing user found. Creating profile with default UID: ${uid}`);
      await setDoc(doc(db, "users", uid), { ...dummyProfile, uid });
      console.log("Created new user profile document successfully.");
    }

    // Map username to UID
    console.log(`Mapping username '${targetUsername}' to UID: ${uid}...`);
    await setDoc(doc(db, "usernames", targetUsername), { uid });
    console.log("Username mapping saved successfully.");

    console.log("Populate process completed successfully!");
  } catch (error) {
    console.error("Error populating database:", error);
  }
}

run();
