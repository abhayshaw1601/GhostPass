# 🔐 GhostPass - Secure Password Manager

A robust, secure password manager built with the **MERN Stack** (MongoDB, Express, React, Node.js) that helps you manage your digital credentials with military-grade encryption and a modern, distraction-free **Dark Mode UI**.

![GhostPass Banner](https://img.shields.io/badge/GhostPass-v1.0-emerald?style=for-the-badge&logo=security)

## 🚀 Features

- **🛡️ Secure Storage**: End-to-end encryption for stored passwords using AES.
- **🔐 JWT Authentication**: Secure, HttpOnly cookie-based authentication flow (Login/Signup).
- **⚡ Modern Tech**: Built with React 19, Vite, and TailwindCSS 4.
- **📱 Responsive**: Glassmorphism UI that adapts seamlessly to all devices.
- **📋 One-Click Actions**: Instant copy-to-clipboard for usernames and passwords.
- **👁️ Privacy First**: Toggle password visibility and secure logout functionality.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Latest standard for building user interfaces.
- **Vite 7**: Lightning-fast build tool and dev server.
- **TailwindCSS 4**: Utility-first CSS framework for custom design systems.
- **React Router 7**: Client-side routing for seamless navigation.

### Backend
- **Node.js & Express**: Scalable RESTful API server.
- **MongoDB & Mongoose**: NoSQL database for flexible data storage.
- **JWT (JSON Web Tokens)**: Secure stateless authentication.
- **Bcrypt**: Industrial-strength password hashing.
- **Crypto-JS**: AES encryption for storing sensitive vault data.

## 📦 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas instance)

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/abhayshaw1601/GhostPass
cd cloud_storage
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017/ghostpass
JWT_SECRET=your_super_secret_jwt_key
ENCRYPTION_KEY=your_password_encryption_key
PORT=3000
```
> **Note**: `ENCRYPTION_KEY` is used to encrypt user passwords before storing them in the database. Keep it safe!

## 🏃 Usage

### Start Backend Server
```bash
cd backend
node server.js
```
Server runs on: `http://localhost:3000`

### Start Frontend Client
Open a new terminal in the root folder:
```bash
npm run dev
```
Client runs on: `http://localhost:5173`

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| **POST** | `/create` | Register a new user account | ❌ |
| **POST** | `/login` | Authenticate user & set cookie | ❌ |
| **GET** | `/logout` | Clear auth cookie | ✅ |
| **GET** | `/` | Retrieve all encrypted passwords | ✅ |
| **POST** | `/` | Encrypt & save a new password | ✅ |
| **DELETE** | `/` | Delete a specific credential | ✅ |

## 📂 Project Structure

```
cloud_storage/
├── backend/
│   ├── models/            # Mongoose Schemas (User, Password)
│   ├── server.js          # REST API & Authentication Logic
│   └── .env               # Secrets (Not committed)
├── src/
│   ├── components/
│   │   ├── Home.jsx       # Main Vault Dashboard
│   │   ├── Login.jsx      # Authentication Page
│   │   ├── Signup.jsx     # Registration Page
│   │   ├── Navbar.jsx     # Responsive Navigation
│   │   ├── About/Contact  # Static Info Pages
│   │   └── Manager.jsx    # UI Background Layout
│   ├── index.css          # Tailwind & Custom Design System
│   └── main.jsx           # Entry Point
└── README.md              # Documentation
```

## 🤝 Contributing

Contributions are welcome!
1. Fork the repo.
2. Create feature branch (`git checkout -b feature/NewFeature`).
3. Commit changes (`git commit -m 'Add NewFeature'`).
4. Push to branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---
*Built with ❤️ for privacy enthusiasts.*
