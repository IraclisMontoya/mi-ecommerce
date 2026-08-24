export const FREE_SHIPPING_MIN = 500
export const DISCOUNT_MIN = 1000
export const SHIPPING_COST = 99
export const DISCOUNT_RATE = 0.10

export function calculateOrderTotals(subtotal) {
    const shipping = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST
    const discount = subtotal >= DISCOUNT_MIN ? subtotal * DISCOUNT_RATE : 0
    const total = subtotal + shipping - discount
    return { shipping, discount, total }
}