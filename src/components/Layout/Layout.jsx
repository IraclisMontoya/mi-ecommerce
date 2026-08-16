import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

function Layout() {
    const [cart, setCart] = useState([])

    function addToCart(product) {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id)
            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <>
            <Header cartCount={cartCount} />
            <Outlet context={{ cart, addToCart }} />
        </>
    )
}

export default Layout
