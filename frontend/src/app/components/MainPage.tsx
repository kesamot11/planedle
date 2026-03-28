'use client';

import { useState } from 'react';
import TopUsers from "./TopUsers"
import AirlineAircraft from "./GuessingGame/AirlineAircraft"
import { GameMode } from '@/app/types';

export default function MainPage() {
    const [mode, setMode] = useState<GameMode>('daily');

    return (
        <div className="min-h-screen bg-gray-100 pt-10 pb-10 px-4">
            <div className="flex gap-2 justify-center mb-6">
                <button
                    onClick={() => setMode('daily')}
                    className={`px-4 py-2 rounded font-semibold border hover:cursor-pointer transition ${
                        mode === 'daily'
                            ? 'bg-blue-500 text-white hover:bg-blue-400'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    Daily Challenge
                </button>
                <button
                    onClick={() => setMode('practice')}
                    className={`px-4 py-2 rounded font-semibold border hover:cursor-pointer transition ${
                        mode === 'practice'
                            ? 'bg-blue-500 text-white hover:bg-blue-400'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    Practice
                </button>
            </div>

            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

                <div className="hidden lg:block lg:col-span-1"></div>

                <div className="lg:col-span-2 flex flex-col items-center">
                    <AirlineAircraft mode={mode} />
                </div>

                <div className="lg:col-span-1 flex justify-center lg:justify-start lg:pt-32">
                    <div className="w-full max-w-sm sticky">
                        <TopUsers />
                    </div>
                </div>

            </div>
        </div>
    )
}
