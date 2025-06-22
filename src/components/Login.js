// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { login as authLogin } from '../store/authSlice'
// import { Input, Logo } from "./index2"
// import { useDispatch } from "react-redux"
// import authService from "../appwrite/auth"
// import { useForm } from "react-hook-form"

// function Login() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const { register, handleSubmit } = useForm()
//     const [error, setError] = useState("")

//     const login = async (data) => {
//         setError("")
//         try {
//             const session = await authService.login(data)

//             console.log("Session:", session); // 👈 Add this
//             if (session) {
//                 const userData = await authService.getCurrentUser()
//                 if (userData) dispatch(authLogin(userData));
//                 navigate("/")
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//     return (
//         <div className="flex items-center justify-center">
//             <div className="mx-auto w-9/10 max-w-lg bg-gray-100 rounded-2xl p-10 border border-none shadow-md">

//                 {/* Logo */}
//                 <div className="mb-4 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-center text-2xl font-bold text-gray-800">Sign in to your account</h2>

//                 {/* Sign up redirect */}
//                 <p className="mt-2 text-center text-base text-gray-500">
//                     Don&apos;t have an account?&nbsp;
//                     <Link
//                         to="/signup"
//                         className="font-medium text-primary transition-all duration-200 hover: text-blue-500 underline "
//                     >
//                         Sign Up
//                     </Link>
//                 </p>

//                 {/* Error Message */}
//                 {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

//                 {/* Form */}
//                 <form onSubmit={handleSubmit(login)} className="mt-6">
//                     <div className="space-y-5">

//                         {/* Email */}
//                         <Input
//                             label="Email"
//                             placeholder="Enter your email"
//                             type="email"
//                             {...register("email", {
//                                 required: true,
//                                 validate: {
//                                     matchPatern: (value) =>
//                                         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                         "Email address must be a valid address",
//                                 },
//                             })}
//                         />

//                         {/* Password */}
//                         <Input
//                             label="Password"
//                             type="password"
//                             placeholder="Enter your password"
//                             {...register("password", {
//                                 required: true,
//                             })}
//                         />

//                         {/* Submit Button */}
//                         <button
//                             type="submit"

//                             className="w-full bg-sky-500 text-white py-2 px-4 rounded-xl hover:bg-sky-600 transition-all duration-200 font-semibold text-lg shadow-sm"
//                         >
//                             Sign In
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login

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
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const login = async (data) => {
        setError("")
        setIsLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 text-xs ">
            <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-200/30 to-blue-300/30 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-sky-300/30 rounded-full translate-y-12 -translate-x-12"></div>

                    <div className="relative z-10">
                        <div className="mb-4 flex justify-center">
                            <span className="inline-block w-full max-w-[100px]">
                                <Logo width="100%" />
                            </span>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Sign in to continue your journey
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6">
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-red-700 text-sm font-medium" role="alert">{error}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(login)} className="space-y-6" aria-label="Login Form">
                            <div className="space-y-2">
                                <Input
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    type="email"
                                    aria-label="Email Address"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPatern: (value) =>
                                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Email address must be a valid address",
                                        },
                                    })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    aria-label="Password"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3.5 px-6 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                                aria-label="Submit Login"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                                <span className="relative flex items-center justify-center space-x-2">
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            <span>Signing In...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600 text-sm">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-sky-600 hover:text-sky-700 transition-colors duration-200 relative group"
                                >
                                    Sign Up
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4 text-center">
                            <button
                                type="button"
                                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                onClick={() => alert("Forgot password feature coming soon.")}
                            >
                                Forgot your password?
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-2 text-xs text-gray-400">
                        <div className="w-2 h-2 bg-sky-300 rounded-full animate-pulse" aria-hidden="true"></div>
                        <span>Secure login powered by modern encryption</span>
                        <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-75" aria-hidden="true"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
