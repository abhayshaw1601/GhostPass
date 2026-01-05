import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className='bg-transparent text-white w-full relative z-50'>
            <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-4xl">

                {/* Logo */}
                <div className="logo font-bold text-2xl cursor-pointer">
                    <span className="text-green-500">&lt;</span>
                    <span>Ghost</span><span className="text-green-500">Pass/&gt;</span>
                </div>

                {/* Desktop Navigation */}
                <ul className='hidden md:flex gap-8'>
                    <li>
                        <Link to="/" className='hover:font-bold hover:text-green-500 transition-all duration-200'>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className='hover:font-bold hover:text-green-500 transition-all duration-200'>About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className='hover:font-bold hover:text-green-500 transition-all duration-200'>Contact</Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-green-900/30 rounded-lg transition-all duration-200"
                    aria-label="Toggle mobile menu"
                >
                    <span className={`block w-6 h-0.5 bg-green-500 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-green-500 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`block w-6 h-0.5 bg-green-500 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className='flex flex-col gap-2 px-4 pb-4 bg-green-950/50 backdrop-blur-sm border-t border-green-500/20'>
                    <li>
                        <Link
                            to="/"
                            className='block py-3 px-4 hover:bg-green-900/50 hover:text-green-500 rounded-lg transition-all duration-200'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className='block py-3 px-4 hover:bg-green-900/50 hover:text-green-500 rounded-lg transition-all duration-200'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className='block py-3 px-4 hover:bg-green-900/50 hover:text-green-500 rounded-lg transition-all duration-200'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
