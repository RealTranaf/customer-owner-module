import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isInitialized } = useAuth()

    if (!isInitialized) return <div>Loading...</div>
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}
