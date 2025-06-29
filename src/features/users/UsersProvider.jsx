import { useState, useEffect } from 'react'
import { getUsers } from '../../api/user'
import { UserContext } from './UserContext'

export function UsersProvider({ children }) {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getUsers()
                setUsers(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    // src/features/users/UsersProvider.jsx
    return (
        <UserContext.Provider value={{ users, setUsers, loading, error }}>
            {children}
        </UserContext.Provider>
    );

}
