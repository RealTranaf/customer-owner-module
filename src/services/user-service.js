import axios from 'axios'

const API_URL = 'http://localhost:8080/users'

export async function getAllUsers(keyword, page, size, sortBy, sortDir) {
    let url = `${API_URL}?keyword=${keyword}&page=${page}&size=${size}`
    if (sortBy) url += `&sortBy=${sortBy}`
    if (sortDir) url += `&sortDir=${sortDir}`
    return await axios.get(url)
}

export async function getUserById(id) {
    return await axios.get(`${API_URL}/${id}`)
}

export async function updateUser(id, username, phoneNum, active, role) {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('phoneNum', phoneNum)
    formData.append('isActive', active)
    formData.append('role', role)
    return await axios.put(`${API_URL}/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}