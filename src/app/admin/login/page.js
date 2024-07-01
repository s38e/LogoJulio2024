"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/src/firebase";
import arrow from "/public/assets/arrow.svg";
import Logo from "/public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to manage error message
  const [focusPassword, setfocusPassword] = useState(false);
  const [focusEmail, setfocusEmail] = useState(false);
  const [typeWhenError, setTypeWhenError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/admin/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // لا داعي لتوجيه هنا بما أن useEffect سيتم التحقق من الدخول وتوجيه المستخدم تلقائيا
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("You do not have permission to log in!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <div className="flex flex-col items-start w-full max-w-lg">
        <Link href="/" className="mb-16">
          <Image src={Logo} alt="Logo" className="h-auto w-44" />
        </Link>
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-[#64748b]">
          Enter your email and password below to log in to your account
        </p>
      </div>
      <form
        className="flex flex-col items-start justify-center w-full max-w-lg gap-4"
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`w-full px-3 py-2 text-sm border rounded-lg outline-none ${
            error
              ? "border-red-500"
              : focusEmail
              ? "border-neutral-500"
              : "border-neutral-300"
          }`}
          onFocus={() => setfocusEmail(true)}
          onBlur={() => setfocusEmail(false)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className={`w-full px-3 py-2 text-sm border rounded-lg outline-none ${
            error
              ? "border-red-500"
              : focusPassword
              ? "border-neutral-500"
              : "border-neutral-300"
          }`}
          onFocus={() => setfocusPassword(true)}
          onBlur={() => setfocusPassword(false)}
        />

        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={!email || !password}
          className="flex items-center justify-center w-full gap-2 px-3 py-2 text-white transition-all duration-300 bg-black rounded-lg cursor-pointer group disabled:cursor-not-allowed hover:bg-neutral-800"
        >
          Login{" "}
          <Image
            src={arrow}
            alt="arrow"
            width={15}
            height={15}
            className="transition-all duration-300 group-hover:translate-x-2"
          />
        </button>
      </form>
    </div>
  );
}
// import { useState } from "react";
// import { auth, firestore } from "@/firebase";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// export default function SignUp() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordAgain, setPasswordAgain] = useState("");
//   const router = useRouter();

//   const signup = () => {
//     createUserWithEmailAndPassword(auth, email, password);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
//       <div className="flex flex-col items-start w-full max-w-lg">
//         <h1 className="text-2xl font-medium">Create an Account</h1>
//         <p className="text-sm text-[#64748b]">
//           Please fill in the following details to create your account
//         </p>
//       </div>
//       <form className="flex flex-col items-center justify-center w-full max-w-lg gap-4">
//         <input
//           id="email"
//           name="email"
//           type="email"
//           autoComplete="email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full px-3 py-2 border rounded-lg outline-none border-neutral-300 bg-neutral-100"
//         />
//         <input
//           id="password"
//           name="password"
//           type="password"
//           autoComplete="current-password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full px-3 py-2 border rounded-lg outline-none border-neutral-300 bg-neutral-100"
//         />
//         <input
//           id="passwordAgain"
//           name="passwordAgain"
//           type="password"
//           autoComplete="current-password"
//           onChange={(e) => setPasswordAgain(e.target.value)}
//           required
//           className="w-full px-3 py-2 border rounded-lg outline-none border-neutral-300 bg-neutral-100"
//         />
//         <button
//           disabled={
//             !email || !password || !passwordAgain || password !== passwordAgain
//           }
//           onClick={() => signup()}
//           className="w-full px-3 py-2 text-white bg-black rounded-lg"
//         >
//           Create Account
//         </button>
//       </form>
//     </div>
//   );
// }
