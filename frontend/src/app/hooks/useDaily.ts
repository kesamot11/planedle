import { useEffect, useState, Dispatch, SetStateAction, useCallback } from 'react';
import { fetchDailyAircraft } from '../api/airlineAircraftApi';
import { AircraftData, DailyResult } from '@/app/types';

function getTodayKey(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `planedle-daily-${year}-${month}-${day}`;
}

function getSavedResult(): DailyResult | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(getTodayKey());
        if (raw) return JSON.parse(raw);
    } catch {
        // ignore
    }
    return null;
}

// Days since an arbitrary launch date (2026-03-01) for "Daily #N" numbering
const LAUNCH_EPOCH = new Date('2026-03-01').getTime();

export function getDailyNumber(): number {
    const now = new Date();
    const diff = now.getTime() - LAUNCH_EPOCH;
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

export default function useDaily(): {
    aircraft: AircraftData | null;
    setAircraft: Dispatch<SetStateAction<AircraftData | null>>;
    completed: DailyResult | null;
    markCompleted: (result: Omit<DailyResult, 'date'>) => void;
} {
    const [aircraft, setAircraft] = useState<AircraftData | null>(null);
    const [completed, setCompleted] = useState<DailyResult | null>(null);

    useEffect(() => {
        // Check if already completed today
        const saved = getSavedResult();
        if (saved) {
            setCompleted(saved);
        }

        // Always fetch daily aircraft (needed even if completed, to show the answer)
        fetchDailyAircraft()
            .then(data => {
                if (data?.airline && data?.aircraft) {
                    setAircraft({
                        airline: data.airline,
                        aircraft: data.aircraft,
                        difficulty: 'medium',
                    });
                }
            })
            .catch(err => console.error('Failed to fetch daily aircraft:', err));
    }, []);

    const markCompleted = useCallback((result: Omit<DailyResult, 'date'>) => {
        const todayKey = getTodayKey();
        const fullResult: DailyResult = {
            ...result,
            date: todayKey,
        };
        localStorage.setItem(todayKey, JSON.stringify(fullResult));
        setCompleted(fullResult);
    }, []);

    return { aircraft, setAircraft, completed, markCompleted };
}
