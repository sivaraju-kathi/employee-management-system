import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import EmployeeList from './pages/EmployeeList'
import AddEditEmployee from './pages/AddEditEmployee'

// ============================================
//   App.jsx - Main Router
//   /           → Employee List page
//   /add        → Add new employee
//   /edit/:id   → Edit existing employee
// ============================================

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>

      {/* Top Navigation Bar */}
      <Navbar />

      {/* Page Routes */}
      <div style={{ padding: '30px 40px' }}>
        <Routes>
          <Route path="/"          element={<EmployeeList />} />
          <Route path="/add"       element={<AddEditEmployee />} />
          <Route path="/edit/:id"  element={<AddEditEmployee />} />
          <Route path="*"          element={<Navigate to="/" />} />
        </Routes>
      </div>

    </div>
  )
}

export default App
