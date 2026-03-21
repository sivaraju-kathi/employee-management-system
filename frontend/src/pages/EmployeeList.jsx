import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import EmployeeService from '../services/EmployeeService'

// ============================================
//   EmployeeList.jsx
//   Shows all employees in a table
//   Actions: Edit → goes to edit page
//            Delete → deletes with confirmation
// ============================================

const deptStyle = {
  Engineering: { bg: '#e8f4fd', color: '#1565c0', dot: '#1976d2' },
  Design:      { bg: '#fce4ec', color: '#ad1457', dot: '#e91e63' },
  HR:          { bg: '#e8f5e9', color: '#2e7d32', dot: '#43a047' },
  Finance:     { bg: '#fff8e1', color: '#f57f17', dot: '#ffa000' },
  Marketing:   { bg: '#f3e5f5', color: '#6a1b9a', dot: '#8e24aa' },
  Operations:  { bg: '#e0f2f1', color: '#00695c', dot: '#00897b' },
}

function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [search, setSearch]       = useState('')
  const [loading, setLoading]     = useState(true)
  const navigate = useNavigate()

  // Load all employees on page mount
  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = () => {
    setLoading(true)
    EmployeeService.getAllEmployees()
      .then(res => {
        setEmployees(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        toast.error('Failed to load employees')
        setLoading(false)
      })
  }

  // Delete employee
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      EmployeeService.deleteEmployee(id)
        .then(() => {
          toast.success('Employee deleted successfully')
          fetchEmployees()   // Refresh list
        })
        .catch(() => toast.error('Failed to delete employee'))
    }
  }

  // Filter employees by search input
  const filtered = employees.filter(e =>
    `${e.firstName} ${e.lastName} ${e.email} ${e.department} ${e.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  if (loading) {
    return <div style={styles.loading}>Loading employees...</div>
  }

  return (
    <div>

      {/* Header Row */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.heading}>All Employees</h2>
          <p style={styles.subtext}>{employees.length} total employees</p>
        </div>
        <div style={styles.searchBox}>
          <span>🔍</span>
          <input
            style={styles.searchInput}
            placeholder="Search by name, email, department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button style={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <p>No employees found</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Employee</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Position</th>
                <th style={styles.th}>Salary</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, idx) => {
                const ds = deptStyle[emp.department] || deptStyle['Operations']
                return (
                  <tr key={emp.id} style={styles.tr}>
                    <td style={styles.td}>{idx + 1}</td>
                    <td style={styles.td}>
                      <div style={styles.nameCell}>
                        <div style={{ ...styles.avatar, background: ds.bg, color: ds.color }}>
                          {emp.firstName[0]}{emp.lastName[0]}
                        </div>
                        <span style={styles.fullName}>{emp.firstName} {emp.lastName}</span>
                      </div>
                    </td>
                    <td style={{ ...styles.td, color: '#555' }}>{emp.email}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, background: ds.bg, color: ds.color }}>
                        <span style={{ ...styles.dot, background: ds.dot }} />
                        {emp.department}
                      </span>
                    </td>
                    <td style={{ ...styles.td }}>{emp.position}</td>
                    <td style={{ ...styles.td, fontWeight: 600, color: '#2e7d32' }}>
                      ₹{emp.salary.toLocaleString()}
                    </td>
                    <td style={{ ...styles.td, color: '#666' }}>{emp.phone || '—'}</td>
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button
                          style={styles.editBtn}
                          onClick={() => navigate(`/edit/${emp.id}`)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          style={styles.deleteBtn}
                          onClick={() => handleDelete(emp.id, `${emp.firstName} ${emp.lastName}`)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}

const styles = {
  loading: { textAlign: 'center', padding: 60, color: '#666', fontSize: 16 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, width: '100%'},
  heading: { fontSize: 22, fontWeight: 700, color: '#1a237e', margin: 0, fontFamily: 'Segoe UI, sans-serif' },
  subtext: { fontSize: 13, color: '#888', margin: '4px 0 0', fontFamily: 'Segoe UI, sans-serif' },
  searchBox: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: '#fff', border: '1px solid #e0e0e0',
    borderRadius: 8, padding: '0 14px', width: 320,
  },
  searchInput: { flex: 1, border: 'none', outline: 'none', padding: '10px 0', fontSize: 13 },
  clearBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#999' },
  tableWrapper: { background: '#fff', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.07)', overflow: 'hidden', width: '100%' },
  empty: { padding: 60, textAlign: 'center', color: '#888' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: '#f8f9fa' },
  th: { padding: '13px 16px', fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #eee', textAlign: 'left', fontFamily: 'Segoe UI, sans-serif' },
  tr: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '13px 16px', fontSize: 13, color: '#333', verticalAlign: 'middle', fontFamily: 'Segoe UI, sans-serif' },
  nameCell: { display: 'flex', alignItems: 'center', gap: 10 },
  avatar: { width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 },
  fullName: { fontWeight: 600, color: '#222' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600 },
  dot: { width: 5, height: 5, borderRadius: '50%' },
  actions: { display: 'flex', gap: 8 },
  editBtn: { background: '#e3f2fd', color: '#1565c0', border: 'none', borderRadius: 6, padding: '5px 11px', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  deleteBtn: { background: '#fce4ec', color: '#c62828', border: 'none', borderRadius: 6, padding: '5px 11px', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
}

export default EmployeeList
