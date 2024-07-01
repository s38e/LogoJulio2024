// components/UploadForm.js

import { useState } from "react";
import { storage, firestore } from "/src/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import upload from "/public/assets/upload.svg";
import Select from "react-select"; // Import React Select library

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null); // State to track selected day
  const [socialAcountLink, setSocialAcountLink] = useState(""); // State to track Facebook link
  const router = useRouter();

  const daysOptions = [
    { value: "Day 01", label: "Day 01" },
    { value: "Day 02", label: "Day 02" },
    { value: "Day 03", label: "Day 03" },
    { value: "Day 04", label: "Day 04" },
    { value: "Day 05", label: "Day 05" },
    { value: "Day 06", label: "Day 06" },
    { value: "Day 07", label: "Day 07" },
    { value: "Day 08", label: "Day 08" },
    { value: "Day 09", label: "Day 09" },
    { value: "Day 10", label: "Day 10" },
    { value: "Day 11", label: "Day 11" },
    { value: "Day 12", label: "Day 12" },
    { value: "Day 13", label: "Day 13" },
    { value: "Day 14", label: "Day 14" },
    { value: "Day 15", label: "Day 15" },
    { value: "Day 16", label: "Day 16" },
    { value: "Day 17", label: "Day 17" },
    { value: "Day 18", label: "Day 18" },
    { value: "Day 19", label: "Day 19" },
    { value: "Day 20", label: "Day 20" },
    // Add more day options as needed
  ];

  const handleUpload = async () => {
    if (file && selectedDay && socialAcountLink) {
      try {
        setUploading(true);
        setUploadError("");
        setUploadSuccess(false);

        const storageRef = ref(storage, file.name);
        await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(storageRef);

        const imagesCollectionRef = collection(firestore, "images");
        await addDoc(imagesCollectionRef, {
          url: fileUrl,
          createdAt: serverTimestamp(),
          day: selectedDay.value, // Save selected day value with the image
          socialAcountLink, // Save Facebook link with the image
        });

        setFile(null); // Reset file state after successful upload
        setSelectedDay(null); // Reset selected day state after successful upload
        setSocialAcountLink(""); // Reset Facebook link state after successful upload
        setUploading(false);
        setUploadSuccess(true);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadError("Error uploading file: " + error.message);
        setUploading(false);
      }
    } else {
      setUploadError("Please select a file, a day, and enter a Facebook link.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <div className="flex flex-col items-start w-full max-w-lg gap-1 mb-8">
        <h1 className="text-2xl font-medium">Upload your wonderful logo</h1>
        <p className="text-sm text-[#64748b]">
          Uploading your logo here gives you a great chance of being seen by the
          judging panel
        </p>
      </div>
      <div className="flex flex-col w-full max-w-lg gap-4">
        <input
          className="w-full px-3 py-2 border border-gray-100 rounded-lg file-input file-input-bordered "
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <Select
          className="mt-2 rounded-sm"
          options={daysOptions}
          value={selectedDay}
          onChange={(selectedOption) => setSelectedDay(selectedOption)}
          placeholder="Select Day"
          isDisabled={uploading}
        />
        <input
          className="w-full px-3 py-2 border border-gray-100 rounded-lg outline-none file-input file-input-bordered"
          type="text"
          placeholder="Enter Social Profile Link"
          value={socialAcountLink}
          onChange={(e) => setSocialAcountLink(e.target.value)}
          disabled={uploading}
        />
        <button
          className="flex items-center justify-center w-full gap-2 px-3 py-2 text-white transition-all duration-300 bg-black rounded-lg cursor-pointer disabled:cursor-not-allowed hover:bg-neutral-800"
          onClick={handleUpload}
          disabled={!file || !selectedDay || !socialAcountLink || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}{" "}
          <Image src={upload} alt="upload" width={20} height={20} />
        </button>
      </div>
      {uploadSuccess && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 bg-neutral-800">
          <div className="flex flex-col items-center gap-8 p-8 bg-white rounded-lg">
            <h2 className="flex flex-col items-center text-2xl font-medium text-green-600">
              Uploaded successfully!
            </h2>
            <button
              onClick={() => {
                setUploadSuccess(false);
                router.replace(router.asPath); // Reload to refresh image list
              }}
              className="w-full px-3 py-2 text-white bg-black rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 bg-neutral-800">
          <div className="flex flex-col items-center gap-2 p-8 bg-white rounded-lg">
            <h2 className="text-2xl font-bold text-red-600">
              Error Uploading!
            </h2>
            <p className="text-red-600">{uploadError}</p>
            <button
              onClick={() => setUploadError("")}
              className="w-full px-3 py-2 mt-4 text-white bg-black rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
