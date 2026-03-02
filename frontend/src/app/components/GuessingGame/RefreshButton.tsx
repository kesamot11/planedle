import React, { Dispatch, SetStateAction } from "react";
import { fetchRandomAircraft } from "../../api/airlineAircraftApi";
import { AircraftData } from "@/app/types";

interface RefreshButtonProps {
    difficulty: string;
    setAircraft: Dispatch<SetStateAction<AircraftData | null>>;
    setGameId: Dispatch<SetStateAction<number>>;
}

export default function RefreshButton({ difficulty, setAircraft, setGameId }: RefreshButtonProps) {
    return (
        <button
            className="px-4 py-2 mb-5 rounded font-semibold border hover:cursor-pointer hover:bg-blue-400 bg-blue-500 text-white"
            onClick={() => {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('aircraft');
                    fetchRandomAircraft(difficulty)
                        .then(data => {
                            if (data?.airline && data?.aircraft) {
                                const full: AircraftData = {
                                    airline: data.airline,
                                    aircraft: data.aircraft,
                                    difficulty
                                };
                                setAircraft(full);
                                localStorage.setItem('aircraft', JSON.stringify(full));
                                setGameId(prev => prev + 1);
                            }
                        })
                        .catch(err => console.error("Error fetching aircraft:", err));
                }
            }}
        >
            <span className="material-icons">New Aircraft</span>
        </button>
    );
}
