import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { getProductById } from '../services/productService'
import styles from './ProductDetail.module.css'

const DECORATIVE_IMAGE = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80'
function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useOutletContext()

    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        setProduct(null)
        setError(null)
        setAdded(false)
        setQuantity(1)
        getProductById(id)
            .then((data) => setProduct(data))
            .catch((err) => setError(err.message))
    }, [id])

    if (error) {
        return (
            <div className={styles.wrap}>
                <p>{error}</p>
                <button className={styles.back} onClick={() => navigate('/productos')}>
                    ← Volver al catálogo
                </button>
            </div>
        )
    }

    if (!product) return <p className={styles.loading}>Cargando...</p>

    const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1))
    const increaseQty = () => setQuantity((q) => q + 1)

    const handleAddToCart = () => {
        addToCart(product, quantity)
        setAdded(true)
    }

    return (
        <div className={styles.wrap}>
            <button className={styles.back} onClick={() => navigate('/productos')}>
                ← Volver al catálogo
            </button>

            <div className={styles.detail}>
                <div className={styles.images}>
                    <img className={styles.mainImage} src={product.image} alt={product.name} />
                    <img className={styles.decorativeImage} src={DECORATIVE_IMAGE} alt="Granos de café tostado" />
                </div>

                <div className={styles.info}>
                    <span className={styles.tag}>
                        {product.roastType} · {product.format} · {product.weight}
                    </span>
                    <h1 className={styles.name}>{product.name}</h1>
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                    <p className={styles.desc}>{product.description}</p>

                    <div className={styles.qty}>
                        <span>Cantidad:</span>
                        <button className={styles.qtyBtn} onClick={decreaseQty}>−</button>
                        <span className={styles.qtyValue}>{quantity}</span>
                        <button className={styles.qtyBtn} onClick={increaseQty}>+</button>
                    </div>

                    <button className={styles.addBtn} onClick={handleAddToCart}>
                        Agregar al carrito
                    </button>

                    {added && <p className={styles.added}>✓ Producto agregado al carrito</p>}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
