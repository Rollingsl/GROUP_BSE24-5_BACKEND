# Docease: A Backend Application for Healthcare Management

**Docease** is a backend application designed to enhance healthcare management services by providing efficient access and management of patient data. Utilizing PostgreSQL for its database, Docease aims to streamline various healthcare processes, ensuring that medical records are accurately and reliably accessible.

## Features

- **Efficient Management of Patient Records**: Facilitates easy handling of patient information.
- **PostgreSQL Database Integration**: Ensures robust data storage and retrieval.
- **Scalable and Robust Backend Architecture**: Built to support growing healthcare needs.
- **Easy-to-Use Setup and Deployment Process**: Simplifies the installation and configuration for users.

## Tech Stack

- **Node.js**: JavaScript runtime for building the backend.
- **PostgreSQL**: Relational database for storing data.
- **Sequelize**: ORM for managing database interactions.
- **pnpm**: Fast package manager for dependency management.

## Setup

### Prerequisites

Ensure the following are installed:

- Node.js (v14 or later)
- PostgreSQL (ensure the database is running and accessible)
- pnpm (install globally using `npm install -g pnpm`)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/docease.git
   cd docease
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```bash
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=docease_db
     ```

4. **Set Up the PostgreSQL Database**:
   - Log into your PostgreSQL instance:
     ```bash
     psql -U your_db_user
     CREATE DATABASE docease_db;
     ```

5. **Run Database Migrations (if any)**:
   ```bash
   pnpm run migrate
   ```

6. **Start the Application**:
   ```bash
   pnpm start
   ```
   The application should now be running at `http://localhost:3000`.

## Running Tests

To ensure the application's functionality, run:
```bash
pnpm test
```

## API Documentation

The API provides various endpoints to manage patients and healthcare records:

### Patient Endpoints

- `GET /patients`: Retrieve a list of all patients.
- `POST /patients`: Add a new patient.
- `GET /patients/{id}`: Retrieve a specific patient by ID.
- `PUT /patients/{id}`: Update patient details by ID.
- `DELETE /patients/{id}`: Delete a patient by ID.

### Medical Record Endpoints

- `GET /records`: Retrieve all medical records.
- `POST /records`: Add a new medical record.
- `GET /records/{id}`: Retrieve a medical record by ID.
- `PUT /records/{id}`: Update a medical record by ID.
- `DELETE /records/{id}`: Delete a medical record by ID.

## Contributing

To contribute to Docease:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make changes and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, reach out at your-email@example.com.


