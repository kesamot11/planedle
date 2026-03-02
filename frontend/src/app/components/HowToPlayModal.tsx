'use client';

import { useEffect, useState } from 'react';

interface HowToPlayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">How to Play</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl leading-none hover:cursor-pointer"
                    >
                        x
                    </button>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Objective</h3>
                        <p>Guess the airline and aircraft type from the masked letters. You have <strong>6 attempts</strong> for each.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">How Masking Works</h3>
                        <p>At first, only the first letter of the first word is revealed. As you make guesses, more letters are progressively uncovered:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>After 1 guess: first letter of each word</li>
                            <li>After 3 guesses: first and last letter of each word</li>
                            <li>After 5 guesses: every other letter</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Difficulty Levels</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Easy:</strong> Major international airlines</li>
                            <li><strong>Medium:</strong> Regional and less common carriers</li>
                            <li><strong>Hard:</strong> Smaller and specialty airlines</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Scoring</h3>
                        <p>When you correctly guess both the airline and aircraft, your score increases. Compete with others on the leaderboard!</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Tips</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Pay attention to word lengths and revealed letters</li>
                            <li>Hyphens in aircraft names are always visible</li>
                            <li>Use the &quot;New Aircraft&quot; button to get a fresh challenge</li>
                        </ul>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-400 hover:cursor-pointer transition"
                >
                    Got it!
                </button>
            </div>
        </div>
    );
}

export function useHowToPlay() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const seen = localStorage.getItem('planedle-tutorial-seen');
            if (!seen) {
                setIsOpen(true);
            }
        }
    }, []);

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
        if (typeof window !== 'undefined') {
            localStorage.setItem('planedle-tutorial-seen', 'true');
        }
    }

    return { isOpen, open, close };
}
