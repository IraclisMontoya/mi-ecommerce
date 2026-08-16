import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard/ProductCard'
import { getAllProducts } from '../services/productService'

function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts().then((data) => {
            setProducts(data)
        })
    }, [])

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Products
