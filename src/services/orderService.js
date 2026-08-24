const API_URL = import.meta.env.VITE_API_URL

function authHeaders() {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
}

export async function createOrder({ shippingAddress, paymentMethod, paymentReference }) {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ shippingAddress, paymentMethod, paymentReference }),
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || data.message || 'No se pudo crear la orden.')
    }
    return data
}