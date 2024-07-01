"use client";
import { useEffect, useState } from "react";
import { auth, firestore } from "@/firebase";
import Image from "next/image";
import Logo from "/public/assets/logo.svg";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminDashboard = () => {
  const [images, setImages] = useState([]);
  const [selectedDay, setSelectedDay] = useState("All Days");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        let q = collection(firestore, "images");

        // Filter by selected day if selectedDay is set and not "All Days"
        if (selectedDay && selectedDay !== "All Days") {
          q = query(q, where("day", "==", selectedDay));
        } else {
          q = query(q, orderBy("createdAt", "desc"));
        }

        const unsubscribeImages = onSnapshot(q, (snapshot) => {
          const imagesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setImages(imagesData);
        });

        return () => unsubscribeImages();
      }
    });

    return () => unsubscribe();
  }, [router, selectedDay]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDaySelect = (day) => {
    console.log("Selected Day:", day); // سجل التصحيح

    setSelectedDay(day);
  };

  return (
    <div className="flex items-start justify-center w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-between h-screen px-8 py-8 border-r bg-neutral-50 w-96">
        <Link href="/">
          <Image src={Logo} alt="Logo" />
        </Link>
        <div className="grid w-full grid-cols-2 gap-2">
          <button
            key="All Days"
            className={`flex-1 px-3 py-2 text-sm rounded-lg w-full transition-all duration-200 col-start-1 col-end-3 ${
              selectedDay === "All Days"
                ? "bg-green-500 text-white"
                : "bg-neutral-200 text-black"
            }`}
            onClick={() => handleDaySelect("All Days")}
          >
            All Days
          </button>
          {Array.from({ length: 20 }, (_, i) => (
            <button
              key={`Day ${String(i + 1).padStart(2, "0")}`}
              className={`flex-1 px-3 py-2 text-sm rounded-lg w-full transition-all duration-200 ${
                selectedDay === `Day ${String(i + 1).padStart(2, "0")}`
                  ? "bg-green-500 text-white"
                  : "bg-neutral-200 text-black"
              }`}
              onClick={() =>
                handleDaySelect(`Day ${String(i + 1).padStart(2, "0")}`)
              }
            >
              {`Day ${String(i + 1).padStart(2, "0")}`}
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm text-black rounded-lg bg-neutral-200"
        >
          Logout
        </button>
      </div>
      <div
        className={`flex flex-col items-center justify-start flex-1 w-full h-full gap-4 py-8 overflow-y-scroll ${
          images.length === 0 ? "justify-center" : ""
        }`}
      >
        {images.length === 0 ? (
          <div className="text-xl">There are no logos yet!</div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative w-full h-full overflow-hidden rounded-lg"
              >
                <Link
                  href={image.socialAcountLink}
                  target="_blank"
                  className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full text-white transition-all duration-300 bg-[rgba(0,0,0,0.5)] backdrop-blur-lg opacity-0 hover:opacity-100"
                >
                  Visit Profile
                </Link>
                <Image
                  src={image.url}
                  alt={`Uploaded ${image.id}`}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full aspect-square"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
