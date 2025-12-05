import { formatDate, formatCurrency } from '../../services/formatting'

function CustomerModal({ customer, closeModal, refresh, onEdit }){
    
    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <h3 className="modal-title"><i className="bi bi-info-circle"></i>Customer Info</h3>
                    <i className="bi bi-x-lg modal-close" onClick={closeModal}></i>
                </div>
                <div className="modal-info">
                    <div className="info-row">
                        <div className="info-box"><span>Name: </span><p>{customer.name}</p></div>
                        <div className="info-box"><span>Phone number: </span><p>{customer.phoneNum}</p></div>
                        <div className="info-box"><span>Gender: </span><p>{customer.gender}</p></div>
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
                <div className="modal-actions">
                    <button className="btn-edit" onClick={() => onEdit(customer)}>
                        <i className="bi bi-pencil-square"></i> Edit Customer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomerModal