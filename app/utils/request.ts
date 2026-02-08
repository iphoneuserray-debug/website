export default async function request(input: string | URL, init?: RequestInit) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${input}`, {
        credentials: "include",
        ...init,
    });

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

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }
    return await response.text();
}