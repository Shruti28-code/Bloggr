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
    };

    // return post ? (
    //     <div className="py-8">
    //         <Container>
    //             <div className="max-w-2xl  mx-auto">
    //                 <div className="w-full mb-4 relative border rounded-xl p-2">
    //                     <img
    //                         src={appwriteService.getFileView(post.featuredImage)}
    //                         alt="Post Thumbnail"
    //                         className="rounded-xl w-full max-h-[500px]"
    //                     />

    //                     {isAuthor && (
    //                         <div className="absolute right-6 top-6">
    //                             <Link to={`/edit-post/${post.$id}`}>
    //                                 <button className="mr-3 px-4 py-2 rounded-md bg-green-500 text-white">
    //                                     Edit
    //                                 </button>
    //                             </Link>
    //                             <button
    //                                 className="bg-red-500 px-4 py-2 rounded-md text-white"
    //                                 onClick={deletePost}
    //                             >
    //                                 Delete
    //                             </button>
    //                         </div>
    //                     )}
    //                 </div>

    //                 <div className="w-full mb-6">
    //                     <h1 className="text-3xl font-bold text-blue-700">{post.title}</h1>
    //                 </div>

    //                 <p className="whitespace-pre-line text-gray-700">
    //                     {post.content}
    //                 </p>

    //             </div>
    //         </Container>
    //     </div>
    // ) : null;
    return post ? (
        <div className="py-8">
            <Container>
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Part - Image */}
                        <div className="relative w-full md:w-1/2">
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt="Post Thumbnail"
                                className="rounded-xl w-full  object-cover h-auto"
                            />

                            {isAuthor && (
                                <div className="absolute right-4 top-4 flex gap-2">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <button className="px-3 py-1 rounded bg-green-500 text-white text-sm">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="px-3 py-1 rounded bg-red-500 text-white text-sm"
                                        onClick={deletePost}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Part - User Info & Content */}
                        <div className="w-full md:w-1/2 flex flex-col gap-4">
                            {/* User Info */}
                            <div className="flex items-center gap-2 text-blue-700">
                                <PersonCircle size={24} />
                                <span className="font-medium text-lg">{post.username || "Author"}</span>
                            </div>

                            {/* Post Title */}
                            <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>

                            {/* Post Content */}
                            <p className="text-gray-700 whitespace-pre-line overflow-auto">
                                {post.content}
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}