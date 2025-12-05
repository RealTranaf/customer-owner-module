import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { login as apiLogin } from '../services/auth-service'

const AuthContext = createContext(null)
const LOCAL_KEY = 'auth_data'

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        user: null,
        token: null,
        isInitialized: false
    })

    useEffect(() => {
        const raw = localStorage.getItem(LOCAL_KEY)
        if (raw) {
            const parsed = JSON.parse(raw)

            if (parsed.user?.expiresAt && Date.now() > parsed.user.expiresAt) {
                clearPersist()
                setAuth({ user: null, token: null, isInitialized: true})
                return
            }

            if (parsed.token) {
                setAxiosAuthHeader(parsed.token)
            }

            setAuth({ ...parsed, isInitialized: true })
        } else {
            setAuth(a => ({ ...a, isInitialized: true }))
        }
    }, [])

    const login = async ({ username, password }) => {
        const data = await apiLogin(username, password)
        const { username: name, role, token, expiresIn } = data
        const expiresAt = Date.now() + expiresIn
        const user = {username: name, role, expiresAt}
        persist(user, token)
        setAuth({ user, token, isInitialized: true})

        return {user, token}
    }

    const logout = () => {
        clearPersist()
        setAuth({ user: null, token: null, isInitialized: true })
    }

    const persist = (user, token) => {
        localStorage.setItem(LOCAL_KEY, JSON.stringify({ user, token }))
        setAxiosAuthHeader(token)
    }

    const clearPersist = () => {
        localStorage.removeItem(LOCAL_KEY)
        removeAxiosAuthHeader()
    }

    const updateUser = (patch) => {
        const newUser = { ...(auth.user || {}), ...patch }
        setAuth(prev => ({ ...prev, user: newUser }))

        const raw = localStorage.getItem(LOCAL_KEY)
        if (raw) {
            const parsed = JSON.parse(raw)
            parsed.user = newUser
            localStorage.setItem(LOCAL_KEY, JSON.stringify(parsed))
        }
    }

    return (
        <AuthContext.Provider value={{
            user: auth.user,
            token: auth.token,
            isAuthenticated: Boolean(auth.token),
            isInitialized: auth.isInitialized,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
    
}

export const useAuth = () => useContext(AuthContext)

export function setAxiosAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function removeAxiosAuthHeader() {
    delete axios.defaults.headers.common['Authorization']
}

axios.defaults.baseURL = 'http://localhost:8080'