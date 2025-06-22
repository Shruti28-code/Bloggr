

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select } from "../index2";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ text: "", type: "" });

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const showMessage = (text, type) => {
        setSubmitMessage({ text, type });
        setTimeout(() => setSubmitMessage({ text: "", type: "" }), 5000);
    };

    const submit = async (data) => {
        setIsSubmitting(true);
        setSubmitMessage({ text: "", type: "" });
        console.log("Submit called with data:", data);
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }

        else {
            const file = await appwriteService.uploadFile(data.image[0]);
            console.log("📨 Sending post creation request with:", {
                ...data,
                userId: userData.$id,
            });

            if (!file || !file.$id) {
                console.error("❌ File upload failed. File object:", file);

                alert("❌ File upload failed. Please try again.");

                return;
            }

            if (!userData || !userData.$id) {
                console.error("User data not loaded yet", userData);
                return;
            }

            const fileId = file.$id;
            data.featuredImage = fileId;


            delete data.image;

            console.log("User ID:", userData.$id);
            console.log("File ID:", fileId);
            console.log("Post data before creating:", data);

            try {
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                    authorName: userData.name
                });

                if (dbPost) {
                    showMessage("Post created successfully!", "success");
                    setTimeout(() => navigate(`/post/${dbPost.$id}`), 1500);

                } else {
                    showMessage("Post creation failed. Please try again.", "error");
                }

            } catch (error) {
                console.error("Error during post creation:", error);
                alert("❌ Failed to create post. ");
            }
        }


    }


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {post ? "Edit Post" : "Create New Post"}
                </h1>
                <p className="text-gray-600">
                    {post ? "Update your existing post" : "Share your thoughts with the world"}
                </p>
            </div>

            {/* Success/Error Message */}
            {submitMessage.text && (
                <div className={`mb-6 p-4 rounded-lg border ${submitMessage.type === 'success'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                    <div className="flex items-center">
                        <div className={`flex-shrink-0 w-5 h-5 mr-3 ${submitMessage.type === 'success' ? 'text-green-400' : 'text-red-400'
                            }`}>
                            {submitMessage.type === 'success' ? (
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <span className="font-medium">{submitMessage.text}</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Post Details</h2>

                        <div className="space-y-4">
                            <div>
                                <Input
                                    label="Title"
                                    placeholder="Enter post title"
                                    className={`${errors.title ? 'border-red-300' : ''}`}
                                    {...register("title", {
                                        required: "Title is required",
                                        minLength: { value: 3, message: "Title must be at least 3 characters" }
                                    })}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <Input
                                    label="Slug"
                                    placeholder="post-slug"
                                    className={`${errors.slug ? 'border-red-300' : ''}`}
                                    {...register("slug", {
                                        required: "Slug is required",
                                        pattern: {
                                            value: /^[a-z0-9-]+$/,
                                            message: "Slug can only contain lowercase letters, numbers, and hyphens"
                                        }
                                    })}
                                    onInput={(e) => {
                                        setValue("slug", slugTransform(e.currentTarget.value), {
                                            shouldValidate: true,
                                        });
                                    }}
                                />
                                {errors.slug && (
                                    <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">URL-friendly version of the title</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Caption
                                </label>
                                <textarea
                                    {...register("content", {
                                        maxLength: { value: 1000, message: "Caption must be less than 1000 characters" }
                                    })}
                                    className={`w-full border rounded-lg p-3 min-h-[120px] resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.content ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Write a compelling caption for your post..."
                                />
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Section */}
                <div className="space-y-6">
                    {/* Image Upload */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>

                        <div className="space-y-4">
                            <div>
                                <Input
                                    label="Choose Image"
                                    type="file"
                                    className={`${errors.image ? 'border-red-300' : ''}`}
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    {...register("image", {
                                        required: !post ? "Featured image is required" : false
                                    })}
                                />
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    Supported formats: PNG, JPG, JPEG, GIF
                                </p>
                            </div>

                            {post && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                        <img
                                            src={appwriteService.getFileView(post.featuredImage)}
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Post Settings */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Settings</h3>

                        <div>
                            <Select
                                options={["active", "inactive"]}
                                label="Status"
                                className={`${errors.status ? 'border-red-300' : ''}`}
                                {...register("status", { required: "Status is required" })}
                            />
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Active posts are visible to all users
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : post
                                    ? 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {post ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                <>
                                    {post ? (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            Update Post
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            Create Post
                                        </>
                                    )}
                                </>
                            )}
                        </button>

                        {isSubmitting && (
                            <p className="mt-2 text-sm text-gray-600 text-center">
                                Please wait while we {post ? 'update' : 'create'} your post...
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}