import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from './Footer';

const Signup = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '', age: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/create", {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            // Backend returns { success: true, user: createdUser }
            if (data.success) {
                alert("Identity Created Successfully!");
                navigate("/login"); // Navigate to home since user is now logged in with cookie
            } else {
                alert(data.error || "Signup failed. Please check your details.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Error connecting to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full glass-card p-8 sm:p-10 rounded-2xl animate-fade-in-up">
                    <h2 className="text-4xl text-white font-bold text-center mb-2">
                        <span className="text-emerald-400">&lt;</span>
                        Ghost<span className="text-emerald-400">Pass/&gt;</span>
                    </h2>
                    <p className="text-slate-300 text-center mb-8">Establish your secure identity.</p>

                    <form onSubmit={handleSignup} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-emerald-400 text-xs font-semibold ml-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                required
                                value={form.username}
                                onChange={handleChange}
                                placeholder="ghost_agent"
                                className="border border-slate-600 rounded-lg p-4 py-2.5 bg-[var(--navy-800)] text-[var(--slate-100)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-emerald-400 text-xs font-semibold ml-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="agent@vault.com"
                                className="border border-slate-600 rounded-lg p-4 py-2.5 bg-[var(--navy-800)] text-[var(--slate-100)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-emerald-400 text-xs font-semibold ml-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create a strong key"
                                className="border border-slate-600 rounded-lg p-4 py-2.5 bg-[var(--navy-800)] text-[var(--slate-100)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-emerald-400 text-xs font-semibold ml-1">Age</label>
                            <input
                                type="number"
                                name="age"
                                required
                                value={form.age}
                                onChange={handleChange}
                                placeholder="Your Age"
                                className="border border-slate-600 rounded-lg p-4 py-2.5 bg-[var(--navy-800)] text-[var(--slate-100)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-[var(--navy-950)] font-bold py-3 rounded-lg mt-4 transition-all duration-200 shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50"
                        >
                            {loading ? "Encrypting..." : "Create Identity"}
                        </button>
                    </form>

                    <p className="text-[var(--slate-300)] text-center mt-6 text-sm">
                        Already have an identity? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 hover:underline font-bold transition-colors">Login</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;