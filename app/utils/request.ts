/**
 * Wrapper around fetch that adds base API URL, cookies, and error handling.
 */
export default async function request(input: string | URL, init?: RequestInit) {

    // Always include credentials for session-based auth
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${input}`, {
        credentials: "include",
        ...init,
    });

    // Parse and throw a helpful error message
    if (!response.ok) {
        let message = `Request failed: ${response.status} ${response.statusText}`;
        try {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                message = errorData?.message || errorData?.error || message;
            } else {
                const text = await response.text();
                if (text) message = text;
            }
        } catch (err) {
            console.log(err);
        }
        throw new Error(message);
    }

    // Return JSON when available, otherwise return text
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }
    return await response.text();
}