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
                <div className={styles.socialLinks}>
                    <a
                        className={styles.iconLink}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        title="Instagram"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3" y="3" width="18" height="18" rx="5" />
                            <circle cx="12" cy="12" r="4.2" />
                            <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
                        </svg>
                    </a>
                    <a
                        className={styles.iconLink}
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        title="Facebook"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M13.8 21v-7h2.2l0.3-2.6h-2.5V9.6c0-.75.2-1.26 1.28-1.26h1.37V6.02C15.9 5.97 15.1 5.9 14.2 5.9c-1.9 0-3.2 1.16-3.2 3.3v1.2H8.8v2.6H11v7" />
                        </svg>
                    </a>
                    <a
                        className={styles.iconLink}
                        href="https://wa.me/525512345678"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="WhatsApp"
                        title="WhatsApp"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z" />
                            <path d="M9 10.2c0 3 2.6 5.6 5.6 5.6.6 0 .9-.2.9-.7v-.9c0-.4-.3-.7-.6-.8l-1.4-.4c-.3 0-.5 0-.7.3l-.3.4a5 5 0 0 1-2.3-2.3l.4-.3c.2-.2.3-.4.3-.7L10.5 9c-.1-.3-.4-.6-.8-.6h-.9c-.5 0-.7.3-.7.9Z" fill="currentColor" stroke="none" />
                        </svg>
                    </a>
                    <a
                        className={styles.iconLink}
                        href="https://tiktok.com/@cafeorigen"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="TikTok"
                        title="TikTok"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M14 4v9.5a3 3 0 1 1-2.4-2.94" />
                            <path d="M14 4c.3 2 1.8 3.5 4 3.8" />
                        </svg>
                    </a>
                </div>
            </div>

            <p className={styles.copyright}>© {new Date().getFullYear()} Café Origen. Todos los derechos reservados.</p>
        </footer>
    )
}

export default Footer
