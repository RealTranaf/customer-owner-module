import axios from 'axios'

const API_URL = 'http://localhost:8080/customers'

export async function getAllCustomers(keyword, page, size, startDate, endDate, sortBy, sortDir, gender) {
    let url = `${API_URL}?keyword=${keyword}&page=${page}&size=${size}`
    if (startDate) url += `&startDate=${startDate}`
    if (endDate) url += `&endDate=${endDate}`
    if (sortBy) url += `&sortBy=${sortBy}`
    if (sortDir) url += `&sortDir=${sortDir}`
    if (gender) url += `&gender=${gender}`
    return await axios.get(url)
}

export async function addCustomer(name, phoneNum, gender, note) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('phoneNum', phoneNum)
    formData.append('gender', gender)
    formData.append('note', note)
    return await axios.post(`${API_URL}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export async function updateCustomer(id, name, phoneNum, gender, note) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('phoneNum', phoneNum)
    formData.append('gender', gender)
    formData.append('note', note)
    return await axios.put(`${API_URL}/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export async function getCustomerById(id) {
    return await axios.get(`${API_URL}/${id}`)
}


