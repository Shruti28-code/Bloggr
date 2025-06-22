



import React from 'react'
import { Logo, LogoutBtn, Container } from '../index2'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true,
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
            )
        },
        {
            name: "Sign up",
            slug: "/signup",
            active: !authStatus,
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            )
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            )
        }
    ]

    return (
        <header className="bg-gradient-to-r from-sky-300 via-white/40 to-sky-300 text-gray-800 py-4 px-6 rounded-b-xl shadow-lg backdrop-blur-sm sticky top-0 z-50 border-b border-white/20">
            <Container>
                <nav className="flex items-center justify-between text-sm font-medium text-gray-700">
                    {/* Logo with hover effect */}
                    <div className="flex items-center  cursor-pointer transform hover:scale-105 transition-transform duration-200">
                        <Logo width="70px" />

                    </div>

                    {/* Enhanced Hamburger Icon (Mobile) */}
                    <button
                        className="lg:hidden relative z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30 text-gray-800 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-200 shadow-sm"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className="w-5 h-5 transform transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {menuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    {/* Enhanced Navigation Items */}
                    <ul
                        className={`flex flex-col lg:flex-row lg:items-center lg:space-x-3 absolute lg:static right-6 top-16 bg-white/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none shadow-xl lg:shadow-none p-6 lg:p-0 rounded-xl lg:rounded-none border lg:border-none border-white/30 transition-all duration-300 ease-in-out min-w-[200px] lg:min-w-0 ${menuOpen ? 'block opacity-100 translate-y-0' : 'hidden lg:flex opacity-0 lg:opacity-100 -translate-y-4 lg:translate-y-0'
                            }`}
                    >
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name} className="mb-2 lg:mb-0">
                                    <button
                                        onClick={() => {
                                            navigate(item.slug);
                                            setMenuOpen(false);
                                        }}
                                        className="group flex items-center space-x-2 w-full lg:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 font-medium text-sm border border-blue-500/20"
                                    >
                                        <span className="group-hover:rotate-12 transition-transform duration-200">
                                            {item.icon}
                                        </span>
                                        <span>{item.name}</span>
                                    </button>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li className="mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-200/50">
                                <div className="flex justify-center lg:justify-start">
                                    <LogoutBtn />
                                </div>
                            </li>
                        )}
                    </ul>

                    {/* Overlay for mobile menu */}
                    {menuOpen && (
                        <div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40"
                            onClick={() => setMenuOpen(false)}
                        ></div>
                    )}
                </nav>
            </Container >

            {/* Subtle bottom accent line */}

        </header >
    )
}

export default Header