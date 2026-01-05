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
            let req = await fetch("http://localhost:3000/"); // Added await here
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

    const editPassword = (id) => {
        console.log("Password is editing : ", id);
        setform(passwordArr.find(item => item.id === id))
        setPasswordArr(passwordArr.filter(item => item.id !== id))
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
                <div className='fixed top-20 right-4 left-4 sm:left-auto sm:right-5 z-50 bg-green-500 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg shadow-lg transition-all duration-300 transform animate-bounce text-center sm:text-left max-w-sm sm:max-w-md mx-auto sm:mx-0'>
                    {toast.message}
                </div>
            )}
            <div className="container mx-auto max-w-4xl p-3 sm:p-4 md:p-6 bg-transparent rounded-lg shadow-lg">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold text-center mb-2">
                    <span className="text-green-500">&lt;</span>
                    <span>Ghost</span><span className="text-green-500">Pass/&gt;</span>
                </h1>
                <p className="text-green-200 text-base sm:text-lg text-center mb-6">Secure your passwords with ease</p>

                <div className="text-white flex flex-col p-3 sm:p-4 justify-center items-center gap-3 sm:gap-4">
                    {/* Website URL Input */}
                    <input
                        type="text"
                        name="site"
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Website URL"
                        className="border border-green-500 rounded-full w-full p-3 sm:p-4 py-2 sm:py-1 bg-green-950 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
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
                            className="border border-green-500 rounded-full w-full sm:w-1/2 p-3 sm:p-4 py-2 sm:py-1 bg-green-950 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
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
                                className="border border-green-500 rounded-full flex-1 p-3 sm:p-4 py-2 sm:py-1 bg-green-950 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
                                onKeyDown={handlekeydown}
                            />
                            <button
                                onClick={showPassword}
                                className="bg-green-600 hover:bg-green-500 text-black font-bold py-2 px-3 rounded-full transition-all duration-200 shadow-md shadow-green-900 flex items-center justify-center"
                                id="show"
                            >
                                <lord-icon
                                    src={document.getElementById("password")?.type === "text"
                                        ? "https://cdn.lordicon.com/fmjvulyw.json"  // Eye Cross/Hide icon
                                        : "https://cdn.lordicon.com/vfczflna.json"  // Eye Show icon
                                    }
                                    trigger="click"
                                    stroke="bold"
                                    colors="primary:#000000,secondary:#000000"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <button className='flex justify-center items-center gap-2 bg-green-600 hover:bg-green-500 text-black font-bold py-2.5 sm:py-2 px-6 sm:px-8 rounded-full w-full sm:w-fit transition-all duration-200 shadow-md shadow-green-900 text-sm sm:text-base' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            colors="primary:#000000"
                            style={{ width: "25px", height: "25px" }}>
                        </lord-icon>
                        Save Password
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-xl sm:text-2xl py-4 text-white text-center'>Your Passwords</h2>

                    {Array.isArray(passwordArr) && passwordArr.length === 0 && (
                        <div className='bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-4 sm:px-6 rounded-full transition-all duration-200 shadow-md shadow-green-900 w-fit text-center text-base sm:text-xl mx-auto'>
                            No passwords to show
                        </div>
                    )}

                    {passwordArr.length != 0 &&
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg -mx-3 sm:mx-0">
                            <table className="w-full text-xs sm:text-sm text-left rtl:text-right text-green-100">

                                {/* Table Header */}
                                <thead className="text-xs uppercase bg-green-800 border-b border-green-700">
                                    <tr>
                                        <th scope="col" className="px-2 sm:px-4 py-3 w-[30%] sm:w-auto">Site</th>
                                        <th scope="col" className="px-2 sm:px-4 py-3 w-[25%] sm:w-auto">User</th>
                                        <th scope="col" className="px-2 sm:px-4 py-3 w-[25%] sm:w-auto">Pass</th>
                                        <th scope="col" className="px-2 sm:px-4 py-3 w-[20%] sm:w-auto text-center">Actions</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {passwordArr.map((item, index) => {
                                        return (
                                            <tr key={index} className="bg-green-900 border-b border-green-700 hover:bg-green-800 transition-colors duration-150">

                                                {/* Site URL */}
                                                <td className="px-2 sm:px-4 py-3">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                                                        <a href={item.site} target="_blank" rel="noreferrer" className="hover:underline hover:text-white truncate max-w-[80px] sm:max-w-[200px] text-xs sm:text-sm">
                                                            {item.site}
                                                        </a>
                                                        <div className='cursor-pointer inline-block' onClick={() => { copyText(item.site) }}>
                                                            <lord-icon
                                                                style={{ "width": "16px", "height": "16px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                colors="primary:#ffffff">
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Username */}
                                                <td className="px-2 sm:px-4 py-3">
                                                    <div className='flex items-center gap-1'>
                                                        <span className="truncate max-w-[60px] sm:max-w-[150px] text-xs sm:text-sm">{item.username}</span>
                                                        <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                            <lord-icon
                                                                style={{ "width": "16px", "height": "16px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                colors="primary:#ffffff">
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Password */}
                                                <td className="px-2 sm:px-4 py-3">
                                                    <div className='flex items-center gap-1'>
                                                        <span className="truncate max-w-[60px] sm:max-w-[150px] text-xs sm:text-sm">{item.password}</span>
                                                        <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                            <lord-icon
                                                                style={{ "width": "16px", "height": "16px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                colors="primary:#ffffff">
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Actions (Edit/Delete) */}
                                                <td className="px-2 sm:px-4 py-3">
                                                    <div className="flex justify-center gap-1 sm:gap-2">
                                                        <span className='cursor-pointer inline-block' onClick={() => { editPassword(item.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                                trigger="hover"
                                                                colors="primary:#ffffff"
                                                                style={{ "width": "20px", "height": "20px" }}>
                                                            </lord-icon>
                                                        </span>
                                                        <span className='cursor-pointer inline-block' onClick={() => { deletePassword(item.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/skkahier.json"
                                                                trigger="hover"
                                                                colors="primary:#ffffff"
                                                                style={{ "width": "20px", "height": "20px" }}>
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