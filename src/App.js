// import authService from './appwrite/auth'
// import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import {
//   login, logout
// } from "./store/authSlice"

// import './App.css'
// import { Footer, Header } from './components/index2'
// import { Outlet } from 'react-router-dom'

// function App() {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch()
//   useEffect(() => {

//     authService.getCurrentUser()
//       .then((userData) => {
//         if (userData) {
//           dispatch(login({ userData }))
//         }
//         else {
//           dispatch(logout())
//         }

//       })

//       .finally(setTimeout(() => {
//         setLoading(false);
//       }, 1500))
//   }, [])

//   return !loading ? (
//     <div className='min-h-screen bg-gradient-to-b from-sky-300 via-white/40 to-sky-300 bg-cover bg-no-repeat'>
//       <div className='w-full block'>
//         <Header />
//         <main className=" bg-transparent" >
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div >

//   ) : (
//     <div className="min-h-screen flex items-center justify-center bg-sky-200">
//       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
//     </div>
//   );
// }

// export default App


import authService from './appwrite/auth';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from "./store/authSlice";
import './App.css';
import { Footer, Header } from './components/index2';
import { Outlet } from 'react-router-dom';
import Logo from './components/Logo'; // adjust path if needed

function App() {
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if this is the user's first visit
    const isFirstVisit = localStorage.getItem('hasVisitedBefore');

    if (!isFirstVisit) {
      setShowIntro(true);
      localStorage.setItem('hasVisitedBefore', 'true');

      // Show the intro screen for 3 seconds
      setTimeout(() => {
        setShowIntro(false);
        setLoading(false);
      }, 3000);
    } else {
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }));
          } else {
            dispatch(logout());
          }
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        });
    }
  }, [dispatch]);

  // Render intro screen only on first visit
  if (showIntro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sky-200 text-center space-y-4 px-4">
        <Logo fontSize="2rem" />
        <p
          className="text-gray-700 font-medium text-lg transition-opacity duration-1000 ease-out opacity-0 animate-fade"
          style={{
            animation: "fadeInUp 1s ease-out forwards",
          }}
        >
          Designed, developed and hosted by{" "}
          <span className="text-blue-700 font-semibold">Shruti Khadatkar</span>
        </p>

      </div>
    );
  }

  // Render spinner while loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  // Render main app after loading
  return (
    <div className='min-h-screen bg-gradient-to-b from-sky-300 via-white/40 to-sky-300 bg-cover bg-no-repeat'>
      <div className='w-full block'>
        <Header />
        <main className="bg-transparent">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
