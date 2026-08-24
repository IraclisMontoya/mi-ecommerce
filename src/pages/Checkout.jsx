import { useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import { createOrder } from '../services/orderService'
import { calculateOrderTotals } from '../utils/pricing'
import styles from './Checkout.module.css'

function Checkout() {
    const { cart, user, refreshCart } = useOutletContext()
    const navigate = useNavigate()

    const savedAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}')

    const [step, setStep] = useState('address')
    const [fullName, setFullName] = useState(savedAddress.fullName || '')
    const [street, setStreet] = useState(savedAddress.street || '')
    const [city, setCity] = useState(savedAddress.city || '')
    const [zip, setZip] = useState(savedAddress.zip || '')
    const [phone, setPhone] = useState(savedAddress.phone || '')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [orderTotal, setOrderTotal] = useState(0)

    if (!user) return <Navigate to="/login" replace />
    if (cart.items.length === 0 && step !== 'confirmed') return <Navigate to="/carrito" replace />

    const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const { shipping, discount, total } = calculateOrderTotals(subtotal)

    async function handleSubmit(event) {
        event.preventDefault()

        if (!fullName || !street || !city || !zip || !phone) {
            setError('Completa todos los campos de la dirección.')
            return
        }

        setError('')
        setLoading(true)

        try {
            await createOrder({ fullName, street, city, zip, phone })
            localStorage.setItem('shippingAddress', JSON.stringify({ fullName, street, city, zip, phone }))
            setOrderTotal(total)
            setStep('confirmed')
            await refreshCart()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (step === 'confirmed') {
        return (
            <div className={styles.confirmed}>
                <div className={styles.check}>✓</div>
                <h1>¡Pedido confirmado!</h1>
                <p>
                    Gracias, {user.name}. Tu pedido por <strong>${orderTotal.toFixed(2)}</strong> se enviará a {street}, {city}.
                </p>
                <button onClick={() => navigate('/productos')}>Seguir comprando</button>
            </div>
        )
    }

    return (
        <div className={styles.wrap}>
            <h1>Dirección de envío y pago</h1>

            <div className={styles.layout}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.field}>
                        Nombre completo
                        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </label>

                    <label className={styles.field}>
                        Calle y número
                        <input value={street} onChange={(e) => setStreet(e.target.value)} />
                    </label>

                    <label className={styles.field}>
                        Ciudad
                        <input value={city} onChange={(e) => setCity(e.target.value)} />
                    </label>

                    <label className={styles.field}>
                        Código postal
                        <input value={zip} onChange={(e) => setZip(e.target.value)} />
                    </label>

                    <label className={styles.field}>
                        Teléfono
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </label>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.submit} disabled={loading}>
                        {loading ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
                    </button>
                </form>

                <aside className={styles.summary}>
                    <h2>Tu pedido</h2>
                    {cart.items.map((item) => (
                        <div className={styles.summaryRow} key={item.product._id}>
                            <span>{item.product.name} × {item.quantity}</span>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Envío</span>
                        <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {discount > 0 && (
                        <div className={styles.summaryRow}>
                            <span>Descuento (10%)</span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Checkout