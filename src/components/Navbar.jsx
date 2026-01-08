import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // State to track authentication status
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();



    // Re-check authentication whenever the URL changes
    useEffect(() => {
        // We use a small flag in localStorage because we can't read httpOnly cookies
        const authFlag = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(authFlag === "true");
    }, [location]);

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:3000/logout", {
                method: "GET",
                credentials: "include" // Crucial: Tells the browser to send the cookie to be cleared
            });

            if (res.ok) {
                // Clear the local flag and redirect
                localStorage.removeItem("isLoggedIn");
                setIsLoggedIn(false);
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className='glass-subtle w-full sticky top-0 z-50 backdrop-blur-md transition-colors duration-300'>
            <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-6xl">

                {/* Logo */}
                <div className="flex items-center gap-4">
                    <div className="logo font-bold text-2xl cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate("/")}>
                        <span className="text-emerald-400">&lt;</span>
                        <span className="text-[var(--slate-100)]">Ghost</span><span className="text-emerald-400">Pass/&gt;</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <ul className='hidden md:flex items-center gap-8'>
                    <li>
                        <Link to="/" className='hover:text-emerald-400 transition-colors duration-200 relative group'>
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-200"></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className='hover:text-emerald-400 transition-colors duration-200 relative group'>
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-200"></span>
                        </Link>
                    </li>



                    {/* Conditional Login/Logout Button */}
                    <li className="flex items-center">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className='flex items-center gap-2 bg-red-600/20 hover:bg-red-600 border border-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30'
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/gwvmctbb.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: '20px', height: '20px' }}>
                                </lord-icon>
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className='bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-navy-950 px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-emerald-500/50'
                            >
                                Login
                            </Link>
                        )}
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-emerald-500/20 rounded-lg transition-all duration-200"
                >
                    <span className={`block w-6 h-0.5 bg-emerald-400 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-emerald-400 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`block w-6 h-0.5 bg-emerald-400 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className='flex flex-col gap-2 px-4 pb-4 bg-navy-900/95 backdrop-blur-md border-t border-emerald-500/20'>
                    <li><Link to="/" className='block py-3 px-4 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all' onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/about" className='block py-3 px-4 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all' onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
                    <li className="px-4">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className='w-full text-left py-3 text-red-400 font-bold hover:text-red-300 transition-colors'>Logout</button>
                        ) : (
                            <Link to="/login" className='block py-3 text-emerald-400 font-bold hover:text-emerald-300 transition-colors' onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar