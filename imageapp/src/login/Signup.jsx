import React, { useState } from 'react'
import { DiAngularSimple } from "react-icons/di";
import { DiAtlassian } from "react-icons/di";
import { CgImage } from "react-icons/cg";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const Signup = ({ onAuthSuccess }) => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ username: '', email: "", password: '', type: "signup" });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
let api = process.env.REACT_APP_API_URL || "https://imagebackend-2.onrender.com";




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loginData.username.trim() || !loginData.password.trim() || !loginData.email.trim()) {
            setError("Please fill all fields");
            return;
        }
        if (loginData.password.length < 5) {
            setError("Password must be at least 5 characters long");
            return;
        }

        setError('');
        setLoading(true);
        try {
            const response = await axios.post(
                `${api}signup`,
                {
                    username: loginData.username.trim(),
                    password: loginData.password.trim(),
                    email: loginData.email.trim(),
                    type: loginData.type
                },
                { withCredentials: true }
            );
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem("token", response.data.jwt);
                if (onAuthSuccess) onAuthSuccess(); // UPDATE PARENT STATE!
                navigate("/home");
            } else {
                console.log(response.data.message)
                setError("Invalid credentials");
            }
        } catch (error) {
            console.log(error.response.data.error)
            setError(error?.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="
          w-full
          max-w-sm
          md:max-w-md
          lg:max-w-lg
          bg-white
          p-6
          sm:p-8
          md:p-10
          rounded-lg
          shadow-2xl
          shadow-blue-500/20
        "
            >
                <h1 className='font-poppins flex items-center gap-2 mb-6 text-lg md:text-2xl justify-center'>
                    Welcome to Upload Hub <CgImage size={24} />
                </h1>
                <h1 className='font-bold uppercase flex items-center gap-3 mb-6 justify-center text-base md:text-xl'>
                    Signup <DiAtlassian />
                </h1>
                <div className='flex flex-col mb-4'>
                    <label htmlFor="username" className='font-medium text-sm pb-1 tracking-tight'>
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        autoFocus
                        value={loginData.username}
                        onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                        className='text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300'
                        placeholder='Username'
                        type="text"
                        autoComplete='username'
                    />
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor="password" className='font-medium text-sm pb-1 tracking-tight'>
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        value={loginData.email}
                        onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                        type="email"
                        className='text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300'
                        placeholder='Email'

                    />
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor="password" className='font-medium text-sm pb-1 tracking-tight'>
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                        type="password"
                        className='text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300'
                        placeholder='Password'
                        autoComplete='current-password'
                    />
                </div>
                {error && <p className='text-red-500 text-sm mb-2 text-center'>{error}</p>}
                <button
                    type="submit"
                    className='bg-blue-500 w-full text-white py-2 rounded-md mt-2 text-base md:text-lg font-medium transition disabled:bg-blue-300'
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "submit"}
                </button>
                <Link to={'/login'} className='text-sm font-medium font-poppins mt-4 block text-center text-blue-600 hover:underline'>
                    Login
                </Link>
            </form>
        </div>
    );
}
