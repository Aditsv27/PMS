Here's a README for your **Patient Management System**:

---

# Patient Management System

A Node.js-based RESTful API for managing patient records, appointments, and user roles (Admin, Doctor, and Patient). The system implements role-based access control using JWT authentication and adheres to secure and organized handling of medical information.

## Features

- **Authentication:**
  - JWT-based user authentication.
  - Role-based access control (Admin, Doctor, Patient).

- **Patient Management:**
  - CRUD operations on patient records.
  - Access control based on user roles.

- **Appointment Management:**
  - Booking and managing appointments.
  - Role-based access control for patients, doctors, and admins.

## Requirements

- Node.js (16+)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd patient-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure `.env` file:

   Create a `.env` file in the root directory and add the following:

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   ```
[PORT=5000
MONGO_URI=mongodb://localhost:27017/patient_management
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d]
4. Start the server:

   ```bash
   npm run start
   ```

5. Import the provided [Postman Collection](PMS.postman_collection.json) into Postman for testing.

## API Endpoints

### Authentication

- **Register User**  
  `POST /api/auth/register`  
  **Body:**  
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "Admin"
  }
  ```

- **Login User**  
  `POST /api/auth/login`  
  **Body:**  
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Patients

- **Get All Patients (Admin/Doctor access)**  
  `GET /api/patients`

- **Create Patient Record (Admin/Doctor access)**  
  `POST /api/patients`  
  **Body:**  
  ```json
  {
    "name": "Jane Doe",
    "age": 25,
    "doctor": "64b2f00f5b7b0d00123abcd5",
    "records": "Patient has mild orthodontic issues."
  }
  ```

- **Update Patient Record (Admin/Doctor access)**  
  `PUT /api/patients/:id`  
  **Body:**  
  ```json
  {
    "name": "Jane Doe Updated",
    "age": 26
  }
  ```

- **Delete Patient Record (Admin access)**  
  `DELETE /api/patients/:id`

### Appointments

- **Create Appointment (Patient access)**  
  `POST /api/appointments`  
  **Body:**  
  ```json
  {
    "doctor": "64b2f00f5b7b0d00123abcd5",
    "patient": "64c3e10d5c7b0f00123efgh6",
    "date": "2025-01-20",
    "time": "10:00 AM",
    "reason": "Consultation for orthodontic treatment."
  }
  ```

- **Get Appointments (Admin/Doctor/Patient access)**  
  `GET /api/appointments`

- **Update Appointment (Doctor/Patient access)**  
  `PUT /api/appointments/:id`  
  **Body:**  
  ```json
  {
    "date": "2025-01-22",
    "time": "11:00 AM",
    "reason": "Follow-up consultation"
  }
  ```

- **Delete Appointment (Admin/Patient access)**  
  `DELETE /api/appointments/:id`

## Postman Collection

Use the provided [Postman Collection](PMS.postman_collection.json) for testing the API. Ensure valid JWT tokens are passed in the `Authorization` header.

## Project Structure

```
/patient-management-system
├── /controllers
│   ├── authController.js
│   ├── patientController.js
│   ├── appointmentController.js
├── /middlewares
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
├── /models
│   ├── User.js
│   ├── Patient.js
│   ├── Appointment.js
├── /routes
│   ├── authRoutes.js
│   ├── patientRoutes.js
│   ├── appointmentRoutes.js
├── /config
│   ├── db.js
├── .env
├── README.md
├── package.json
├── server.js
```

## Known Issues

- Ensure valid Object IDs are used for `doctor` and `patient` fields while testing appointments.
- Double-check `.env` configurations for MongoDB and JWT.

## License

This project is licensed under the MIT License. See `LICENSE` for details.

--- 

This README provides a clear overview of the project, installation, API endpoints, and testing instructions. If you need further assistance or modifications, let me know!server will start on http://localhost:5000. The available API endpoints are as follows:

Authentication
POST /api/auth/register: Register a new user (Admin, Doctor, or Patient).
POST /api/auth/login: Login and obtain a JWT token.
Patients
GET /api/patients: Fetch patient records (Admin/Doctor access).
POST /api/patients: Create a new patient record (Admin/Doctor access).
PUT /api/patients/:id: Update a patient record (Admin/Doctor access).
DELETE /api/patients/:id: Delete a patient record (Admin access).
Appointments
POST /api/appointments: Create an appointment (Patient access).
GET /api/appointments: Fetch appointments (Admin, Doctor, or Patient access based on roles).
PUT /api/appointments/:id: Update an appointment (Doctor/Patient access).
DELETE /api/appointments/:id: Delete an appointment (Admin/Patient access).

