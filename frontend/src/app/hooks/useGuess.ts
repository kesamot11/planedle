import { useState, useEffect } from 'react';
import { GuessStatus, GuessState } from '@/app/types';

const MAX_GUESSES = 6;

export default function useGuess(
  correctValue: string | undefined,
  onCorrect: () => void = () => {},
  gameId: number
): GuessState {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<GuessStatus>(null);
  const [available, setAvailable] = useState(true);
  const [guessed, setGuessed] = useState(false);

  useEffect(() => {
    setGuesses([]);
    setStatus(null);
    setAvailable(true);
    setGuessed(false);
  }, [gameId]);

  const check = (guess: string) => {
    if (!correctValue) return;

    const isCorrect = guess.trim().toLowerCase() === correctValue.toLowerCase();

    if (isCorrect) {
      setStatus('true');
      setAvailable(false);
      onCorrect();
    } else {
      const updated = [...guesses, guess];
      setGuesses(updated);
      if (updated.length >= MAX_GUESSES) {
        setStatus('limit-reached');
        setAvailable(false);
      } else {
        setStatus('false');
      }
    }

    setGuessed(true);
  };

  return { guesses, status, check, available, guessed };
}
