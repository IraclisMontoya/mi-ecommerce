import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.section}>
                <h3>Café Origen</h3>
                <p>Café tostado con origen, directo a tu taza.</p>
            </div>

            <div className={styles.section}>
                <h4>Contacto</h4>
                <p>📞 +52 55 1234 5678</p>
                <p>✉️ hola@cafeorigen.com</p>
                <p>🕒 Lun–Sáb, 9am–7pm</p>
            </div>

            <div className={styles.section}>
                <h4>Síguenos</h4>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            </div>

            <p className={styles.copyright}>© {new Date().getFullYear()} Café Origen. Todos los derechos reservados.</p>
        </footer>
    )
}

export default Footer
