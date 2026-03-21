'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FlexCard from "../components/flexCard";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";



export default function Page() {
  const [data, setData] = useState(null);
  const params = useParams(); // ✅ correct way
  const username = params?.username;

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      const docRef = doc(db, "users", username);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [username]);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return <FlexCard data={data} />;
}