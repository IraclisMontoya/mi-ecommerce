import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import { getAllProducts } from '../services/productService'
import styles from './Products.module.css'

function Products() {
    const { addToCart } = useOutletContext()
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts().then((data) => {
            setProducts(data)
        })
    }, [])

    return (
        <div>
            <h1>Catálogo</h1>

            <div className={styles.promos}>
                <span className={styles.promoBadge}>🚚 Envío gratis en compras desde $500</span>
                <span className={styles.promoBadge}>🏷️ 10% de descuento en compras desde $1,000</span>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
            </div>
        </div>
    )
}

export default Products

