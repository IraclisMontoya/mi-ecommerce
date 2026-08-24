import { NavLink, Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header({ cartCount, user, onLogout }) {
    return (
        <header className={styles.header}>
            <span className={styles.logo}>Café Origen</span>
            <nav className={styles.nav}>
                <NavLink to="/" end>Inicio</NavLink>
                <NavLink to="/productos">Catálogo</NavLink>
                <Link to="/carrito">🛒 {cartCount}</Link>
                {user ? (
                    <span>
                        <Link to="/perfil">Hola, {user.name}</Link>
                        <button className={styles.logoutBtn} onClick={onLogout}>Cerrar sesión</button>
                    </span>
                ) : (
                    <Link to="/login">Iniciar sesión</Link>
                )}
            </nav>
        </header>
    )
}

export default Header
