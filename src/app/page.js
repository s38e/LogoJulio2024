"use client";
import NavBar from "./components/NavBar";
import UploadForm from "./components/UploadForm";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <NavBar />
      <UploadForm />
    </>
  );
}
