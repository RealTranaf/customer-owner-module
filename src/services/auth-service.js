import axios from 'axios'

const API_URL = 'http://localhost:8080/auth'

export async function login (username, password){
    const response = await axios.post(`${API_URL}/login`, { username, password })
    return response.data
}

export async function logout(){
    const response = await axios.post(`${API_URL}/logout`, {})
    localStorage.removeItem('user')
    return response.data
}


export async function signup(username, phoneNum, password, active, role) {
    const response = await axios.post(`${API_URL}/signup`, { username, phoneNum, password, active, role })
    return response.data
}

export async function resetPassword(phoneNum, newPassword) {
    const response = await axios.post(`${API_URL}/reset-password`, { phoneNum, newPassword })
    return response.data
}