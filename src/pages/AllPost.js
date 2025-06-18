import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components/index2';
import appwriteService from "../appwrite/config";
import { motion } from 'framer-motion';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8); // Initial posts to show

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4); // Load 4 more each click
    };

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='text-center mb-6'>
                    <h1 className='text-3xl font-bold text-blue-700'>All Blog Posts</h1>
                    <p className='text-gray-600'>Browse all public posts from the community</p>
                </div>

                {posts.length === 0 ? (
                    <p className='text-center text-gray-500 text-lg'>No posts found.</p>
                ) : (
                    <>
                        <div className='flex flex-wrap'>
                            {posts.slice(0, visibleCount).map((post) => (
                                <motion.div
                                    key={post.$id}
                                    className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                >
                                    <PostCard {...post} />
                                </motion.div>
                            ))}
                        </div>

                        {visibleCount < posts.length && (
                            <div className='flex justify-center mt-6'>
                                <motion.button
                                    onClick={handleLoadMore}
                                    className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Load More
                                </motion.button>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
