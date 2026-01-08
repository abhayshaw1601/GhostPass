// Home.jsx
import React from 'react'
import { use } from 'react';
import { useRef, useState, useEffect } from 'react'

function Home() {

    const [form, setform] = useState({ site: "", password: "", username: "" })
    const [passwordArr, setPasswordArr] = useState([])
    const [toast, setToast] = useState({ show: false, message: "" });
    let id = useRef(0);


    // 2. Create a helper function to handle copy + toast
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        setToast({ show: true, message: "Copied to Clipboard!" });

        // Hide after 2 seconds
        setTimeout(() => {
            setToast({ show: false, message: "" });
        }, 2000);
    };

    const getPassword = async () => {
        try {
            let req = await fetch("http://localhost:3000/", {
                credentials: 'include'
            }); // Added await here
            let passwords = await req.json(); // Use .json() instead of .JSON

            // Safety check: ensure the data is actually an array
            if (Array.isArray(passwords)) {
                setPasswordArr(passwords);
            } else {
                setPasswordArr([]);
            }
            console.log(passwords);
        } catch (error) {
            console.error("Failed to fetch passwords:", error);
            setPasswordArr([]); // Set to empty array so the app doesn't crash
        }
    }
    useEffect(() => {
        getPassword();
    }, [])



    const showPassword = () => {
        if (document.getElementById("password").type === "password") {
            document.getElementById("password").type = "text";
            // document.getElementById("show").innerHTML = "Hide";
        }
        else {
            document.getElementById("password").type = "password";
            // document.getElementById("show").innerHTML = "Show";
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?");
        if (c) {
            // Filter out the item with the specific id
            let newPasswordArr = passwordArr.filter(item => item.id !== id);

            // Update State
            setPasswordArr(newPasswordArr);

            // Update Local Storage
            let req = await fetch(`http://localhost:3000/`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ id })
            });
            // localStorage.setItem("passwords", JSON.stringify(newPasswordArr));

            // Optional: Show toast
            setToast({ show: true, message: "Password Deleted!" });
            setTimeout(() => setToast({ show: false, message: "" }), 2000);
        }
    }

    const editPassword = async (id) => {
        console.log("Password is editing : ", id);
        setform(passwordArr.find(item => item.id === id))
        setPasswordArr(passwordArr.filter(item => item.id !== id))
        try {
            let req = await fetch(`http://localhost:3000/`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ id })
            });
        } catch (error) {
            console.error("Error deleting password during edit:", error);
        }
    }

    const savePassword = async () => {
        if (form.site === "" || form.username === "" || form.password === "") {
            alert("Please fill all the fields");
            return;
        }
        else {
            try {
                const newPassword = { ...form, id: crypto.randomUUID() };
                setPasswordArr([...passwordArr, newPassword]);
                let req = await fetch("http://localhost:3000/", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify({ ...newPassword })
                });
                // localStorage.setItem("passwords", JSON.stringify(),);
                console.log("Saved Password:", passwordArr);
                setform({ site: "", password: "", username: "", id: "" });

                setToast({ show: true, message: "Password Saved Successfully!" })
                setTimeout(() => {
                    setToast({ show: false, message: "" })
                }, 2000)
            }
            catch (e) {
                console.log("while saving password", e);
            }
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handlekeydown = (e) => {
        if (e.key === 'Enter') {
            savePassword();
        }
    }


    return (
        <>
            {toast.show && (
                <div className='fixed top-20 right-4 left-4 sm:left-auto sm:right-5 z-50 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-xl shadow-lg transition-all duration-300 transform text-center sm:text-left max-w-sm sm:max-w-md mx-auto sm:mx-0 glass-card border-emerald-500 animate-fade-in-up'>
                    <div className="flex items-center gap-2">
                        <span className="text-emerald-400 text-xl">✓</span>
                        <span className="text-slate-100">{toast.message}</span>
                    </div>
                </div>
            )}
            <div className="container mx-auto max-w-4xl p-3 sm:p-4 md:p-6 mt-8 animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[var(--slate-100)] font-bold text-center mb-2">
                    <span className="text-emerald-400">&lt;</span>
                    <span>Ghost</span><span className="text-emerald-400">Pass/&gt;</span>
                </h1>
                <p className="text-[var(--slate-300)] text-base sm:text-lg text-center mb-8">Invisible protection for your digital life.</p>

                <div className="glass-card rounded-2xl p-4 sm:p-6 mb-8">
                    <div className="text-[var(--slate-100)] flex flex-col justify-center items-center gap-3 sm:gap-4">
                        {/* Website URL Input */}
                        <input
                            type="text"
                            name="site"
                            value={form.site}
                            onChange={handleChange}
                            placeholder="Website URL"
                            className="border border-slate-600 rounded-lg w-full p-3 sm:p-4 py-2.5 sm:py-2.5 bg-[var(--navy-800)] text-[var(--slate-100)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-all"
                            onKeyDown={handlekeydown}
                        />


                        <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
                            {/* Username Input */}
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="border border-slate-600 rounded-lg w-full sm:w-1/2 p-3 sm:p-4 py-2.5 sm:py-2.5 bg-[var(--navy-800)] text-[var(--slate-100)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-all"
                                onKeyDown={handlekeydown}
                            />

                            {/* Password Input Container */}
                            <div className="flex gap-2 w-full sm:w-1/2">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="border border-slate-600 rounded-lg flex-1 p-3 sm:p-4 py-2.5 sm:py-2.5 bg-[var(--navy-800)] text-[var(--slate-100)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-all"
                                    onKeyDown={handlekeydown}
                                />
                                <button
                                    onClick={showPassword}
                                    className="bg-[var(--navy-700)] hover:bg-emerald-600 text-white font-bold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center border border-slate-600 hover:border-emerald-500"
                                    id="show"
                                >
                                    <lord-icon
                                        src={document.getElementById("password")?.type === "text"
                                            ? "https://cdn.lordicon.com/fmjvulyw.json"  // Eye Cross/Hide icon
                                            : "https://cdn.lordicon.com/vfczflna.json"  // Eye Show icon
                                        }
                                        trigger="click"
                                        stroke="bold"
                                        colors="primary:#ffffff,secondary:#ffffff"
                                        style={{ width: "25px", height: "25px" }}>
                                    </lord-icon>
                                </button>
                            </div>
                        </div>

                        {/* Button */}
                        <button className='flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-[var(--navy-950)] font-bold py-2.5 sm:py-2.5 px-6 sm:px-8 rounded-lg w-full sm:w-fit transition-all duration-200 shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base' onClick={savePassword}>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                                colors="primary:#020617"
                                style={{ width: "25px", height: "25px" }}>
                            </lord-icon>
                            Secure Identity
                        </button>
                    </div>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl sm:text-3xl py-4 text-center mb-4'>
                        <span className="text-emerald-400">THE VAULT</span>
                    </h2>

                    {Array.isArray(passwordArr) && passwordArr.length === 0 && (
                        <div className='glass-card text-[var(--slate-300)] font-medium py-4 px-4 sm:px-6 rounded-xl text-center text-base sm:text-lg mx-auto'>
                            No credentials stored yet
                        </div>
                    )}

                    {passwordArr.length != 0 &&
                        <div className="glass-card rounded-xl overflow-hidden -mx-3 sm:mx-0">
                            <table className="w-full text-xs sm:text-sm text-left">

                                {/* Table Header */}
                                <thead className="text-xs uppercase bg-[var(--navy-800)]/80 border-b border-emerald-500/30">
                                    <tr>
                                        <th scope="col" className="px-3 sm:px-6 py-4 w-[30%] sm:w-auto text-emerald-400 font-semibold">Origin</th>
                                        <th scope="col" className="px-3 sm:px-6 py-4 w-[25%] sm:w-auto text-emerald-400 font-semibold">Operator</th>
                                        <th scope="col" className="px-3 sm:px-6 py-4 w-[25%] sm:w-auto text-emerald-400 font-semibold">Credential</th>
                                        <th scope="col" className="px-3 sm:px-6 py-4 w-[20%] sm:w-auto text-center text-emerald-400 font-semibold">Protocol</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {passwordArr.map((item, index) => {
                                        return (
                                            <tr key={index} className="bg-[var(--navy-800)]/40 border-b border-[var(--navy-700)]/30 hover:bg-[var(--navy-700)]/60 transition-all duration-200">

                                                {/* Site URL */}
                                                <td className="px-3 sm:px-6 py-4">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                                                        <a href={item.site} target="_blank" rel="noreferrer" className="hover:underline hover:text-emerald-400 truncate max-w-[80px] sm:max-w-[200px] text-[var(--slate-200)] text-xs sm:text-sm transition-colors">
                                                            {item.site}
                                                        </a>
                                                        <div className='cursor-pointer inline-block hover:scale-110 transition-transform' onClick={() => { copyText(item.site) }}>
                                                            <lord-icon
                                                                style={{ "width": "18px", "height": "18px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                colors="primary:#10b981">
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Username */}
                                                <td className="px-3 sm:px-6 py-4">
                                                    <div className='flex items-center gap-1.5'>
                                                        <span className="truncate max-w-[60px] sm:max-w-[150px] text-[var(--slate-200)] text-xs sm:text-sm">{item.username}</span>
                                                        <div className='cursor-pointer hover:scale-110 transition-transform' onClick={() => { copyText(item.username) }}>
                                                            <lord-icon
                                                                style={{ "width": "18px", "height": "18px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                colors="primary:#10b981">
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Password */}
                                                <td className="px-3 sm:px-6 py-4">
                                                    <div className='flex items-center gap-1.5'>
                                                        <span className="truncate max-w-[60px] sm:max-w-[150px] text-emerald-400 font-mono text-xs sm:text-sm">{"•".repeat(item.password.length)}</span>
                                                        <div className='cursor-pointer hover:scale-110 transition-transform' onClick={() => { copyText(item.password) }}>
                                                            <lord-icon
                                                                style={{ "width": "18px", "height": "18px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                colors="primary:#10b981">
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Actions (Edit/Delete) */}
                                                <td className="px-3 sm:px-6 py-4">
                                                    <div className="flex justify-center gap-2 sm:gap-3">
                                                        <span className='cursor-pointer inline-block hover:scale-110 transition-transform' onClick={() => { editPassword(item.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                                trigger="hover"
                                                                colors="primary:#10b981"
                                                                style={{ "width": "22px", "height": "22px" }}>
                                                            </lord-icon>
                                                        </span>
                                                        <span className='cursor-pointer inline-block hover:scale-110 transition-transform' onClick={() => { deletePassword(item.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/skkahier.json"
                                                                trigger="hover"
                                                                colors="primary:#ef4444"
                                                                style={{ "width": "22px", "height": "22px" }}>
                                                            </lord-icon>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Home