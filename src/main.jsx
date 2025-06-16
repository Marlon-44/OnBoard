import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes'
import { VehicleProvider } from './features/vehicles/VehicleProvider'
import { FeaturedVehicleProvider } from './features/featuredVehicles/FeaturedVehiclesProvider'
import OfertasProvider from './features/ofertas/OfertasProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OfertasProvider>
      <FeaturedVehicleProvider>
        <VehicleProvider>
          <AppRoutes>
          </AppRoutes>
        </VehicleProvider>
      </FeaturedVehicleProvider>
    </OfertasProvider>
  </StrictMode>,
)
