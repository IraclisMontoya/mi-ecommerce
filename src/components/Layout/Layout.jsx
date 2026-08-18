import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

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

    function removeFromCart(productId) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

    function updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            removeFromCart(productId)
            return
        }
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
        )
    }

    const [user, setUser] = useState(null)

    function login(userData) {
        setUser(userData)
    }

    function logout() {
        setUser(null)
    }

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <>
            <Header cartCount={cartCount} user={user} onLogout={logout} />
            <Outlet context={{ cart, addToCart, removeFromCart, updateQuantity, user, login }} />
            <Footer />
        </>
    )

}

export default Layout
