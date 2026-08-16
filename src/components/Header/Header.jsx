import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

function Header({ cartCount }) {
    return (
        <header className={styles.header}>
            <span className={styles.logo}>Mi Café</span>
            <nav className={styles.nav}>
                <NavLink to="/" end>Inicio</NavLink>
                <NavLink to="/productos">Catálogo</NavLink>
                <span>🛒 {cartCount}</span>
            </nav>
        </header>
    )
}

export default Header
