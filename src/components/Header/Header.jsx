import { NavLink, Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header({ cartCount, user, onLogout }) {
    return (
        <header className={styles.header}>
            <span className={styles.logo}>Café Origen</span>
            <nav className={styles.nav}>
                <NavLink to="/" end>Inicio</NavLink>
                <NavLink to="/productos">Catálogo</NavLink>
                <Link to="/carrito">🛒 {cartCount}{user ? (
                    <span>
                        Hola, {user.name} <button onClick={onLogout}>Salir</button>
                    </span>
                ) : (
                    <Link to="/login">Iniciar sesión</Link>
                )}</Link>
            </nav>
        </header>
    )
}

export default Header
