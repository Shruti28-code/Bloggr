import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Input, Logo } from "./index2"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)

            console.log("Session:", session); // 👈 Add this
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-9/10 max-w-lg bg-gray-100 rounded-2xl p-10 border border-none shadow-md">

                {/* Logo */}
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-bold text-gray-800">Sign in to your account</h2>

                {/* Sign up redirect */}
                <p className="mt-2 text-center text-base text-gray-500">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover: text-blue-500 underline "
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Error Message */}
                {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit(login)} className="mt-6">
                    <div className="space-y-5">

                        {/* Email */}
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />

                        {/* Password */}
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"

                            className="w-full bg-sky-500 text-white py-2 px-4 rounded-xl hover:bg-sky-600 transition-all duration-200 font-semibold text-lg shadow-sm"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
