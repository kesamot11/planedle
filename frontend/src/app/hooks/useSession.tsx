'use client';
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

type UserDTO = { id: number; username: string; email: string; correctGuesses: number };

type SessionCtx = {
  user: UserDTO | null;
  setUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
  loading: boolean;
  isAuthenticated: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const SessionContext = createContext<SessionCtx | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/me', { method: 'GET', cache: 'no-store', credentials: 'include' });
      if (res.ok) setUser(await res.json());
      else setUser(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      await refresh();
      if (!alive) return;
    })();
    return () => { alive = false; };
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include', cache: 'no-store' });
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, [refresh]);

  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({ user, setUser, loading, isAuthenticated, refresh, logout }),
    [user, loading, isAuthenticated, refresh, logout]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}
