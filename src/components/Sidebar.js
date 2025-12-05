import { useNavigate } from "react-router-dom"

function Sidebar({ username }) {
    const navigate = useNavigate()
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Admin Panel {username}</h2>
            <div className="sidebar-menu">
                <span 
                    className="menu-item"
                    onClick={() => navigate("/dashboard/customers")}>
                    Customers
                </span>
                <span 
                    className="menu-item"
                    onClick={() => navigate("/dashboard/users")}>
                    Users
                </span>
            </div>
        </div>
    )
}

export default Sidebar