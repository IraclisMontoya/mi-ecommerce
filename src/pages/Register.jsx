import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { registerUser } from '../services/authService'
import styles from './Login.module.css'

function Register() {
    const { login } = useOutletContext()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        if (!name || !email || !password) {
            setError('Completa todos los campos.')
            return
        }
        if (password.length < 4) {
            setError('La contraseña debe tener al menos 4 caracteres.')
            return
        }

        setError('')
        setLoading(true)

        try {
            const data = await registerUser({ name, email, password })
            login(data.user, data.token)
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.wrap}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h1>Crear cuenta</h1>

                <label className={styles.field}>
                    Nombre
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
                </label>

                <label className={styles.field}>
                    Correo electrónico
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
                </label>

                <label className={styles.field}>
                    Contraseña
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
                </label>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.submit} disabled={loading}>
                    {loading ? 'Creando cuenta...' : 'Registrarme'}
                </button>

                <p className={styles.hint}>
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </form>
        </div>
    )
}

export default Register
