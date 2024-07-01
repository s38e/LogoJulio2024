"use client";
import NavBar from "./components/NavBar";
import UploadForm from "./components/UploadForm";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>عنوان التبويبة للصفحة الرئيسية</title>
        <meta name="description" content="وصف الصفحة الرئيسية" />
        <meta property="og:title" content="عنوان Open Graph للصفحة الرئيسية" />
        <meta
          property="og:description"
          content="وصف Open Graph للصفحة الرئيسية"
        />
        <meta
          property="og:image"
          content="رابط صورة Open Graph للصفحة الرئيسية"
        />
      </Head>
      <NavBar />
      <UploadForm />
    </>
  );
}
