import { describe, it, expect } from 'vitest'
import { calculateOrderTotals } from './pricing'

describe('calculateOrderTotals', () => {
    it('cobra envío normal y sin descuento en pedidos chicos', () => {
        const result = calculateOrderTotals(200)
        expect(result.shipping).toBe(99)
        expect(result.discount).toBe(0)
        expect(result.total).toBe(299)
    })

    it('da envío gratis desde $500, sin descuento todavía', () => {
        const result = calculateOrderTotals(500)
        expect(result.shipping).toBe(0)
        expect(result.discount).toBe(0)
        expect(result.total).toBe(500)
    })

    it('aplica envío gratis Y 10% de descuento desde $1,000', () => {
        const result = calculateOrderTotals(1200)
        expect(result.shipping).toBe(0)
        expect(result.discount).toBe(120)
        expect(result.total).toBe(1080)
    })
})