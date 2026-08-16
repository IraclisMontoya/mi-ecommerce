import { useEffect, useState } from 'react'
import styles from './BannerCarousel.module.css'

function BannerCarousel({ slides }) {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [slides.length])

    function goToPrev() {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    }

    function goToNext() {
        setCurrent((prev) => (prev + 1) % slides.length)
    }

    const slide = slides[current]

    return (
        <div className={styles.carousel} style={{ backgroundImage: `url(${slide.image})` }}>
            <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={goToPrev}>‹</button>
            <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={goToNext}>›</button>
            <div className={styles.overlay}>
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
            </div>
        </div>
    )
}

export default BannerCarousel
