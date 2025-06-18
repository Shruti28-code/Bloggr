

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components/index2';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import beachImg from '../assets/beach.jpg';
import skyImg from '../assets/sky.jpeg';
import cherryImg from '../assets/cherry.jpeg';


const galleryImages = [
    { title: 'Tide’s Touch', url: beachImg },
    { title: 'Peaceful Skies', url: skyImg },
    { title: 'Cherry Charm', url: cherryImg },
];

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData); // assuming you store user info here
    const navigate = useNavigate();
    const userPosts = posts.filter(post => post.userId === userData?.$id);

    useEffect(() => {
        if (authStatus) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, [authStatus]);

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
                className="min-h-[calc(100vh-100px)] flex items-center justify-center py-6 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
                    {/* Left container */}
                    <motion.div
                        className="flex-1 text-center md:text-left space-y-6"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-extrabold text-blue-600">
                            Share Your Moments With the World
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Sign up to create your blog and capture memories that matter.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition"
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right container - image slider */}
                    <motion.div
                        className="flex-1 max-w-md w-full"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <Slider {...sliderSettings}>
                            {galleryImages.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.03 }}
                                    className="p-4"
                                >
                                    <img
                                        src={img.url}
                                        alt={img.title}
                                        className="rounded-xl w-full h-64 object-cover shadow-md"
                                    />
                                    <p className="mt-2 text-center text-blue-500 font-large">{img.title}</p>
                                </motion.div>
                            ))}
                        </Slider>
                    </motion.div>
                </div>
            </motion.div>
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
                        🎉 Hello{userData?.name ? `, ${userData.name}` : ''}!
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
                        Bloggr lets you post your moments, and ideas freely.
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

