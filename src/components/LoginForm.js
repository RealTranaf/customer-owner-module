import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

function LoginForm() {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login({ username, password })
            navigate("/dashboard")
        } catch (err) {
            setError("Wrong username/password")
        }
    }

    return (
        <div className='login-container'>
            <h3>Đăng nhập</h3>
            <form onSubmit={handleLogin} className='login-form'>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <button type="submit">Đăng nhập</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default LoginForm
