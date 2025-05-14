export function safeGet(key) {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
}
