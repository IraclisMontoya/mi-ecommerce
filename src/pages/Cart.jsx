import { Link, useOutletContext } from 'react-router-dom'
import styles from './Cart.module.css'

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useOutletContext()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
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
      {cart.map((item) => (
        <div className={styles.item} key={item.id}>
          <img src={item.image} alt={item.name} />
          <span className={styles.info}>{item.name}</span>
          <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <span className={styles.price}>${(item.price * item.quantity).toFixed(2)}</span>
          <button className={styles.remove} onClick={() => removeFromCart(item.id)}>Quitar</button>
        </div>
      ))}
      <h2 className={styles.total}>Total: ${subtotal.toFixed(2)}</h2>
    </div>
  )
}

export default Cart