import { useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import { createOrder } from '../services/orderService'
import { calculateOrderTotals } from '../utils/pricing'
import { isValidCardNumber, isValidExpiry } from '../utils/cardValidation'
import styles from './Checkout.module.css'

function generateOxxoReference() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString()
}

const CARD_BRAND_LABELS = { visa: 'Visa', mastercard: 'Mastercard' }

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

    const [paymentMethod, setPaymentMethod] = useState('tarjeta')
    const [cardBrand, setCardBrand] = useState('visa')
    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cardCVV, setCardCVV] = useState('')
    const [paymentError, setPaymentError] = useState('')

    const [loading, setLoading] = useState(false)
    const [orderTotal, setOrderTotal] = useState(0)
    const [paymentSummary, setPaymentSummary] = useState('')

    if (!user) return <Navigate to="/login" replace />
    if (cart.items.length === 0 && step !== 'confirmed') return <Navigate to="/carrito" replace />

    const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const { shipping, discount, total } = calculateOrderTotals(subtotal)

    function handleAddressSubmit(event) {
        event.preventDefault()

        if (!fullName || !street || !city || !zip || !phone) {
            setError('Completa todos los campos de la dirección.')
            return
        }

        setError('')
        localStorage.setItem('shippingAddress', JSON.stringify({ fullName, street, city, zip, phone }))
        setStep('payment')
    }

    async function handlePaymentSubmit(event) {
        event.preventDefault()

        let paymentReference = ''

        if (paymentMethod === 'tarjeta') {
            if (!cardName) {
                setPaymentError('Escribe el nombre tal como aparece en la tarjeta.')
                return
            }
            if (!isValidCardNumber(cardNumber)) {
                setPaymentError('El número de tarjeta no es válido.')
                return
            }
            if (!isValidExpiry(cardExpiry)) {
                setPaymentError('La fecha de vencimiento no es válida.')
                return
            }
            if (!/^\d{3,4}$/.test(cardCVV)) {
                setPaymentError('El CVV debe tener 3 o 4 dígitos.')
                return
            }
            paymentReference = cardNumber.replace(/\s/g, '').slice(-4)
        }

        if (paymentMethod === 'oxxo') {
            paymentReference = generateOxxoReference()
        }

        setPaymentError('')
        setLoading(true)

        try {
            await createOrder({
                shippingAddress: { fullName, street, city, zip, phone },
                paymentMethod,
                paymentReference,
            })

            if (paymentMethod === 'tarjeta') {
                setPaymentSummary(`${CARD_BRAND_LABELS[cardBrand]} terminada en ${paymentReference}`)
            } else if (paymentMethod === 'oxxo') {
                setPaymentSummary(`Paga en efectivo en tu OXXO más cercano con el código ${paymentReference}`)
            } else if (paymentMethod === 'paypal') {
                setPaymentSummary('Pagado con PayPal')
            } else {
                setPaymentSummary('Pagado con Apple Pay')
            }

            setOrderTotal(total)
            setStep('confirmed')
            await refreshCart()
        } catch (err) {
            setPaymentError(err.message)
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
                <p className={styles.paymentSummary}>{paymentSummary}</p>
                <button onClick={() => navigate('/productos')}>Seguir comprando</button>
            </div>
        )
    }

    if (step === 'payment') {
        return (
            <div className={styles.wrap}>
                <h1>Método de pago</h1>

                <div className={styles.layout}>
                    <form className={styles.form} onSubmit={handlePaymentSubmit}>
                        <div className={styles.methods}>
                            <label className={styles.methodOption}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="tarjeta"
                                    checked={paymentMethod === 'tarjeta'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Tarjeta de crédito/débito
                                <span className={`${styles.badge} ${styles.badgeVisa}`}>VISA</span>
                                <span className={`${styles.badge} ${styles.badgeMastercard}`}>Mastercard</span>
                            </label>
                            <label className={styles.methodOption}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                PayPal
                                <span className={`${styles.badge} ${styles.badgePaypal}`}>PayPal</span>
                            </label>
                            <label className={styles.methodOption}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="applepay"
                                    checked={paymentMethod === 'applepay'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Apple Pay
                                <span className={`${styles.badge} ${styles.badgeApplePay}`}>Apple Pay</span>
                            </label>
                            <label className={styles.methodOption}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="oxxo"
                                    checked={paymentMethod === 'oxxo'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Efectivo en OXXO
                                <span className={`${styles.badge} ${styles.badgeOxxo}`}>OXXO</span>
                            </label>
                        </div>

                        {paymentMethod === 'tarjeta' && (
                            <>
                                <div className={styles.brandPicker}>
                                    <div
                                        className={`${styles.brandOption} ${cardBrand === 'visa' ? styles.brandOptionActive : ''}`}
                                        onClick={() => setCardBrand('visa')}
                                    >
                                        VISA
                                    </div>
                                    <div
                                        className={`${styles.brandOption} ${cardBrand === 'mastercard' ? styles.brandOptionActive : ''}`}
                                        onClick={() => setCardBrand('mastercard')}
                                    >
                                        Mastercard
                                    </div>
                                </div>

                                <label className={styles.field}>
                                    Nombre en la tarjeta
                                    <input value={cardName} onChange={(e) => setCardName(e.target.value)} />
                                </label>
                                <label className={styles.field}>
                                    Número de tarjeta
                                    <input
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        placeholder="4242 4242 4242 4242"
                                    />
                                </label>
                                <label className={styles.field}>
                                    Vencimiento (MM/AA)
                                    <input
                                        value={cardExpiry}
                                        onChange={(e) => setCardExpiry(e.target.value)}
                                        placeholder="12/27"
                                    />
                                </label>
                                <label className={styles.field}>
                                    CVV
                                    <input value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} placeholder="123" />
                                </label>
                            </>
                        )}

                        {paymentMethod === 'paypal' && (
                            <p className={styles.hint}>Al confirmar, serás redirigido a PayPal para completar tu pago (simulado).</p>
                        )}

                        {paymentMethod === 'applepay' && (
                            <p className={styles.hint}>Al confirmar, se abrirá Apple Pay para completar tu pago (simulado).</p>
                        )}

                        {paymentMethod === 'oxxo' && (
                            <p className={styles.hint}>Te daremos un código para pagar en efectivo en cualquier tienda OXXO.</p>
                        )}

                        {paymentError && <p className={styles.error}>{paymentError}</p>}

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

    return (
        <div className={styles.wrap}>
            <h1>Dirección de envío</h1>

            <div className={styles.layout}>
                <form className={styles.form} onSubmit={handleAddressSubmit}>
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

                    <button type="submit" className={styles.submit}>
                        Continuar a método de pago
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