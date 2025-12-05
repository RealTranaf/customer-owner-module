export function formatDate(dateString) {
    if (!dateString) {
        return ''
    }
    const date = new Date(dateString)
    return date.toLocaleString()
}

export function formatCurrency(numString) {
    if (!numString) {
        return ''
    }
    const formatted = numString.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})
    return formatted
}

export function displayGender(gender) {
    if (gender === 'MALE') return "Nam"
    if (gender === 'FEMALE') return "Nữ"
    return "Khác"
}

export function displayRole(role) {
    if (role === 'OWNER') return "Chủ cửa hàng"
    if (role === 'CS') return "Nhân viên chăm sóc khách hàng"
    if (role === 'WH') return "Nhân viên quản lý sản phẩm"
    if (role === 'SALES') return "Nhân viên bán hàng"
    return "Khác"
}

export function displayActive(active) {
    if (active === true) return "Đang làm việc"
    if (active === false) return "Không làm việc"
    return "Khác"
}