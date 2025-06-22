

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import authService from '../appwrite/auth';
import { Container, PostCard } from '../components/index2';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import beachImg from '../assets/beach.jpg';
import skyImg from '../assets/sky.jpeg';
import cherryImg from '../assets/cherry.jpeg';
import { login } from '../store/authSlice';


const galleryImages = [
    { title: 'Tide’s Touch', url: beachImg },
    { title: 'Peaceful Skies', url: skyImg },
    { title: 'Cherry Charm', url: cherryImg },
];

function Home() {
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState([])
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData); // assuming you store user info here
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingUser, setLoadingUser] = useState(true);
    //debugger
    const userPosts = posts.filter(post => post.userId === userData?.$id);

    useEffect(() => {
        if (authStatus) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, [authStatus, userData]);

    useEffect(() => {
        const fetchUserOnLoad = async () => {
            if (!userData) {
                const user = await authService.getCurrentUser();
                console.log("Fetched user from Appwrite:", user);
                if (user) {
                    dispatch(login({ userData: user }));
                }
            }
            setLoadingUser(false);
        };

        if (!userData) fetchUserOnLoad();
    }, []);

    if (!authStatus) {

        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        };

        return (
            <motion.div
                className="min-h-[calc(100vh-100px)] flex items-center justify-center py-8 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
                    {/* Left container */}
                    <motion.div
                        className="flex-1 text-center md:text-left space-y-6"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {/* <h1 className="text-4xl font-extrabold text-blue-600">
                            Share Your Moments With the World
                        </h1> */}
                        <h1 className="text-4xl bg-gradient-to-r from-blue-900 via-indigo-800 to-indigo-900


 lg:text-6xl font-black bg-clip-text text-transparent leading-tight">
                            Share Your Moments
                            <span className="block text-3xl lg:text-5xl mt-2">
                                With the World
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Sign up to create your blog and capture memories that matter.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                onClick={() => navigate('/signup')}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "rgba(59, 130, 246, 0.1)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="group border-2 border-blue-600 text-blue-600 px-5 py-3 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 backdrop-blur-sm"
                                onClick={() => navigate('/login')}
                            >
                                <span className="flex items-center gap-2">
                                    Sign In
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                                    </svg>
                                </span>
                            </motion.button>

                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1 max-w-lg w-full"
                        initial={{ x: 80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
                    >
                        <div className="relative">
                            {/* Decorative ring */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-20 blur-lg"></div>

                            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-white/20">
                                <Slider {...sliderSettings}>
                                    {galleryImages.map((img, idx) =>
                                        <motion.div
                                            key={idx}
                                            className="px-2"
                                        >
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.02,
                                                    rotateY: 5
                                                }}
                                                className="group relative overflow-hidden rounded-2xl"
                                                style={{ perspective: "1000px" }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                <img
                                                    src={img.url}
                                                    alt={img.title}
                                                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                                                />

                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <h3 className="text-white text-xl font-bold drop-shadow-lg group-hover:transform group-hover:translate-y-0 transform translate-y-2 transition-transform duration-300">
                                                        {img.title}
                                                    </h3>
                                                    <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </Slider>
                            </div>
                        </div>

                        {/* Feature highlights */}
                        <motion.div
                            className="mt-8 grid grid-cols-3 gap-4"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            {[
                                { icon: "✍️", text: "Easy Writing" },
                                { icon: "🌟", text: "Beautiful Design" },
                                { icon: "🚀", text: "Fast & Secure" }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm"
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="text-2xl mb-2">{feature.icon}</div>
                                    <div className="text-sm font-medium text-gray-600">{feature.text}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div >
                </div >
            </motion.div >
            //                 </div>

        );
    }



    return (
        <motion.div
            className="w-full min-h-[calc(100vh-100px)] py-12 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Container>
                {/* 🎉 Welcome Message */}
                <motion.div
                    className="mb-10 text-center"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-4xl font-extrabold text-blue-700">
                        🎉 Hello {userData?.name ? `, ${userData.name}` : ''}!
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">
                        Here's a sneak peek into your blogging journey!
                    </p>
                </motion.div>

                {/* 💡 Container 1: About Bloggr */}
                <motion.div
                    className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-2xl font-bold mb-2 text-yellow-900">📘 About Bloggr</h3>
                    <p className="text-gray-700 mb-2">
                        Bloggr lets you post your moments and ideas freely.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                        <li>Your posts show up here on your home page</li>
                        <li>“All Posts” is where the community posts live</li>
                        <li>Click “Add Post” to begin your journey!</li>
                    </ul>
                </motion.div>

                {/* 📝 Container 2: User's Posts */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3 className="text-2xl font-semibold text-blue-800 mb-4">📝 Your Posts</h3>

                    {userPosts.length > 0 ? (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {userPosts.slice(0, 4).map((post) => (
                                <motion.div
                                    key={post.$id}
                                    whileHover={{ scale: 1.02 }}
                                    className="transition-all"
                                >
                                    <PostCard {...post} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.p
                            className="text-center text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            You haven’t posted anything yet.
                        </motion.p>
                    )}
                </motion.div>

                {/*  Navigate to All Posts */}
                <motion.div
                    className="text-center mt-10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <button
                        onClick={() => navigate('/all-posts')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                    >
                        Explore All Posts →
                    </button>
                </motion.div>
            </Container>
        </motion.div>
    );
}




export default Home;




