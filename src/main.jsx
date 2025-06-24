import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes'
import { VehicleProvider } from './features/vehicles/VehicleProvider'
import { FeaturedVehicleProvider } from './features/featuredVehicles/FeaturedVehiclesProvider'
import OfertasProvider from './features/ofertas/OfertasProvider'
import { ReviewsProvider } from './features/reviews/ReviewsProvider'
import { SesionProvider } from './features/sesion/SesionContext'
import { VehicleRequestProvider } from './features/vehicleRequests/VehicleRequestProvider'
import { UserRequestProvider } from './features/userRequests/UserRequestProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SesionProvider>
      <UserRequestProvider>
        <VehicleRequestProvider>
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
        </VehicleRequestProvider>
      </UserRequestProvider>
    </SesionProvider>
  </StrictMode>
)
