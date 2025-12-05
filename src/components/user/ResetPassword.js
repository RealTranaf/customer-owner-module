import { useState } from "react"
import { resetPassword } from "../../services/auth-service"

function ResetPassword({ user, closeModal, refresh }) {
    const [form, setForm] = useState({
        phoneNum: user.phoneNum,
        newPassword: ''
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await resetPassword(
                form.phoneNum,
                form.newPassword
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
                    <h3><i className="bi bi-plus-lg"></i> Reset Password</h3>
                    <i className="bi bi-x-lg" onClick={closeModal}></i>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" name="phoneNum" value={form.phoneNum} required disabled onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" name="newPassword" value={form.newPassword} required onChange={handleChange} />
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={closeModal} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? "Adding..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword