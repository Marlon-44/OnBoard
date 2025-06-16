import { createContext, useContext } from 'react'

export const FeaturedVehicleContext = createContext() // sin argumentos

export const useFeaturedVehicleContext = () => {
    const context = useContext(FeaturedVehicleContext)
    if (!context) {
        throw new Error('useVehicleContext debe usarse dentro de <VehicleProvider>')
    }
    return context
}
