import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'

const mockProduct = {
    _id: '123',
    name: 'Finca Esperanza',
    shortDescription: 'Notas dulces y achocolatadas',
    roastType: 'Clásico',
    format: 'Grano',
    weight: '250g',
    price: 190,
    image: 'https://example.com/cafe.jpg',
}

describe('ProductCard', () => {
    it('muestra el nombre y el precio del producto', () => {
        render(
            <MemoryRouter>
                <ProductCard product={mockProduct} onAddToCart={() => { }} />
            </MemoryRouter>
        )

        expect(screen.getByText('Finca Esperanza')).toBeInTheDocument()
        expect(screen.getByText('$190.00')).toBeInTheDocument()
    })

    it('llama a onAddToCart al hacer clic en el botón', () => {
        const handleAddToCart = vi.fn()

        render(
            <MemoryRouter>
                <ProductCard product={mockProduct} onAddToCart={handleAddToCart} />
            </MemoryRouter>
        )

        fireEvent.click(screen.getByText('Agregar al carrito'))

        expect(handleAddToCart).toHaveBeenCalledWith(mockProduct)
    })
})