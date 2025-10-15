export async function getBestUsers() {
    const res = await fetch('/api/top-users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!res.ok) throw new Error('Failed to get the best users');
    return res.json();
  }
  