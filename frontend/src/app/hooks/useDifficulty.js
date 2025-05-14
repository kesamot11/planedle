import { useState, useEffect } from 'react';
import { safeGet } from '../utils/localStorage';

export default function useDifficulty() {
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? safeGet('difficulty') : null;
    if (stored) setDifficulty(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('difficulty', difficulty);
  }, [difficulty]);

  return [difficulty, setDifficulty];
}
