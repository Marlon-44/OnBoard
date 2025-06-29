import { useState, useEffect } from "react";
import { VehicleRequestContext } from "./VehicleRequestContext";
import { getRequestedVehicles } from "../../api/vehicles";

export function VehicleRequestProvider({ children }) {
    const [requestedVehicles, setRequestedVehicles] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(true);
    const [errorRequests, setErrorRequests] = useState(null);

    useEffect(() => {
        async function fetchRequestedVehicles() {
            try {
                const data = await getRequestedVehicles();
                setRequestedVehicles(data);
            } catch (err) {
                setErrorRequests(err);
            } finally {
                setLoadingRequests(false);
            }
        }

        fetchRequestedVehicles();
    }, []);

    return (
        <VehicleRequestContext.Provider 
            value={{ 
                requestedVehicles, 
                loadingRequests, 
                errorRequests,
                setRequestedVehicles}}>
            {children}
        </VehicleRequestContext.Provider>
    );
}
