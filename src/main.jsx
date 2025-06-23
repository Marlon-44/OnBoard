import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes'
import { VehicleProvider } from './features/vehicles/VehicleProvider'
import { FeaturedVehicleProvider } from './features/featuredVehicles/FeaturedVehiclesProvider'
import OfertasProvider from './features/ofertas/OfertasProvider'
import { ReviewsProvider } from './features/reviews/ReviewsProvider'
import { SesionProvider } from './features/sesion/SesionContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SesionProvider>
      <ReviewsProvider>
        <OfertasProvider>
          <FeaturedVehicleProvider>
            <VehicleProvider>
              <AppRoutes>
              </AppRoutes>
            </VehicleProvider>
          </FeaturedVehicleProvider>
        </OfertasProvider>
      </ReviewsProvider>
    </SesionProvider>
  </StrictMode >,
)
