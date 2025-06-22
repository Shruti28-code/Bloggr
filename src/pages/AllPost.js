


import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components/index2';
import appwriteService from "../appwrite/config";
import { motion } from 'framer-motion';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8); // Initial posts to show
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4); // Load 4 more each click
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            rotateX: -15,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const floatingAnimation = {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    if (loading) {
        return (
            <div className='w-full min-h-screen bg-gradient-to-b from-sky-300 via-white/40 to-sky-300 flex items-center justify-center relative overflow-hidden'>
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-sky-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
                </div>

                <motion.div
                    className="relative z-10 text-center"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-sky-400/30 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-20 h-20 border-4 border-t-sky-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-2 w-16 h-16 border-4 border-sky-300/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    </div>
                    <motion.p
                        className="text-sky-700 font-bold text-xl mt-6"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Loading Amazing Posts...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className='w-full min-h-screen bg-gradient-to-b from-sky-300 via-white/40 to-sky-300 relative overflow-hidden'>
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating geometric shapes */}
                <motion.div
                    className="absolute top-20 left-10 w-32 h-32 bg-sky-200/20 rounded-3xl rotate-45"
                    animate={floatingAnimation}
                />
                <motion.div
                    className="absolute top-40 right-20 w-24 h-24 bg-blue-200/20 rounded-full"
                    animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
                />
                <motion.div
                    className="absolute bottom-40 left-20 w-20 h-20 bg-cyan-200/20 rounded-2xl rotate-12"
                    animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-28 h-28 bg-sky-300/20 rounded-full"
                    animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.5 } }}
                />

                {/* Particle effects */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-sky-400/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [-20, -100, -20],
                                opacity: [0, 1, 0],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 4,
                            }}
                        />
                    ))}
                </div>
            </div>

            <Container>
                {/* Hero Header Section */}
                <motion.div
                    className='text-center py-16 md:py-24 relative z-10'
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    {/* Glassmorphism header card */}
                    <motion.div
                        className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 mx-4 shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Glowing orb effect */}
                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                            <div className="w-40 h-40 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                        </div>

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative z-10"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl mb-6 shadow-lg">
                                <motion.svg
                                    className="w-10 h-10 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                                </motion.svg>
                            </div>
                        </motion.div>

                        <motion.h1
                            className='text-5xl md:text-7xl font-black bg-gradient-to-r from-sky-600 via-blue-600 to-sky-800 bg-clip-text text-transparent mb-6 leading-tight'
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            Discover Stories
                        </motion.h1>

                        <motion.p
                            className='text-xl md:text-2xl text-sky-700/80 font-medium max-w-3xl mx-auto leading-relaxed'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            Immerse yourself in a world of creativity, insights, and inspiration from our global community
                        </motion.p>

                        {/* Dynamic stats counter */}
                        <motion.div
                            className="mt-8 inline-flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sky-700 font-bold text-2xl">{posts.length}</span>
                            </div>
                            <span className="text-sky-600 font-medium">
                                {posts.length === 1 ? 'Amazing Post' : 'Amazing Posts'}
                            </span>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {posts.length === 0 ? (
                    <motion.div
                        className='text-center py-20 relative z-10'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 mx-4 shadow-2xl">
                            <motion.div
                                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl mb-6"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </motion.div>
                            <h3 className="text-3xl font-bold text-sky-700 mb-4">No Posts Yet</h3>
                            <p className="text-sky-600 text-lg">Be the pioneer! Share the first story with our community.</p>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {/* Posts Masonry Grid */}
                        <motion.div
                            className='relative z-10 px-4 md:px-8'
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
                                {posts.slice(0, visibleCount).map((post, index) => (
                                    <motion.div
                                        key={post.$id}
                                        variants={cardVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -12,
                                            rotateY: 5,
                                            transition: {
                                                duration: 0.3,
                                                ease: "easeOut"
                                            }
                                        }}
                                        className="group perspective-1000"
                                    >
                                        <div className="relative backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform-gpu">
                                            {/* Shimmer effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                                            {/* Glowing border effect */}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

                                            <div className="relative z-10">
                                                <PostCard {...post} />
                                            </div>

                                            {/* Corner accent */}
                                            <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Load More Section */}
                        {visibleCount < posts.length && (
                            <motion.div
                                className='relative z-10 flex flex-col items-center mt-16 px-4'
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {/* Progress visualization */}
                                <div className="w-full max-w-md mb-8">
                                    <div className="flex justify-between text-sm text-sky-600 mb-2 font-medium">
                                        <span>Progress</span>
                                        <span>{Math.round((visibleCount / posts.length) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-white/30 rounded-full backdrop-blur-sm border border-white/20 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full shadow-sm"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(visibleCount / posts.length) * 100}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        >
                                            <div className="h-full bg-white/20 animate-pulse"></div>
                                        </motion.div>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={handleLoadMore}
                                    className='group relative bg-gradient-to-r from-sky-500 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20'
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 25px 50px -12px rgba(56, 189, 248, 0.5)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {/* Button background animation */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Ripple effect */}
                                    <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-2xl transition-transform duration-300"></div>

                                    <span className="relative z-10 flex items-center space-x-3">
                                        <span>Discover More</span>
                                        <motion.svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            animate={{ y: [0, -2, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </motion.svg>
                                    </span>
                                </motion.button>

                                <p className="text-sky-600/80 text-sm mt-4 font-medium">
                                    {posts.length - visibleCount} more incredible stories await
                                </p>
                            </motion.div>
                        )}

                        {/* Completion Celebration */}
                        {visibleCount >= posts.length && posts.length > 8 && (
                            <motion.div
                                className="relative z-10 text-center mt-16 px-4"
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="backdrop-blur-xl bg-gradient-to-r from-sky-100/20 to-blue-100/20 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
                                    <motion.div
                                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl mb-6"
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                    >
                                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </motion.div>
                                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                        Journey Complete! 🎉
                                    </h3>
                                    <p className="text-sky-600 text-lg font-medium">
                                        You've explored all <span className="font-bold text-sky-700">{posts.length}</span> amazing posts
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;