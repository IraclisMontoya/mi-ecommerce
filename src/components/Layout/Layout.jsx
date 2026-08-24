import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import useCart from '../../hooks/useCart'

function Layout() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })

    const { cart, cartCount, addToCart, removeFromCart, updateQuantity, refreshCart, resetCart } = useCart(user)

    function login(userData, token) {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', token)
    }

    function logout() {
        setUser(null)
        resetCart()
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return (
        <>
            <Header cartCount={cartCount} user={user} onLogout={logout} />
            <Outlet context={{ cart, addToCart, removeFromCart, updateQuantity, refreshCart, user, login, logout }} />
            <Footer />
        </>
    )
}

export default Layout