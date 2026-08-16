import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'

function ProductCard({ product, onAddToCart }) {
  return (
    <div className={styles.card}>
      <Link to={`/productos/${product.id}`}>
        <img src={product.image} alt={product.name} width="200" />
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <p className={styles.meta}>{product.roastType} · {product.format} · {product.weight}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </Link>
      <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
    </div>
  )
}

export default ProductCard