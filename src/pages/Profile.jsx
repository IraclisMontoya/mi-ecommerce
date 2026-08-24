import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import styles from './Profile.module.css'

function Profile() {
    const { user, logout } = useOutletContext()
    const navigate = useNavigate()

    if (!user) return <Navigate to="/login" replace />

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <div className={styles.wrap}>
            <h1>Mi perfil</h1>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo:</strong> {user.email}</p>
            <button className={styles.logoutBtn} onClick={handleLogout}>Cerrar sesión</button>
        </div>
    )
}

export default Profile