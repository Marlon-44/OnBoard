import { useState, useEffect } from "react";
import { getRequestedUsers } from "../../api/user";
import { UserRequestContext } from "./UserRequestContext";

export function UserRequestProvider({ children }) {
    const [requestedUsers, setRequestedUsers] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(true);
    const [errorRequests, setErrorRequests] = useState(null);

    useEffect(() => {
        async function fetchRequestedUsers() {
            try {
                const data = await getRequestedUsers();
                setRequestedUsers(data);
            } catch (err) {
                setErrorRequests(err);
            } finally {
                setLoadingRequests(false);
            }
        }

        fetchRequestedUsers();
    }, []);

    // src/features/userRequests/UserRequestProvider.jsx
    return (
        <UserRequestContext.Provider
            value={{
                requestedUsers,
                setRequestedUsers, 
                loadingRequests,
                errorRequests,
            }}
        >
            {children}
        </UserRequestContext.Provider>
    );

}