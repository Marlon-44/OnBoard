import { createContext, useContext } from 'react'

export const VehicleContext = createContext() // sin argumentos

export const useVehicleContext = () => {
    const context = useContext(VehicleContext)
    if (!context) {
        throw new Error('useVehicleContext debe usarse dentro de <VehicleProvider>')
    }
    return context
}
