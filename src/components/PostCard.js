import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="group">
            <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 group-hover:border-sky-400">

                {/* Image Section */}
                <div className="w-full h-52 overflow-hidden">
                    <img
                        src={appwriteService.getFileView(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Title Section */}
                <div className="p-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-sky-600 transition-colors duration-200">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
