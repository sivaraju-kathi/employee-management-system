import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import EmployeeService from '../services/EmployeeService'

// ============================================
//   AddEditEmployee.jsx
//   Used for BOTH Add and Edit
//   If URL has :id  → Edit mode (loads data)
//   If no :id       → Add mode (empty form)
// ============================================

const DEPARTMENTS = ['Engineering', 'Design', 'HR', 'Finance', 'Marketing', 'Operations']

const emptyForm = {
  firstName:  '',
  lastName:   '',
  email:      '',
  department: '',
  position:   '',
  salary:     '',
  phone:      '',
}

function AddEditEmployee() {
  const [form, setForm]     = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { id }   = useParams()           // id exists → Edit mode
  const isEdit   = Boolean(id)

  // If Edit mode, load employee data into form
  useEffect(() => {
    if (isEdit) {
      EmployeeService.getEmployeeById(id)
        .then(res => {
          const emp = res.data
          setForm({
            firstName:  emp.firstName,
            lastName:   emp.lastName,
            email:      emp.email,
            department: emp.department,
            position:   emp.position,
            salary:     emp.salary.toString(),
            phone:      emp.phone || '',
          })
        })
        .catch(() => {
          toast.error('Employee not found')
          navigate('/')
        })
    }
  }, [id])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Validate form
  const validate = () => {
    const newErrors = {}
    if (!form.firstName.trim())  newErrors.firstName  = 'First name is required'
    if (!form.lastName.trim())   newErrors.lastName   = 'Last name is required'
    if (!form.email.trim())      newErrors.email      = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.department)        newErrors.department = 'Department is required'
    if (!form.position.trim())   newErrors.position   = 'Position is required'
    if (!form.salary)            newErrors.salary     = 'Salary is required'
    else if (isNaN(form.salary) || Number(form.salary) <= 0) newErrors.salary = 'Enter a valid salary'
    return newErrors
  }

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const payload = { ...form, salary: Number(form.salary) }
    setLoading(true)

    if (isEdit) {
      // UPDATE employee
      EmployeeService.updateEmployee(id, payload)
        .then(() => {
          toast.success('Employee updated successfully!')
          navigate('/')
        })
        .catch(err => {
          toast.error(err.response?.data?.message || 'Update failed')
          setLoading(false)
        })
    } else {
      // CREATE employee
      EmployeeService.createEmployee(payload)
        .then(() => {
          toast.success('Employee added successfully!')
          navigate('/')
        })
        .catch(err => {
          toast.error(err.response?.data?.message || 'Failed to add employee')
          setLoading(false)
        })
    }
  }

  return (
    <div style={styles.page}>

      {/* Page Title */}
      <div style={styles.titleRow}>
        <button style={styles.backBtn} onClick={() => navigate('/')}>← Back</button>
        <h2 style={styles.title}>
          {isEdit ? '✏️ Edit Employee' : '➕ Add New Employee'}
        </h2>
      </div>

      {/* Form Card */}
      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>

            {/* First Name */}
            <div style={styles.group}>
              <label style={styles.label}>First Name *</label>
              <input
                name="firstName"
                style={{ ...styles.input, ...(errors.firstName ? styles.inputErr : {}) }}
                placeholder="e.g. Arjun"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span style={styles.err}>{errors.firstName}</span>}
            </div>

            {/* Last Name */}
            <div style={styles.group}>
              <label style={styles.label}>Last Name *</label>
              <input
                name="lastName"
                style={{ ...styles.input, ...(errors.lastName ? styles.inputErr : {}) }}
                placeholder="e.g. Sharma"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span style={styles.err}>{errors.lastName}</span>}
            </div>

            {/* Email - full width */}
            <div style={{ ...styles.group, gridColumn: 'span 2' }}>
              <label style={styles.label}>Email Address *</label>
              <input
                name="email"
                style={{ ...styles.input, ...(errors.email ? styles.inputErr : {}) }}
                placeholder="e.g. arjun@company.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span style={styles.err}>{errors.email}</span>}
            </div>

            {/* Department */}
            <div style={styles.group}>
              <label style={styles.label}>Department *</label>
              <select
                name="department"
                style={{ ...styles.input, ...(errors.department ? styles.inputErr : {}) }}
                value={form.department}
                onChange={handleChange}
              >
                <option value="">-- Select Department --</option>
                {DEPARTMENTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.department && <span style={styles.err}>{errors.department}</span>}
            </div>

            {/* Position */}
            <div style={styles.group}>
              <label style={styles.label}>Position *</label>
              <input
                name="position"
                style={{ ...styles.input, ...(errors.position ? styles.inputErr : {}) }}
                placeholder="e.g. Software Engineer"
                value={form.position}
                onChange={handleChange}
              />
              {errors.position && <span style={styles.err}>{errors.position}</span>}
            </div>

            {/* Salary */}
            <div style={styles.group}>
              <label style={styles.label}>Salary (₹) *</label>
              <input
                name="salary"
                type="number"
                style={{ ...styles.input, ...(errors.salary ? styles.inputErr : {}) }}
                placeholder="e.g. 75000"
                value={form.salary}
                onChange={handleChange}
              />
              {errors.salary && <span style={styles.err}>{errors.salary}</span>}
            </div>

            {/* Phone */}
            <div style={styles.group}>
              <label style={styles.label}>Phone</label>
              <input
                name="phone"
                style={styles.input}
                placeholder="e.g. 9876543210"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Buttons */}
          <div style={styles.btnRow}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.submitBtn}
              disabled={loading}
            >
              {loading
                ? 'Saving...'
                : isEdit ? 'Update Employee' : 'Add Employee'
              }
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}

const styles = {
  page: { maxWidth: 700, margin: '0 auto' },
  titleRow: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 },
  backBtn: { background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, color: '#555', fontFamily: 'Segoe UI, sans-serif' },
  title: { fontSize: 20, fontWeight: 700, color: '#1a237e', margin: 0, fontFamily: 'Segoe UI, sans-serif' },
  card: { background: '#fff', borderRadius: 14, padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  group: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#444', fontFamily: 'Segoe UI, sans-serif' },
  input: {
    border: '2px solid #e8e8e8', borderRadius: 8,
    padding: '10px 13px', fontSize: 14, outline: 'none',
    fontFamily: 'Segoe UI, sans-serif', width: '100%',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  },
  inputErr: { borderColor: '#f44336' },
  err: { fontSize: 11, color: '#f44336' },
  btnRow: { display: 'flex', gap: 12, marginTop: 28, justifyContent: 'flex-end' },
  cancelBtn: { background: '#f5f5f5', color: '#555', border: 'none', borderRadius: 8, padding: '11px 24px', fontWeight: 600, cursor: 'pointer', fontSize: 14, fontFamily: 'Segoe UI, sans-serif' },
  submitBtn: { background: 'linear-gradient(135deg, #1a237e, #283593)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 28px', fontWeight: 600, cursor: 'pointer', fontSize: 14, fontFamily: 'Segoe UI, sans-serif' },
}

export default AddEditEmployee
