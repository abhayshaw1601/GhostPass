// App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Your new Home component
import About from './components/About';
import Contact from './components/Contact';
import Manager from './components/Manager';

function App() {
  return (
    // The Router typically goes here (or in main.jsx)
    <BrowserRouter>

      
      {/* Navbar is OUTSIDE Routes, so it stays on every page */}
      <Navbar /> 

      <Manager />

      {/* Routes determine what renders BELOW the Navbar */}
      <Routes>
        {/* The path "/" will render Home.jsx */}
        <Route path="/" element={<Home />} />
        
        {/* The path "/about" will replace Home with About */}
        <Route path="/about" element={<About />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;