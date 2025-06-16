import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes'
import { VehicleProvider } from './features/vehicles/VehicleProvider'
import { FeaturedVehicleProvider } from './features/featuredVehicles/FeaturedVehiclesProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FeaturedVehicleProvider>
      <VehicleProvider>
        <AppRoutes>
        </AppRoutes>
      </VehicleProvider>
    </FeaturedVehicleProvider>
  </StrictMode>,
)
