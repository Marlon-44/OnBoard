import { useState, useEffect } from 'react'
import { VehicleContext } from './VehicleContext'
import { getVehicles } from '../../api/vehicles'

export function VehicleProvider({ children }) {
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchVehicles() {
            try {
                const data = await getVehicles()
                setVehicles(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchVehicles()
    }, [])

    return (
        <VehicleContext.Provider value={{ vehicles, loading, error }}>
            {children}
        </VehicleContext.Provider>
    )
}
