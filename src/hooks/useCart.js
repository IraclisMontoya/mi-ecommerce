import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, addItemToCart, removeItemFromCart, updateCartItemQuantity } from '../services/cartService'

function useCart(user) {
    const navigate = useNavigate()
    const [cart, setCart] = useState({ items: [] })

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

    async function refreshCart() {
        if (user) {
            const updatedCart = await getCart()
            setCart(updatedCart)
        }
    }

    function resetCart() {
        setCart({ items: [] })
    }

    const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    return { cart, cartCount, addToCart, removeFromCart, updateQuantity, refreshCart, resetCart }
}

export default useCart