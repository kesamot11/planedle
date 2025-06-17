import { useState, useEffect } from 'react';
import { safeGet } from '../utils/localStorage';

export default function useDifficulty() {
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
