import { Link, useOutletContext } from 'react-router-dom'
import styles from './Cart.module.css'

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useOutletContext()

    const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    if (cart.items.length === 0) {
        return (
            <div className={styles.empty}>
                <h1>Tu carrito</h1>
                <p>Tu carrito está vacío.</p>
                <Link to="/productos">Ver catálogo</Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Tu carrito</h1>
            {cart.items.map((item) => (
                <div className={styles.item} key={item.product._id}>
                    <img src={item.product.image} alt={item.product.name} />
                    <span className={styles.info}>{item.product.name}</span>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                    <span className={styles.price}>${(item.product.price * item.quantity).toFixed(2)}</span>
                    <button className={styles.remove} onClick={() => removeFromCart(item.product._id)}>Quitar</button>
                </div>
            ))}
            <Link to="/checkout" className={styles.checkoutBtn}>Proceder al pago</Link>
            <h2 className={styles.total}>Total: ${subtotal.toFixed(2)}</h2>
        </div>
    )
}

export default Cart