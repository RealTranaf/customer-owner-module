import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCustomers } from '../../services/customer-service'
// import CustomerModal from './CustomerModal'
import AddCustomerModal from './AddCustomerModal'
// import EditCustomerModal from './EditCustomerModal'
import { formatDate, formatCurrency, displayGender } from '../../services/formatting'

function Customer() {
    const navigate = useNavigate()

    const [customers, setCustomers] = useState([])

    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)

    // const [selectedCustomer, setSelectedCustomer] = useState(null)

    const [showAddModal, setShowAddModal] = useState(false)
    // const [showEditModal, setShowEditModal] = useState(false)

    const [search, setSearch] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [sortBy, setSortBy] = useState('lastPurchaseDate')
    const [sortDir, setSortDir] = useState('desc')
    const [gender, setGender] = useState('')

    const fetchCustomers = async (page = 0, keyword = '', startDate = '', endDate = '', sortBy = 'lastPurchaseDate', sortDir = 'desc', gender = '') => {
        try {
            const response = await getAllCustomers(keyword, page, 5, startDate, endDate, sortBy, sortDir, gender)
            setCustomers(response.data.customers)
            setCurrentPage(response.data.currentPage)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomers(currentPage, search, startDate, endDate, sortBy, sortDir, gender)
    }, [currentPage, startDate, endDate, sortBy, sortDir, gender])

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

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    const handleSearchConfirm = () => {
        fetchCustomers(currentPage, search, startDate, endDate, sortBy, sortDir)
    }

    const handleClearSearch = () => {
        setSearch('')
        setStartDate('')
        setEndDate('')
        setGender('')
        fetchCustomers(currentPage, '', '', '', 'lastPurchaseDate', 'desc')
    }

    // const handleItemClick = (cat) => {
    //     setSelectedCustomer(cat)
    // }

    // const closeModal = () => {
    //     setSelectedCustomer(null)
    // }

    return (
        <div className='tab-page'>
            <div className='page-header'>
                <h2>Customers</h2>
                <button className="btn-add" onClick={() => setShowAddModal(true)}>
                    <i className="bi bi-plus-lg"></i> Add Customer
                </button>
            </div>
            <div className='filters'>
                <input
                    type="text"
                    placeholder="Search customers..."
                    value={search}
                    onChange={handleSearchChange}
                    style={{ width: '250px', padding: '6px' }}
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    style={{ padding: '6px' }}
                    placeholder="Start date"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    style={{ padding: '6px' }}
                    placeholder="End date"
                />
                <select value={gender} onChange={handleGenderChange}>
                    <option value="">All Genders</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="NaN">Other/Unknown</option>
                </select>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="createdAt">Created At</option>
                    <option value="lastPurchaseDate">Last Purchase Date</option>
                    <option value="totalPurchaseAmount">Total Purchased</option>
                    <option value="gender">Gender</option>
                </select>
                <select value={sortDir} onChange={e => setSortDir(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
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
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Gender</th>
                                    <th>Note</th>
                                    <th>Created At</th>
                                    <th>Last Purchase Date</th>
                                    <th>Total Amount Purchased</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <tr key={customer.id} onClick={() => navigate(`${customer.id}`)}>
                                        <td>{customer.name}</td>
                                        <td>{customer.phoneNum}</td>
                                        <td>{displayGender(customer.gender)}</td>
                                        <td>{customer.note}</td>
                                        <td>{formatDate(customer.createdAt)}</td>
                                        <td>{formatDate(customer.lastPurchaseDate)}</td>
                                        <td>{formatCurrency(customer.totalPurchaseAmount)}</td>
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
            {/* {selectedCustomer && (
                <CustomerModal
                    customer={selectedCustomer}
                    closeModal={closeModal}
                    onEdit={() => setShowEditModal(true)}
                    refresh={fetchCustomers} />
            )} */}
            {showAddModal && (
                <AddCustomerModal closeModal={() => setShowAddModal(false)} refresh={fetchCustomers}></AddCustomerModal>
            )}
            {/* {showEditModal && (
                <EditCustomerModal
                    customer={selectedCustomer}
                    closeModal={() => setShowEditModal(false)}
                    refresh={fetchCustomers}
                />
            )} */}
        </div>
    )
}

export default Customer