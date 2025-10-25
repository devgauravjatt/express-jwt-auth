# 🛡️ express-jwt-auth - Easy JWT Authentication Made Simple

## 🔗 Repository

[![GitHub](https://img.shields.io/badge/GitHub-express--jwt--auth-blue)](https://github.com/devgauravjatt/express-jwt-auth)

---

## 🚀 Getting Started

Follow these steps to clone and run the application on your computer.

### 🔍 Overview

This application provides authentication and authorization using Node.js, Express, JWT, Sequelize, and MySQL. It includes role management for users and admins, custom middleware, and API documentation via Swagger UI.

## 📥 Installation

### Clone the Repository

```bash
git clone https://github.com/devgauravjatt/express-jwt-auth.git
cd express-jwt-auth
```

### Install Dependencies

```bash
npm install
```

### Set up Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=auth_jwt
JWT_SECRET=your_secret_key
PORT=3000
```

### Set up the Database

Make sure you have MySQL running. Create a database named `auth_jwt`, and the application will automatically set up the necessary tables on first run.

### Start the Application

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

Your application will start running on `http://localhost:3000`.

## 📜 Documentation

The application comes with Swagger UI documentation. Once the server is running, access the documentation by navigating to `http://localhost:3000/api-docs` in your web browser. This documentation provides details on how to use the API endpoints.

## 🎭 Features

- **User Registration**: Users can create accounts.
- **Login**: Users can log in with their credentials securely.
- **Role Management**: Administrators can manage user roles.
- **Token-Based Authentication**: JWT is used for securing routes.
- **Custom Middleware**: Middleware functions enhance security and flexibility.
- **Automated Testing**: Includes tests with Jest and Supertest to ensure reliability.

## 🔧 Technologies Used

This project uses several technologies to deliver its functionality:

- **Node.js**: Fast and scalable JavaScript runtime.
- **Express**: Web framework for building applications.
- **Sequelize**: ORM for interacting with MySQL.
- **JWT**: For secure authentication.
- **Bcrypt.js**: For hashing passwords.
- **Swagger UI**: For API documentation.
- **Jest / Supertest**: For testing.

## 🌐 Community & Support

If you have questions or feedback, feel free to open an issue on the [GitHub repository](https://github.com/devgauravjatt/express-jwt-auth). Your input helps improve the project. Make sure to browse through existing issues for common questions and solutions.

---

## 📝 License

This project is open source and available for use and modification.

---

**Enjoy building secure authentication systems with JWT!**
