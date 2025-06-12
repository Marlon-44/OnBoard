import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes'
import { VehicleProvider } from './features/vehicles/VehicleProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VehicleProvider>
      <AppRoutes>
      </AppRoutes>
    </VehicleProvider>
  </StrictMode>,
)
