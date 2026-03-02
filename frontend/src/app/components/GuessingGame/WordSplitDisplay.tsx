import { GuessStatus } from '@/app/types';

interface WordSplitDisplayProps {
    word: string;
    correct: GuessStatus;
    guessCount?: number;
}

function shouldRevealChar(
    char: string,
    wordIndex: number,
    charIndex: number,
    wordLength: number,
    guessCount: number,
    isFinished: boolean,
): boolean {
    // Always reveal when game is over
    if (isFinished) return true;

    // Always reveal hyphens
    if (char === '-') return true;

    // Level 0 (0 guesses): first letter of first word only
    if (wordIndex === 0 && charIndex === 0) return true;

    // Level 1 (1-2 guesses): first letter of EACH word
    if (guessCount >= 1 && charIndex === 0) return true;

    // Level 2 (3-4 guesses): first AND last letter of each word
    if (guessCount >= 3 && charIndex === wordLength - 1) return true;

    // Level 3 (5+ guesses): every other letter
    if (guessCount >= 5 && charIndex % 2 === 0) return true;

    return false;
}

export default function WordSplitDisplay({ word, correct, guessCount = 0 }: WordSplitDisplayProps) {
    const words = word.split(' ');
    const isFinished = correct === 'true' || correct === 'limit-reached';

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-3">
            {words.map((wordSegment, wordIndex) => (
                <div key={wordIndex} className="flex gap-1">
                    {wordSegment.split('').map((char, index) => {
                        const reveal = shouldRevealChar(
                            char, wordIndex, index, wordSegment.length, guessCount, isFinished
                        );

                        const displayChar = reveal ? char : '';

                        const classes = [
                            'w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 text-white flex items-center justify-center font-bold rounded',
                            correct === 'true' ? 'bg-green-500' : '',
                            correct === 'limit-reached' ? 'bg-red-500' : '',
                        ].join(' ');

                        return (
                            <div key={index} className={classes}>
                                {displayChar}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
