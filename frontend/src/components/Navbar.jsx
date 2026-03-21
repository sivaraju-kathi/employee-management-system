import { Link, useLocation } from 'react-router-dom'

// ============================================
//   Navbar.jsx - Top Navigation Bar
// ============================================

function Navbar() {
  const location = useLocation()

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>👥</span>
        <span style={styles.title}>Employee Management System</span>
      </div>
      <div style={styles.right}>
        <Link
          to="/"
          style={{
            ...styles.link,
            ...(location.pathname === '/' ? styles.activeLink : {})
          }}
        >
          All Employees
        </Link>
        <Link
          to="/add"
          style={{
            ...styles.addBtn,
            ...(location.pathname === '/add' ? styles.addBtnActive : {})
          }}
        >
          + Add Employee
        </Link>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #1a237e, #283593)',
    padding: '0 40px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    fontSize: 24,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 700,
    fontFamily: 'Segoe UI, sans-serif',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  link: {
    color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'Segoe UI, sans-serif',
  },
  activeLink: {
    color: '#fff',
    borderBottom: '2px solid #fff',
    paddingBottom: 2,
  },
  addBtn: {
    background: '#fff',
    color: '#1a237e',
    padding: '8px 18px',
    borderRadius: 8,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: 'Segoe UI, sans-serif',
  },
  addBtnActive: {
    background: '#e8eaf6',
  },
}

export default Navbar
