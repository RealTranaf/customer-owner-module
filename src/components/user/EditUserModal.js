import { useState } from "react"
import { updateUser } from "../../services/user-service"

function EditUserModal({user, closeModal, refresh, onReset}) {
    const [form, setForm] = useState({
        username: user.username,
        name: user.name,
        phoneNum: user.phoneNum,
        active: user.active,
        role: user.role
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await updateUser(
                user.id,
                form.username,
                form.name,
                form.phoneNum,
                form.active,
                form.role
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
                    <h3><i className="bi bi-plus-lg"></i> Edit User</h3>
                    <i className="bi bi-x-lg" onClick={closeModal}></i>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" value={form.username} required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" name="phoneNum" value={form.phoneNum} required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={form.name} required onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Role</label>
                            <select name="role" value={form.role} onChange={handleChange}>
                                <option value="SALES">Nhân viên Sales</option>
                                <option value="CS">Nhân viên CSKH</option>
                                <option value="WAREHOUSE">Quản lý sản phẩm</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Active Status</label>
                            <select name="active" value={form.active} onChange={handleChange}>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
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

export default EditUserModal