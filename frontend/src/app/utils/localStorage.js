export function safeGet(key) {
  try {
    const value = localStorage.getItem(key);
    if (value && /^[{\["]/.test(value.trim())) {
      return JSON.parse(value);
    }
    return value;
  } catch (e) {
    console.error("safeGet error:", e);
    return null;
  }
}
