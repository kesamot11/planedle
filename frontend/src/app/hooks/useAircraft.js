import { useEffect, useState } from "react";
import { safeGet } from "../utils/localStorage";
import { fetchRandomAircraft } from "../api/airlineAircraftApi";

export default function useAircraft(difficulty = 'easy') {
    const [aircraft, setAircraft] = useState(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = safeGet('aircraft');
        console.log('📦 Checking localStorage:', stored);
        console.log('🔍 Difficulty:', difficulty);
        console.log('🔍 Stored difficulty:', stored?.difficulty);
        console.log('🔍 Stored airline:', stored?.airline);
        console.log('🔍 Stored aircraft:', stored?.aircraft);
        // fetch if no aircraft is stored OR difficulty mismatches
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
                        const full = {
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
