import axios from 'axios'

// ============================================
//   EmployeeService.js
//   All HTTP calls to Spring Boot backend
//   Base URL: http://localhost:8080/api/employees
// ============================================

const BASE_URL = "https://employee-management-system.up.railway.app/api/employees";

const EmployeeService = {

  // GET all employees
  getAllEmployees: () => {
    return axios.get(BASE_URL)
  },

  // GET single employee by ID
  getEmployeeById: (id) => {
    return axios.get(`${BASE_URL}/${id}`)
  },

  // POST create new employee
  createEmployee: (employeeData) => {
    return axios.post(BASE_URL, employeeData)
  },

  // PUT update existing employee
  updateEmployee: (id, employeeData) => {
    return axios.put(`${BASE_URL}/${id}`, employeeData)
  },

  // DELETE employee
  deleteEmployee: (id) => {
    return axios.delete(`${BASE_URL}/${id}`)
  },
}

export default EmployeeService
