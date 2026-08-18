import { useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import styles from './Checkout.module.css'

const FREE_SHIPPING_MIN = 500
const DISCOUNT_MIN = 1000
const SHIPPING_COST = 99
const DISCOUNT_RATE = 0.10

function Checkout() {
    const { cart, user, clearCart } = useOutletContext()
    const navigate = useNavigate()

    const [step, setStep] = useState('address')
    const [fullName, setFullName] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    if (!user) return <Navigate to="/login" replace />
    if (cart.length === 0 && step !== 'confirmed') return <Navigate to="/carrito" replace />

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST
    const discount = subtotal >= DISCOUNT_MIN ? subtotal * DISCOUNT_RATE : 0
    const total = subtotal + shipping - discount

    function handleSubmit(event) {
        event.preventDefault()

        if (!fullName || !street || !city || !zip || !phone) {
            setError('Completa todos los campos de la dirección.')
            return
        }

        setError('')
        setStep('confirmed')
        clearCart()
    }

    if (step === 'confirmed') {
        return (
            <div className={styles.confirmed}>
                <div className={styles.check}>✓</div>
                <h1>¡Pedido confirmado!</h1>
                <p>
                    Gracias, {user.name}. Tu pedido por <strong>${total.toFixed(2)}</strong> se enviará a {street}, {city}.
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

                    <button type="submit" className={styles.submit}>Pagar ${total.toFixed(2)}</button>
                </form>

                <aside className={styles.summary}>
                    <h2>Tu pedido</h2>
                    {cart.map((item) => (
                        <div className={styles.summaryRow} key={item.id}>
                            <span>{item.name} × {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
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