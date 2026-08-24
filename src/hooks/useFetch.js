import { useEffect, useState } from 'react'

function useFetch(fetchFn, dependencies = []) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        fetchFn()
            .then((result) => setData(result))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)

    return { data, loading, error }
}

export default useFetch