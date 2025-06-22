import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components/index2";
import { PersonCircle } from "react-bootstrap-icons"; // Bootstrap profile icon


import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
        setShowDeleteModal(false);
    };
    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };


    return post ? (
        <div className="py-8">
            <Container>
                <div className="mb-4 sm:mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-800 transition-colors duration-200 group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back</span>
                    </button>
                </div>
                <div className="max-w-4xl  mx-auto  bg-white rounded-xl shadow-md p-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Part - Image */}
                        <div className="relative w-full md:w-1/2  flex justify-end items-center">
                            {!imageLoaded && (
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"></div>
                            )}
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt="Post Thumbnail"
                                className="rounded-xl w-full  object-cover h-auto"
                                onLoad={() => setImageLoaded(true)}
                            />

                            {isAuthor && (
                                <div className="absolute right-4 top-4 flex gap-2">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <button className="group flex items-center space-x-2 px-4 py-2 bg-green-500/90 hover:bg-green-600 backdrop-blur-sm text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                            <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>
                                    </Link>
                                    <button
                                        className="group flex items-center space-x-2 px-4 py-2 bg-red-500/90 hover:bg-red-600 backdrop-blur-sm text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                                        onClick={handleDeleteClick}
                                    >
                                        <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span className="hidden sm:inline">Delete</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Part - User Info & Content */}
                        <div className="w-full md:w-1/2 flex flex-col gap-4">
                            {/* User Info */}
                            <div className="flex items-center space-x-3 mb-4 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50 flex-shrink-0">
                                <div className="relative">
                                    <PersonCircle size={28} className="text-blue-700" />
                                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 font-medium">Written by</p>
                                    <p className="text-sm font-semibold text-blue-700">{post.authorName || "Author"}</p>
                                </div>
                            </div>

                            {/* Post Title */}
                            <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>

                            {/* Post Content */}
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-600 flex-shrink-0">
                                <div className="flex items-center space-x-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{new Date(post.$createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                                </div>
                            </div>

                            {/* Scrollable Post Content */}
                            <div className="flex-1 overflow-hidden">
                                <div className="h-full overflow-y-auto pr-2" style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#cbd5e1 #f1f5f9'
                                }}>
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                        {post.content}
                                    </div>
                                </div>
                            </div>
                            {isAuthor && (
                                <div className="mt-4 pt-4 border-t border-gray-200 lg:hidden flex-shrink-0">
                                    <div className="flex gap-2">
                                        <Link to={`/edit-post/${post.$id}`} className="flex-1">
                                            <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                <span>Edit</span>
                                            </button>
                                        </Link>
                                        <button
                                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                                            onClick={handleDeleteClick}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl transform animate-in fade-in duration-200">
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.118 16.5c-.77.833.19 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Post</h3>
                                <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
                                <div className="flex gap-3">
                                    <button
                                        className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors duration-200"
                                        onClick={() => setShowDeleteModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
                                        onClick={deletePost}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    ) : null;
}


