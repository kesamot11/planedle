import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { safeGet } from '../utils/localStorage';

export default function useDifficulty(): [string, Dispatch<SetStateAction<string>>] {
  const [difficulty, setDifficulty] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = safeGet('difficulty');
      if (stored && typeof stored === 'string') {
        return stored.toLowerCase();
      }
    }
    return 'easy';
  });

  useEffect(() => {
    localStorage.setItem('difficulty', difficulty);
  }, [difficulty]);

  return [difficulty, setDifficulty];
}
