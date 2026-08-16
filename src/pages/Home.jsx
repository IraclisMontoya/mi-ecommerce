import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import BannerCarousel from '../components/BannerCarousel/BannerCarousel'
import ProductCard from '../components/ProductCard/ProductCard'
import { getAllProducts } from '../services/productService'
import homeSlides from '../data/homeSlides.json'

function Home() {
    const { addToCart } = useOutletContext()
    const [featured, setFeatured] = useState([])

    useEffect(() => {
        getAllProducts().then((data) => {
            setFeatured(data.slice(0, 4))
        })
    }, [])

    return (
        <div>
            <BannerCarousel slides={homeSlides} />
            <h2>Destacados</h2>
            <div className="product-grid">
                {featured.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
            </div>
        </div>
    )
}

export default Home
