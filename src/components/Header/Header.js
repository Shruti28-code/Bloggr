import React from 'react'
import { Logo, LogoutBtn, Container } from '../index2'
//import { Link } from 'react-router-dom'
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
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Sign up",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        }
    ]


    return (
        <header className="bg-gradient-to-r from-sky-300 via-white/40 to-sky-300 text-gray-800 py-4 px-6 rounded-b-xl shadow sticky top-0 z-50">
            <Container>
                <nav className="flex items-center justify-between text-sm font-medium text-gray-700">
                    {/* Logo */}
                    {/* <Link to="/">
                        <Logo width="70px" />
                    </Link> */}
                    <Logo width="70px" />

                    {/* Hamburger Icon (Mobile) */}
                    <button
                        className="lg:hidden  z-9999 text-gray-800 focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
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

                    {/* Navigation Items */}
                    <ul
                        className={`flex flex-col lg:flex-row lg:items-center lg:space-x-6 absolute lg:static right-6 top-16 bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 rounded-md transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden lg:flex'
                            }`}
                    >
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => {
                                            navigate(item.slug);
                                            setMenuOpen(false); // close menu on mobile
                                        }}
                                        // className="block px-4 py-2 hover:text-blue-600 transition"
                                        className={`bg-blue-700 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition`}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}



                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header >
    )
}

export default Header