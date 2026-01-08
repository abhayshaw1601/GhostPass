import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from './Footer';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (ex) => {
        ex.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    // This header tells Express to use the JSON parser
                    "Content-Type": "application/json",
                },
                credentials: "include",
                // Ensure you are passing the object directly into stringify
                body: JSON.stringify({ email: form.email, password: form.password })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("isLoggedIn", "true");
                // 3. Navigate to Home on success
                navigate("/");
            } else {
                alert(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };


    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full glass-card p-8 sm:p-10 rounded-2xl animate-fade-in-up">
                    <h2 className="text-4xl text-[var(--slate-100)] font-bold text-center mb-2">
                        <span className="text-emerald-400">&lt;</span>
                        Ghost<span className="text-emerald-400">Pass/&gt;</span>
                    </h2>
                    <p className="text-[var(--slate-300)] text-center mb-8">Welcome back, Agent.</p>

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-emerald-400 text-sm font-semibold ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="agent@ghostpass.com"
                                className="border border-slate-600 rounded-lg p-4 py-3 bg-[var(--navy-800)] text-[var(--slate-100)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-emerald-400 text-sm font-semibold ml-1">Secret Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="border border-slate-600 rounded-lg p-4 py-3 bg-[var(--navy-800)] text-[var(--slate-100)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-[var(--navy-950)] font-bold py-3 rounded-lg mt-4 transition-all duration-200 shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50"
                        >
                            {loading ? "Decrypting..." : "Login to Vault"}
                        </button>
                    </form>

                    <p className="text-[var(--slate-300)] text-center mt-6 text-sm">
                        New here? <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 hover:underline font-bold transition-colors">Create an Identity</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;