# 🔐 GhostPass - Secure Password Manager

A modern, secure password manager built with React and MongoDB that helps you manage your credentials with ease and style.

![GhostPass Banner](https://img.shields.io/badge/GhostPass-Secure%20Password%20Manager-green?style=for-the-badge)

## Features

- **Secure Storage** - All passwords stored in MongoDB with secure handling
- **Modern UI** - Beautiful, responsive design with dark mode aesthetics
- **Mobile Friendly** - Fully responsive across all devices
- **Fast & Efficient** - Built with Vite for lightning-fast performance
- **Real-time Updates** - Instant sync with backend database
- **One-click Copy** - Quick clipboard access for credentials
- **Easy Management** - Edit and delete passwords with simple controls
- **Clean Interface** - Distraction-free, developer-focused design

## Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **TailwindCSS 4** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js & Express** - RESTful API server
- **MongoDB** - NoSQL database for password storage
- **CORS** - Cross-origin resource sharing enabled

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or remote instance)
- npm (comes with Node.js)

## Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd cloud_storage
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=mongodb://localhost:27017
```

Replace with your MongoDB connection string if using a remote database.

## Usage

### Start the Backend Server
Open a terminal and run:
```bash
cd backend
node server.js
```
The server will start on `http://localhost:3000`

### Start the Frontend Development Server
Open another terminal and run:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## Project Structure

```
cloud_storage/
├── backend/
│   ├── server.js          # Express server with API routes
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
├── src/
│   ├── components/
│   │   ├── Home.jsx      # Main password manager interface
│   │   ├── Navbar.jsx    # Navigation component
│   │   ├── About.jsx     # About page
│   │   ├── Contact.jsx   # Contact form
│   │   └── Manager.jsx   # Background gradient component
│   ├── App.jsx           # Main app with routing
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles & Tailwind imports
├── public/               # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Frontend dependencies
```

## API Endpoints

### Get All Passwords
```
GET http://localhost:3000/
```
Returns an array of all stored passwords.

### Save New Password
```
POST http://localhost:3000/
Content-Type: application/json

{
  "site": "https://example.com",
  "username": "user@example.com",
  "password": "securepassword123",
  "id": "unique-uuid"
}
```

### Delete Password
```
DELETE http://localhost:3000/
Content-Type: application/json

{
  "id": "password-unique-id"
}
```

## Features in Detail

### Password Management
- Add new passwords with website URL, username, and password
- View all saved passwords in a clean table format
- Edit existing passwords with one click
- Delete passwords with confirmation
- Show/hide password visibility

### Security
- Passwords stored in MongoDB database
- Unique UUID for each password entry
- Secure API communication between frontend and backend

### User Experience
- Toast notifications for all actions
- Copy-to-clipboard functionality for all fields
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Dark mode with green accent theme

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with ❤️ using React and TailwindCSS
- Icons by [Lord Icon](https://lordicon.com/)
- Inspired by modern password management solutions

## Contact

For questions or support, visit the [Contact Page](http://localhost:5173/contact) in the application.

---

**Security Note**: This is a demonstration project. For production use, implement additional security measures such as encryption at rest, user authentication, and secure password hashing.
