import Sidebar from "./Sidebar.js"
import { useAuth } from "./AuthContext.js"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
    const { user } = useAuth()
    return (
        <div className="dashboard-layout">
            <Sidebar username={user.username} />
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    )
}