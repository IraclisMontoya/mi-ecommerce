import products from '../data/products.json'

const SIMULATED_DELAY = 300

function delay(value) {
    return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY))
}

export function getAllProducts() {
    return delay(products)
}

export function getProductById(id) {
    const product = products.find((p) => p.id === Number(id))
    return delay(product)
}