'use client';
import { SessionProvider } from '@/app/hooks/useSession';

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
