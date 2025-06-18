import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button onClick={logoutHandler} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Log out</button>
    )
}

export default LogoutBtn