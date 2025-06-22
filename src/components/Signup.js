

import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Input, Logo } from './index2.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()

    const create = async (data) => {
        setError("")
        setIsLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center  px-4 py-8 sm:px-6 sm:py-10 text-xs">
            <div className="w-full max-w-md">
                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-sky-300/30 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sky-200/30 to-blue-300/30 rounded-full translate-y-12 -translate-x-12"></div>
                    <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-blue-100/20 to-sky-100/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

                    <div className="relative z-10">
                        {/* Logo Section */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-500 rounded-full blur-lg opacity-20 scale-110"></div>
                                <span className="relative inline-block w-full max-w-[100px] transform hover:scale-105 transition-transform duration-300">
                                    <Logo width="100%" />
                                </span>
                            </div>
                        </div>

                        {/* Welcome Section */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                                Join Us Today
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Create your account to get started
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6">
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-red-700 text-sm font-medium">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit(create)} className="space-y-5">
                            {/* Full Name Input */}
                            <div className="space-y-2">
                                <Input
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                                    {...register("name", {
                                        required: true,
                                    })}
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <Input
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    type="email"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Email address must be a valid address",
                                        }
                                    })}
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                            </div>

                            {/* Password Requirements */}
                            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                                <p className="text-xs text-blue-700 font-medium mb-2">Password should contain:</p>
                                <div className="grid grid-cols-2 gap-1 text-xs text-blue-600">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                        <span>8+ characters</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                        <span>Special characters</span>
                                    </div>
                                </div>
                            </div>


                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white py-3.5 px-6 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden mt-6"
                            >

                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                                <span className="relative flex items-center justify-center space-x-2">
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                            <span>Create Account</span>
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600 text-sm">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 relative group"
                                >
                                    Sign In
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-sky-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </p>
                        </div>



                    </div>
                </div>

                <div className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-2 text-xs text-gray-400">
                        <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                        <span>Your data is protected with enterprise-grade security</span>
                        <div className="w-2 h-2 bg-sky-300 rounded-full animate-pulse delay-75"></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Signup