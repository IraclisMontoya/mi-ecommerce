import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import { getAllProducts } from '../services/productService'

function Products() {
    const { addToCart } = useOutletContext()
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts().then((data) => {
            setProducts(data)
        })
    }, [])

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
        </div>
    )
}

export default Products
