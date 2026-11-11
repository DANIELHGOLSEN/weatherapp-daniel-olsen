import { useEffect, useState } from "react"

export default function useFetch(url) {
    const [fetchedData, setFetchedData] = useState(null)
    useEffect(() => {
        if (!url) {
            setFetchedData(null)
            return
        }

        async function fetchData() {
            const response = await fetch(url)
            const data = await response.json()
            setFetchedData(data)
        }

        fetchData()
    }, [url])
    return fetchedData
}