# SaludPlus - Healthcare Management System

A robust medical management system built with a **hybrid database architecture**, utilizing **MySQL** for transactional data (appointments, doctors) and **MongoDB** for consolidated patient medical histories.

## Key Features
- **Bulk Data Loading:** Effortlessly process CSV files with 50+ records using Node.js streams.
- **Hybrid Synchronization:** Automatic data flow between SQL and NoSQL environments.
- **Patient CRUD:** Complete management (Create, Read, Update, Delete) of patient records.
- **Scalable Architecture:** Clean code structure following the MVC (Model-View-Controller) pattern.

## Tech Stack
- **Backend:** Node.js & Express.js
- **Relational DB:** MySQL (managed via mysql2/sequelize)
- **NoSQL DB:** MongoDB (managed via Mongoose)
- **File Processing:** Multer (file uploads) & CSV-Parser

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   ```

Install dependencies:

Bash
npm install
Environment Variables:
Create a .env file in the root directory and add your credentials:

Fragmento de código
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=saludplusplus
MONGO_URI=mongodb://localhost:27017/saludplusplus
Run the server:

Bash
# For development (with nodemon)
npm run dev

# For production
npm start
📂 API Endpoints
Bulk Operations
POST /api/bulk - Upload a CSV file to populate the database.

Patient Management
GET /api/patients - Retrieve all patients.

GET /api/patients/:id - Get a specific patient by ID.

POST /api/patients - Register a new patient.

PUT /api/patients/:id - Update patient information.

DELETE /api/patients/:id - Remove a patient record.