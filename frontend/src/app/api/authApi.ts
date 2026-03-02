const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RegisterError extends Error {
    field?: string;
    status?: number;
}

export async function register(username: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
        let details: Record<string, string> | null = null;
        try {
            details = await response.json();
        } catch {
            // ignore parse errors
        }

        const field = details?.field || details?.error || undefined;
        const message =
            details?.message ||
            details?.detail ||
            response.statusText ||
            "Registration failed";

        const err: RegisterError = new Error(message);
        if (field) err.field = field;
        err.status = response.status;
        throw err;
    }

    return response.json();
}
