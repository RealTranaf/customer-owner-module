import "./App.css"
import { Routes, Route } from 'react-router-dom'
import Dashboard from "./components/Dashboard"
import LoginForm from "./components/LoginForm"
import ProtectedRoute from "./components/ProtectedRoute"
import Customer from "./components/customer/Customer"
import CustomerDetailPage from "./components/customer/CustomerDetailPage"
import User from "./components/user/User"
import 'bootstrap-icons/font/bootstrap-icons.css'
import UserDetailPage from "./components/user/UserDetailPage"

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginForm />}/>
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="customers" element={<Customer />} />
                        <Route path="customers/:id" element={<CustomerDetailPage />} />
                        <Route path="users" element={<User />} />
                        <Route path="users/:id" element={<UserDetailPage />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
