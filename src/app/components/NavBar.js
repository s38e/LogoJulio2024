import Image from "next/image";
import React from "react";
import logo from "/public/assets/logo.svg";
import Thunderbolt from "/public/assets/Thunderbolt.svg";
import Link from "next/link";

function NavBar() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-between w-full px-4 py-4 sm:px-8">
      <Link href="/">
        <Image src={logo} alt="Logo" />
      </Link>
      <div className="flex items-center justify-center gap-3">
        <Link
          href="/inspiration"
          className="flex items-center gap-2 px-2 py-1 text-sm transition-all duration-200 border rounded-md border-neutral-300 hover:bg-neutral-50"
        >
          Inspiration{" "}
          <Image src={Thunderbolt} alt="Thunderbolt" className="w-4 h-4" />
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center gap-2 px-2 py-1 text-sm transition-all duration-200 border rounded-md border-neutral-300 hover:bg-neutral-50"
        >
          Login{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-all lucide lucide-arrow-right group-hover:translate-x-1"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
