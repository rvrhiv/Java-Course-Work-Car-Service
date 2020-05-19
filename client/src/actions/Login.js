
export async function login(user) {
    const response = await fetch('/api/auth/signin', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await response.json();
}