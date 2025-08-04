import React, { useState } from 'react';
import axios from 'axios';
import { DiAtlassian } from "react-icons/di";
import { CgImage } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({ onAuthSuccess }) => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ username: '', password: '', type: "login" });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
let api=process.env.BACK_API || "http://localhost:4000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loginData.username.trim() || !loginData.password.trim()) {
            setError("Please fill all fields");
            return;
        }

        setError('');
        setLoading(true);
        try {
            const response = await axios.post(
                `${api}/login`,
                {
                    username: loginData.username.trim(),
                    password: loginData.password.trim(),
                    type: loginData.type
                },
                { withCredentials: true }
            );
            console.log(response);
            if (response.status === 200) {
                console.log(response.data)
                localStorage.setItem("token", response.data.jwt);
                if (onAuthSuccess) onAuthSuccess(); // UPDATE PARENT STATE!
                navigate("/home");
            } else {

                setError( response.data.message || "Invalid credentials");
            }
        } catch (error) {
            setError(error?.response?.data?.message || "Login failed");
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
                    Login <DiAtlassian />
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
                    {loading ? "Logging in..." : "Login"}
                </button>
                <Link to={'/signup'} className='text-sm font-medium font-poppins mt-4 block text-center text-blue-600 hover:underline'>
                  <span>  Already have an account? </span>  Signup
                </Link>
            </form>
        </div>
    );
};
