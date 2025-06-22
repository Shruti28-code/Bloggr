//

import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="group block">
            <article className="relative w-full h-80 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={appwriteService.getFileView(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/10 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h2 className="text-xl font-bold text-white leading-tight mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                            {title}
                        </h2>
                        <div className="w-12 h-1 bg-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                </div>

                {/* Hover Accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-blue-500/0 border-r-transparent group-hover:border-t-blue-500/20 transition-all duration-300"></div>
            </article>
        </Link>
    )
}

export default PostCard