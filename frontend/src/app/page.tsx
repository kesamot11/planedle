"use client";

import React from "react";
import Image from "next/image";
import HeaderUser from "./components/HeaderUser";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";

// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1 className="flex items-center justify-center text-4xl p-1 gap-4">
        <Image src="/logo-white.png" alt="icon" width={64} height={64} />
        Planedle. Guess the Aircraft!
      </h1>
      <p className="text-center text-2xl pb-4">Can you guess the aircraft in 6 tries?</p>
      <HeaderUser />
      <MainPage />
    </main>
  );
}
