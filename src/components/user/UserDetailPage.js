import { displayRole, displayActive } from '../../services/formatting'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserById } from '../../services/user-service'
import EditUserModal from './EditUserModal'
import ResetPassword from './ResetPassword'

function UserDetailPage(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [showEditModal, setShowEditModal] = useState(false)
    const [showResetModal, setShowResetModal] = useState(false)

    async function fetchUser() {
        try {
            const response = await getUserById(id)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [id])

    if (loading) return <p>Loading...</p>
    if (!user) return <p>User not found.</p>

    return (
        <div className="detail-page">
            <h2>Customer Info</h2>
            <div className='page-header'>
                <button className="btn-back" onClick={() => navigate(-1)}>
                    ← Back
                </button>
                <div className=''>
                    <button className="btn-edit" onClick={() => setShowResetModal(true)}>
                        <i className="bi bi-pencil-square"></i> Reset Password
                    </button>
                    <button className="btn-edit" onClick={() => setShowEditModal(true)}>
                        <i className="bi bi-pencil-square"></i> Edit User
                    </button>
                </div>
            </div>
            <div className="modal-info">
                <div className="info-row">
                    <div className="info-box"><span>Username: </span><p>{user.username}</p></div>
                    <div className="info-box"><span>Phone number: </span><p>{user.phoneNum}</p></div>
                </div>
                <div className='info-row'>
                    <div className="info-box"><span>Name: </span><p>{user.name}</p></div>   
                </div>
                <div className="info-row">
                    <div className="info-box"><span>Role: </span><p>{displayRole(user.role)}</p></div>
                    <div className="info-box"><span>Working status: </span><p>{displayActive(user.active)}</p></div>
                </div>
            </div>
            <div className="page-actions">
            </div>
            {showEditModal && (
                <EditUserModal
                    user={user}
                    closeModal={() => setShowEditModal(false)}
                    refresh={fetchUser}
                />
            )}
            {showResetModal && (
                <ResetPassword
                    user={user}
                    closeModal={() => setShowResetModal(false)}
                    refresh={fetchUser}
                />
            )}
        </div>
    )
}

export default UserDetailPage