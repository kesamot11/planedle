import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { safeGet } from "../utils/localStorage";
import { fetchRandomAircraft } from "../api/airlineAircraftApi";
import { AircraftData } from "@/app/types";

export default function useAircraft(
  difficulty: string = 'easy'
): [AircraftData | null, Dispatch<SetStateAction<AircraftData | null>>] {
  const [aircraft, setAircraft] = useState<AircraftData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = safeGet('aircraft') as AircraftData | null;
    if (
      stored?.airline &&
      stored?.aircraft &&
      stored?.difficulty?.toLowerCase() === difficulty.toLowerCase()
    ) {
      setAircraft(stored);
    } else {
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
          }
        })
        .catch(err => console.error("Fetch failed:", err));
    }
  }, [difficulty]);

  return [aircraft, setAircraft];
}
