const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(username, email, password) {
    console.log(JSON.stringify({ username, email, password }));
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
    let details = null;
    try {
      details = await response.json();
    } catch {

    }

    const field = details?.field || details?.error || undefined;
    const message =
      details?.message ||
      details?.detail ||
      response.statusText ||
      "Registration failed";

    const err = new Error(message);
    if (field) (err).field = field;
    (err).status = response.status;
    throw err;
  }

  return response.json();
}


