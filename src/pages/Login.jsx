import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import styles from './Login.module.css'

function Login() {
    const { login } = useOutletContext()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        if (!email || !password) {
            setError('Completa correo y contraseña.')
            return
        }
        if (password.length < 4) {
            setError('La contraseña debe tener al menos 4 caracteres.')
            return
        }

        setError('')
        const name = email.split('@')[0]
        login({ name, email })
        navigate('/')
    }

    return (
        <div className={styles.wrap}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h1>Iniciar sesión</h1>
                <p className={styles.hint}>
                    Usa cualquier correo y una contraseña de 4+ caracteres (todavía no hay servidor real).
                </p>

                <label className={styles.field}>
                    Correo electrónico
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
                </label>

                <label className={styles.field}>
                    Contraseña
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
                </label>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.submit}>Entrar</button>
            </form>
        </div>
    )
}

export default Login