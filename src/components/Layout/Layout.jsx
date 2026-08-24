import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getCart, addItemToCart, removeItemFromCart, updateCartItemQuantity } from '../../services/cartService'

function Layout() {
    const navigate = useNavigate()
    const [cart, setCart] = useState({ items: [] })

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })

    useEffect(() => {
        if (user) {
            getCart().then(setCart).catch(() => setCart({ items: [] }))
        } else {
            setCart({ items: [] })
        }
    }, [user])

    async function addToCart(product, quantity = 1) {
        if (!user) {
            navigate('/login')
            return
        }
        const updatedCart = await addItemToCart(product._id, quantity)
        setCart(updatedCart)
    }

    async function removeFromCart(productId) {
        const updatedCart = await removeItemFromCart(productId)
        setCart(updatedCart)
    }

    async function updateQuantity(productId, newQuantity) {
        const updatedCart = await updateCartItemQuantity(productId, newQuantity)
        setCart(updatedCart)
    }

    function login(userData, token) {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', token)
    }

    async function refreshCart() {
        if (user) {
            const updatedCart = await getCart()
            setCart(updatedCart)
        }
    }

    function logout() {
        setUser(null)
        setCart({ items: [] })
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <>
            <Header cartCount={cartCount} user={user} onLogout={logout} />
            <Outlet context={{ cart, addToCart, removeFromCart, updateQuantity, refreshCart, user, login, logout }} />
            <Footer />
        </>
    )
}

export default Layout