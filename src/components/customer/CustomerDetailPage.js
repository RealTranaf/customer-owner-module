import { formatDate, formatCurrency, displayGender } from '../../services/formatting'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCustomerById } from '../../services/customer-service'
import EditCustomerModal from './EditCustomerModal'

function CustomerDetailPage(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [customer, setCustomer] = useState(null)
    const [loading, setLoading] = useState(true)

    const [showEditModal, setShowEditModal] = useState(false)

    async function fetchCustomer() {
        try {
            const response = await getCustomerById(id)
            setCustomer(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomer()
    }, [id])

    if (loading) return <p>Loading...</p>
    if (!customer) return <p>Customer not found.</p>

    return (
        <div className="detail-page">
            <div className='page-header'>
                <button className="btn-back" onClick={() => navigate(-1)}>
                    ← Back
                </button>
                <h2>Customer Info</h2>
            </div>
            <div className="modal-info">
                <div className="info-row">
                    <div className="info-box"><span>Name: </span><p>{customer.name}</p></div>
                    <div className="info-box"><span>Phone number: </span><p>{customer.phoneNum}</p></div>
                </div>
                <div className="info-row">
                    <div className="info-box"><span>Gender: </span><p>{displayGender(customer.gender)}</p></div>
                </div>
                <div className="info-row">
                    <div className="info-box"><span>Created at: </span><p>{formatDate(customer.createdAt)}</p></div>
                    <div className="info-box"><span>Last purchase at: </span><p>{formatDate(customer.lastPurchaseDate)}</p></div>
                </div>
                <div className="info-row">
                    <div className="info-box"><span>Note: </span><p>{customer.note}</p></div>
                </div>
                <div className="info-row">
                    <div className="info-box"><span>Total amount purchased: </span><p>{formatCurrency(customer.totalPurchaseAmount)}</p></div>
                </div>
                <div className="info-row">
                    <div className="info-box">
                        <span>Purchase History:</span>
                        {customer.purchases && customer.purchases.length > 0 ? (
                            <table className="purchase-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer.purchases.map(purchase => (
                                        <tr key={purchase.id}>
                                            <td>{formatDate(purchase.purchaseDate)}</td>
                                            <td>{formatCurrency(purchase.amount)}</td>
                                            <td>{purchase.note}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No purchases found.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="page-actions">
                <button className="btn-edit" onClick={() => setShowEditModal(true)}>
                    <i className="bi bi-pencil-square"></i> Edit Customer
                </button>
            </div>
            {showEditModal && (
                <EditCustomerModal
                    customer={customer}
                    closeModal={() => setShowEditModal(false)}
                    refresh={fetchCustomer}
                />
            )}
        </div>
    )
}

export default CustomerDetailPage