import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BannerCarousel from '../components/BannerCarousel/BannerCarousel'
import homeSlides from '../data/homeSlides.json'
import { getAllProducts } from '../services/productService'
import styles from './Home.module.css'

const FEATURED_NAMES = [
    'Finca Esperanza (Grano)',
    'Reserva del Volcán',
    'Selección Gourmet Especial',
    'Edición Limitada Cosecha',
]

function Home() {
    const [featured, setFeatured] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getAllProducts()
            .then((data) => {
                const seleccionados = data.filter((product) => FEATURED_NAMES.includes(product.name))
                setFeatured(seleccionados)
            })
            .catch((err) => setError(err.message))
    }, [])

    return (
        <div>
            <BannerCarousel slides={homeSlides} />

            <section className={styles.story}>
                <h2>Nuestra historia</h2>
                <p>
                    Café Origen nació de un viaje a las montañas cafetaleras de Latinoamérica, donde
                    descubrimos que el mejor café no es el más caro, es el que se tuesta con respeto por
                    su origen. Trabajamos directo con pequeños productores para llevarte cada grano con
                    su historia intacta.
                </p>
            </section>

            <section className={styles.benefits}>
                <div className={styles.benefitCard}>
                    <div className={styles.benefitIcon}>⚡</div>
                    <h3>Energía y enfoque</h3>
                    <p>La cafeína natural te ayuda a concentrarte, sin los altibajos de otras bebidas.</p>
                </div>
                <div className={styles.benefitCard}>
                    <div className={styles.benefitIcon}>🍃</div>
                    <h3>Rico en antioxidantes</h3>
                    <p>El café es una de las mayores fuentes de antioxidantes en la dieta diaria.</p>
                </div>
                <div className={styles.benefitCard}>
                    <div className={styles.benefitIcon}>☕</div>
                    <h3>Un momento para ti</h3>
                    <p>Más que una bebida, es una pausa consciente en medio del día.</p>
                </div>
            </section>

            <section>
                <h2 className={styles.sectionTitle}>Algunos de nuestros cafés</h2>
                {error && <p>{error}</p>}
                <div className={styles.mentions}>
                    {featured.map((product) => (
                        <Link to={`/productos/${product._id}`} key={product._id} className={styles.mentionCard}>
                            <img src={product.image} alt={product.name} />
                            <p>{product.name}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className={styles.sectionTitle}>Disfrútalo donde quieras</h2>
                <div className={styles.lifestyle}>
                    <div className={styles.lifestyleCard}>
                        <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?w=500&q=80" alt="Café en la oficina" />
                        <p>En la oficina</p>
                    </div>
                    <div className={styles.lifestyleCard}>
                        <img src="https://images.unsplash.com/photo-1481833761820-0509d3217039?w=500&q=80" alt="Café en casa" />
                        <p>En casa</p>
                    </div>
                    <div className={styles.lifestyleCard}>
                        <img src="https://images.unsplash.com/photo-1518602164578-cd0074062767?w=500&q=80" alt="Café en la cabaña" />
                        <p>En la cabaña</p>
                    </div>
                </div>
            </section>

            <div className={styles.cta}>
                <Link to="/productos" className={styles.ctaButton}>Explora el catálogo</Link>
            </div>
        </div>
    )
}

export default Home