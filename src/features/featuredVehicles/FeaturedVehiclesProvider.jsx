import { useState, useEffect } from 'react'
import { getFeaturedVehicles } from '../../api/featuredVehicles'
import {FeaturedVehicleContext} from "./FeaturedVehiclesContext"

export function FeaturedVehicleProvider({ children }) {
    const [featuredVehicles, setFeaturedVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchVehicles() {
            try {
                const data = await getFeaturedVehicles();
                setFeaturedVehicles(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchVehicles()
    }, [])

    return (
        <FeaturedVehicleContext.Provider value={{ featuredVehicles, loading, error }}>
            {children}
        </FeaturedVehicleContext.Provider>
    )
}
