"use client";
import { useEffect, useState } from "react";
import { auth, firestore } from "/src/firebase";
import Image from "next/image";
import Logo from "/public/assets/logo.svg";
import Delete from "/public/assets/delete.svg";
import logout from "/public/assets/logout.svg";
import downloadIcon from "/public/assets/download.svg";
import profile from "/public/assets/profile.svg";
import scale from "/public/assets/scale.svg";
import close from "/public/assets/close.svg";
import addedFeature from "/public/assets/addedFeature.svg";
import addFeature from "/public/assets/addFeature.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

const AdminDashboard = () => {
  const [images, setImages] = useState([]);
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [fullScreenImage, setFullScreenImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    let q = query(collection(firestore, "Logos"));
    if (selectedDay !== "All Days") {
      q = query(q, where("day", "==", selectedDay));
    }
    if (showOnlyFeatured) {
      q = query(q, where("featured", "==", true));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setImages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [selectedDay, showOnlyFeatured]);

  const toggleFeature = async (imageId) => {
    const imageRef = doc(firestore, "Logos", imageId);
    const imageDoc = await getDoc(imageRef);
    if (imageDoc.exists()) {
      const currentFeaturedStatus = imageDoc.data().featured;
      await updateDoc(imageRef, { featured: !currentFeaturedStatus });
      setImages((prevImages) =>
        prevImages.map((image) =>
          image.id === imageId
            ? { ...image, featured: !currentFeaturedStatus }
            : image
        )
      );
    }
  };

  const deleteImage = async (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      const imageRef = doc(firestore, "Logos", imageId);
      await deleteDoc(imageRef);
    }
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleImageClick = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  const handleDownload = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.setAttribute("download", true);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative flex items-start justify-center w-screen overflow-hidden h-dvh ">
      {fullScreenImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-75">
          <button
            onClick={handleCloseFullScreen}
            className="absolute top-4 right-4 aspect-square bg-[rgba(0,0,0,0.5)] backdrop-blur-lg rounded-2xl p-4"
          >
            <Image src={close} alt="Close" className="w-6 h-6" />
          </button>
          <Image
            src={fullScreenImage}
            alt="Full Screen"
            width={1080}
            height={1080}
            className="object-contain w-full h-full"
          />
        </div>
      )}
      <div
        className={`absolute z-50 flex flex-col top-4 left-4 transition-all duration-500 bg-[rgba(255,255,255,0.5)] backdrop-blur-lg aspect-square p-4 items-center justify-center rounded-2xl lg:hidden ${
          menuActive ? "gap-0" : "gap-[6px]"
        }`}
        onClick={toggleMenu}
      >
        <span
          className={`w-6 h-[2px] bg-black transition-all duration-500 ${
            menuActive
              ? "rotate-45 translate-y-[1px]"
              : "rotate-0 translate-y-0"
          }`}
        ></span>
        <span
          className={`w-6 h-[2px] bg-black transition-all duration-500 ${
            menuActive
              ? "-rotate-45 -translate-y-[1px]"
              : "rotate-0 translate-y-0"
          }`}
        ></span>
      </div>
      <div
        className={`absolute inset-0 w-screen z-20 h-dvh bg-[rgba(0,0,0,0.5)] backdrop-blur-lg transition-all duration-500 ${
          menuActive ? "translate-x-0 delay-0" : "-translate-x-full delay-150"
        }`}
      ></div>
      <div
        className={`top-0 left-0 z-40 flex flex-col items-center justify-between h-dvh px-8 py-8 border-r bg-neutral-50 lg:translate-x-0 w-96 fixed lg:relative transition-all duration-500  ${
          menuActive ? "translate-x-0 delay-150" : "-translate-x-full delay-0"
        }`}
      >
        <Link href="/">
          <Image src={Logo} alt="Logo" className="w-auto h-8" />
        </Link>
        <div className="grid w-full grid-cols-2 gap-2">
          <button
            className={`flex-1 w-full col-start-1 col-end-3 px-3 py-2 text-sm text-black transition-all duration-200 rounded-lg hover:bg-green-200 ${
              selectedDay === "All Days"
                ? "bg-green-500 text-white hover:bg-green-500"
                : "bg-neutral-200"
            }`}
            onClick={() => {
              setSelectedDay("All Days");
            }}
          >
            All Days
          </button>
          {Array.from({ length: 20 }, (_, i) => (
            <button
              key={`Day ${String(i + 1).padStart(2, "0")}`}
              className={`flex-1 px-3 py-2 text-sm rounded-lg w-full transition-all duration-200 hover:bg-green-200 ${
                selectedDay === `Day ${String(i + 1).padStart(2, "0")}`
                  ? "bg-green-500 text-white hover:bg-green-500"
                  : "bg-neutral-200"
              }`}
              onClick={() => {
                setSelectedDay(`Day ${String(i + 1).padStart(2, "0")}`);
              }}
            >
              {`Day ${String(i + 1).padStart(2, "0")}`}
            </button>
          ))}
          <button
            className={`flex-1 w-full col-start-1 col-end-3 px-3 py-2 text-sm text-black transition-all duration-200 rounded-lg hover:bg-green-200 ${
              showOnlyFeatured
                ? "bg-green-500 text-white hover:bg-green-500"
                : "bg-neutral-200"
            }`}
            onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
          >
            Featured Logos
          </button>
        </div>
        <button
          className="flex items-center justify-between w-full gap-2 px-2 py-1 text-sm font-medium text-black transition-all duration-300 bg-white border rounded-lg hover:bg-neutral-100"
          onClick={() => signOut(auth)}
        >
          Logout <Image src={logout} alt="Logout" className="w-4 h-4 " />
        </button>
      </div>
      <div
        className={`flex flex-col items-center flex-1 w-full h-full gap-4 py-8 overflow-y-scroll ${
          images.length === 0 ? "justify-center" : "justify-start"
        }`}
      >
        {images.length === 0 ? (
          <p className="text-lg font-medium text-center text-black">
            There are no logos yet!
          </p>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 px-4 md:px-8 md:grid-cols-2 2xl:grid-cols-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative w-full h-full overflow-hidden border rounded-2xl"
              >
                <Link
                  href={image.socialAcountLink}
                  target="_blank"
                  className="absolute top-0 left-0 z-10  items-center justify-center w-full h-full text-white transition-all duration-300 bg-[rgba(0,0,0,0.5)] backdrop-blur-lg opacity-0 hover:opacity-100 hidden md:flex"
                >
                  Visit Profile
                </Link>
                <div
                  className="px-4 py-2 leading-none bg-[rgba(255,255,255,0.5)] rounded-xl backdrop-blur-lg cursor-pointer inline-block top-2 right-2 absolute z-10 border border-neutral-300 md:hover:scale-110 transition-all duration-300"
                  onClick={() => handleImageClick(image.url)}
                >
                  <Image
                    src={scale}
                    alt="scale"
                    className="w-auto h-4 pointer-events-none"
                  />
                </div>
                <div
                  className={`absolute flex items-center w-[calc(100% - 32px)] bottom-2 left-2 right-2 z-10 ${
                    selectedDay === "All Days" || !showOnlyFeatured
                      ? "justify-between"
                      : " justify-end"
                  }`}
                >
                  <p
                    className={`px-4 h-full py-2 text-xs leading-none text-neutral-300 bg-[rgba(255,255,255,0.5)] rounded-xl backdrop-blur-lg inline-block border border-neutral-300 ${
                      selectedDay === "All Days" || !showOnlyFeatured
                        ? ""
                        : "hidden"
                    }`}
                  >
                    {image.day}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={image.socialAcountLink}
                      className="px-4 py-2 leading-none bg-[rgba(255,255,255,0.5)] rounded-xl backdrop-blur-lg cursor-pointer inline-block md:hidden border border-neutral-300"
                    >
                      <Image
                        src={profile}
                        alt="Profile"
                        className="w-auto h-4 pointer-events-none"
                      />
                    </Link>
                    <div
                      className="px-4 py-2 leading-none bg-[rgba(255,255,255,0.5)] rounded-xl backdrop-blur-lg inline-block cursor-pointer transition-all border duration-300 md:hover:scale-110 border-neutral-300"
                      onClick={() => deleteImage(image.id)}
                    >
                      <Image
                        src={Delete}
                        alt="Delete"
                        className="w-auto h-4 pointer-events-none"
                      />
                    </div>
                    <div
                      className="px-4 py-2 leading-none bg-[rgba(255,255,255,0.5)] rounded-xl backdrop-blur-lg inline-block cursor-pointer transition-all border duration-300 md:hover:scale-110 border-neutral-300"
                      onClick={() => handleDownload(image.aiUrl)}
                    >
                      <Image
                        src={downloadIcon}
                        alt="Download"
                        className="w-auto h-4 pointer-events-none"
                      />
                    </div>
                    <div
                      className="px-4 py-2 leading-none bg-[rgba(255,255,255,0.5)] rounded-xl backdrop-blur-lg inline-block cursor-pointer transition-all border duration-300 md:hover:scale-110 border-neutral-300"
                      onClick={() => toggleFeature(image.id)}
                    >
                      <Image
                        src={image.featured ? addedFeature : addFeature}
                        alt={image.featured ? "Remove Feature" : "Add Feature"}
                        className="w-auto h-4 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
                <Image
                  src={image.url}
                  alt={`Logo ${image.day}`}
                  width={1080}
                  height={1080}
                  // quality={100}
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
