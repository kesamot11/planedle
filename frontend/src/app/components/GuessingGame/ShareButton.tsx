'use client';

import { useState } from 'react';

interface ShareButtonProps {
    airlineGuesses: number;
    aircraftGuesses: number;
    airlineWon: boolean;
    aircraftWon: boolean;
    difficulty: string;
}

export default function ShareButton({
    airlineGuesses,
    aircraftGuesses,
    airlineWon,
    aircraftWon,
    difficulty,
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    function generateShareText(): string {
        const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        const airlineResult = airlineWon ? `${airlineGuesses}/6` : 'X/6';
        const aircraftResult = aircraftWon ? `${aircraftGuesses}/6` : 'X/6';

        const lines = [
            `Planedle (${diffLabel})`,
            `Airline: ${airlineResult} ${airlineWon ? 'v' : 'x'}`,
            `Aircraft: ${aircraftResult} ${aircraftWon ? 'v' : 'x'}`,
        ];

        return lines.join('\n');
    }

    async function handleShare() {
        const text = generateShareText();
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    return (
        <button
            onClick={handleShare}
            className="px-6 py-2 mt-4 rounded font-semibold border hover:cursor-pointer bg-green-500 text-white hover:bg-green-400 transition"
        >
            {copied ? 'Copied!' : 'Share Results'}
        </button>
    );
}
