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
import { UsersProvider } from './features/users/UsersProvider'
import { ReservaProvider } from './features/reserva/ReservaProvider'
import { FacturaProvider } from './features/factura/FacturaProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SesionProvider>
      <UsersProvider>
        <ReservaProvider>
          <FacturaProvider>
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
          </FacturaProvider>
        </ReservaProvider>
      </UsersProvider>
    </SesionProvider>
  </StrictMode>
)
