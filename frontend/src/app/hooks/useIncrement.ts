export async function incrementGuesses(id: number) {
    const res = await fetch('/api/increment', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }), 
    });
  
    if (!res.ok) throw new Error('Failed to increment guesses');
    return res.json();
  }
  