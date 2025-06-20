import { useState, useEffect } from 'react';

export default function useGuess(correctValue, onCorrect = () => {}, gameId ) {
  const [guesses, setGuesses] = useState([]);
  const [status, setStatus] = useState(null); // 'true', 'false', 'limit-reached'
  const [available, setAvailable] = useState(true);
  const [guessed, setGuessed] = useState(false);

  useEffect(() => {
    setGuesses([]);
    setStatus(null);
    setAvailable(true);
    setGuessed(false);
  }, [gameId]);

  const check = (guess) => {
    const isCorrect = guess.trim().toLowerCase() === correctValue.toLowerCase();

    if (isCorrect) {
      setStatus('true');
      setAvailable(false);
      onCorrect(); // triggers confetti
    } else {
      const updated = [...guesses, guess];
      setGuesses(updated);
      if (updated.length > 5) {
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
