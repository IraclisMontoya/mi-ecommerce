const API_URL = import.meta.env.VITE_API_URL

export async function getAllProducts() {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok) {
        throw new Error('No se pudieron cargar los productos.')
    }
    return response.json()
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`)
    if (!response.ok) {
        throw new Error('No se pudo cargar el producto.')
    }
    return response.json()
}