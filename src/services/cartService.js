const API_URL = import.meta.env.VITE_API_URL

function authHeaders() {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
}

export async function getCart() {
    const response = await fetch(`${API_URL}/cart`, {
        headers: authHeaders(),
    })
    if (!response.ok) {
        throw new Error('No se pudo cargar el carrito.')
    }
    return response.json()
}

export async function addItemToCart(productId, quantity) {
    const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ productId, quantity }),
    })
    if (!response.ok) {
        throw new Error('No se pudo agregar el producto.')
    }
    return response.json()
}

export async function removeItemFromCart(productId) {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })
    if (!response.ok) {
        throw new Error('No se pudo eliminar el producto.')
    }
    return response.json()
}

export async function updateCartItemQuantity(productId, quantity) {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ quantity }),
    })
    if (!response.ok) {
        throw new Error('No se pudo actualizar la cantidad.')
    }
    return response.json()
}