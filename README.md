# Employee Management System

Full Stack Web Application — Spring Boot + React + MySQL

## Tech Stack
- **Backend** — Java 17, Spring Boot MySQL
- **Frontend** — React 18, Vite, Axios, React Router
- **Database** — MySQL
- **Tools** — Maven, Git, Postman, Eclipse, VS Code

## Features
- Add, View, Edit, Delete employees
- Real-time search by name, email, department
- Form validation with error messages
- Department color-coded badges
- Responsive UI

## How to Run

### Backend
```bash
cd backend
# Update application.properties with your MySQL password
mvn spring-boot:run
# Runs on http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## API Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/employees | Get all employees |
| POST | /api/employees | Create new employee |
| GET | /api/employees/{id} | Get employee by ID |
| PUT | /api/employees/{id} | Update employee |
| DELETE | /api/employees/{id} | Delete employee |

## Project Structure
```
employee-management-system/
├── backend/         ← Spring Boot REST API
│   ├── src/main/java/com/ems/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── entity/
│   │   ├── dto/
│   │   └── exception/
│   └── pom.xml
└── frontend/        ← React UI
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    └── package.json
```
