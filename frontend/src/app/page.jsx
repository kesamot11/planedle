import React from "react";
import AirlineAircraft from "./components/GuessingGame/AirlineAircraft";
import Image from "next/image";

// app/page.tsx
export default function HomePage() {
    return (
      <main>
        <h1 className="flex items-center justify-center text-4xl p-1 gap-4">
          <Image src="/logo-white.png" alt="icon" width={64} height={64} />
          Planedle. Guess the Aircraft!
        </h1>
        <p className="text-center text-2xl pb-4">Can you guess the aircraft in 6 tries?</p>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <AirlineAircraft />
        </div>
      </main>
    );
  }
  