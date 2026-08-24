const API_URL = import.meta.env.VITE_API_URL

export async function registerUser({ name, email, password }) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || 'No se pudo crear la cuenta.')
    }
    return data
}

export async function loginUser({ email, password }) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || 'Correo o contraseña incorrectos.')
    }
    return data
}