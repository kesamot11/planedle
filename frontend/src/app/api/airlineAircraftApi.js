const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchRandomAircraft(difficulty) {
    const response = await fetch(`${API_URL}/api/random-aircraft?difficulty=${difficulty}`);
    if (!response.ok) {
        throw new Error('Failed to fetch aircraft');
    }
    return await response.json();
}