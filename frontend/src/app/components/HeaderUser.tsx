'use client';
import { useSession } from '@/app/hooks/useSession';


export default function HeaderUser() {
  const { user, loading, isAuthenticated } = useSession();

  if (loading) return <span className="text-md">Checking login status...</span>;
  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col items-center justify-center pb-2">
      <p className="text-xl">Hello {user.username}! Your current score is: {user.correctGuesses}</p>
    </div>
  );
}
