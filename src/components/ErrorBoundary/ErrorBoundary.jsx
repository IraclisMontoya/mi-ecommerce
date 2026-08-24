import { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.error('Error capturado por ErrorBoundary:', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <h2>Algo salió mal.</h2>
                    <p>Intenta recargar la página. Si el problema persiste, contáctanos.</p>
                    <button onClick={() => window.location.reload()}>Recargar página</button>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary