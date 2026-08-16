import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/productService'

function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        getProductById(id).then((data) => {
            setProduct(data)
        })
    }, [id])

    if (!product) return <p>Cargando...</p>

    return (
        <div>
            <img src={product.image} alt={product.name} width="300" />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.roastType} · {product.format} · {product.weight}</p>
            <p>${product.price.toFixed(2)}</p>
            <button>Agregar al carrito</button>
        </div>
    )
}

export default ProductDetail