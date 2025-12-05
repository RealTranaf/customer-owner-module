import { useState } from "react"
import { addCustomer } from "../../services/customer-service"

function AddCustomerModal({ closeModal, refresh }) {
    const [form, setForm] = useState({
        name: "",
        phoneNum: "",
        note: "",
        gender: 'NAN'
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await addCustomer(
                form.name,
                form.phoneNum,
                form.gender,
                form.note
            )
            closeModal()
            refresh()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3><i className="bi bi-plus-lg"></i> Add Customer</h3>
                    <i className="bi bi-x-lg modal-close" onClick={closeModal}></i>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone number</label>
                            <input type="text" name="phoneNum" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select name="gender" value={form.gender} onChange={handleChange}>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="NaN">Other/Unknown</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Note</label>
                            <textarea name="note" onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={closeModal} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Customer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCustomerModal