import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../services/user-service'
import { displayRole } from '../../services/formatting'
import AddUserModal from './AddUserModal'
// import EditUserModal from './EditUserModal'
// import ResetPassword from './ResetPassword'

function User() {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)

    // const [selectedUser, setSelectedUser] = useState(null)

    const [showAddModal, setShowAddModal] = useState(false)
    // const [showResetModal, setShowResetModal] = useState(false)

    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('id')
    const [sortDir, setSortDir] = useState('asc')

    const fetchUsers = async (page = 0, keyword = '', sortBy = 'id', sortDir = 'asc') => {
        try {
            const response = await getAllUsers(keyword, page, 5, sortBy, sortDir)
            setUsers(response.data.users)
            setCurrentPage(response.data.currentPage)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers(currentPage, search, sortBy, sortDir)
    }, [currentPage])

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchConfirm = () => {
        fetchUsers(currentPage, search, sortBy, sortDir)
    }

    const handleClearSearch = () => {
        setSearch('')
        fetchUsers(currentPage, '', 'id', 'asc')
    }

    // const handleItemClick = (u) => {
    //     setSelectedUser(u)
    // }

    // const closeModal = () => {
    //     setSelectedUser(null)
    // }

    return (
        <div className='tab-page'>
            <div className='page-header'>
                <h2>User accounts</h2>
                <button className="btn-add" onClick={() => setShowAddModal(true)}>
                    <i className="bi bi-plus-lg"></i> Add Employee Account
                </button>
            </div>
            <div className='filters'>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={handleSearchChange}
                    style={{ width: '250px', padding: '6px' }}
                />
                <button className="btn-search" onClick={handleSearchConfirm}>
                    <i className="bi bi-search"></i> Search
                </button>
                <button className="btn-search" onClick={handleClearSearch}>
                    <i className="bi bi-search"></i> Clear
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Phone Number</th>
                                    <th>Role</th>
                                    <th>Active Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} onClick={() => navigate(`${user.id}`)}>
                                        <td>{user.username}</td>
                                        <td>{user.phoneNum}</td>
                                        <td>{displayRole(user.role)}</td>
                                        <td>{user.active ? 'Active' : 'Inactive'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <button onClick={handlePrev} disabled={currentPage === 0}>
                            ← Prev
                        </button>
                        <span>
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                            Next →
                        </button>
                    </div>
                </>
            )}

            {showAddModal && (
                <AddUserModal closeModal={() => setShowAddModal(false)} refresh={fetchUsers}></AddUserModal>
            )}
            
            {/* {selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    closeModal={closeModal}
                    refresh={fetchUsers}
                    onReset={() => setShowResetModal(true)}
                />
            )} */}
            {/* {showResetModal && (
                <ResetPassword
                    user={selectedUser}
                    closeModal={() => setShowResetModal(false)}
                    refresh={fetchUsers}
                />
            )} */}
        </div>
    )
}

export default User