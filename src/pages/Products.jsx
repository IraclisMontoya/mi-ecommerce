import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import { getAllProducts } from '../services/productService'
import styles from './Products.module.css'

function Products() {
    const { addToCart } = useOutletContext()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getAllProducts()
            .then((data) => setProducts(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div>
            <h1>Catálogo</h1>

            <div className={styles.promos}>
                <span className={styles.promoBadge}>🚚 Envío gratis en compras desde $500</span>
                <span className={styles.promoBadge}>🏷️ 10% de descuento en compras desde $1,000</span>
            </div>

            {loading && <p>Cargando productos...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Products

