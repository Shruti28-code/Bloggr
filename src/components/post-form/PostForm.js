

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input, Select } from "../index2";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
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
        // } else {


        //     const file = await appwriteService.uploadFile(data.image[0]);
        //     if (!file || !file.$id) {
        //         alert("❌ File upload failed. Please try again.");
        //         return;
        //     }


        //     if (file) {
        //         if (!userData || !userData.$id) {
        //             console.error("User data not loaded yet");
        //             return;
        //         }

        //         console.log("User ID:", userData.$id);
        //         console.log("File ID:", file.$id);
        //         console.log("Post data before creating:", data);

        //         const fileId = file.$id;
        //         data.featuredImage = fileId;

        //         try {
        //             const dbPost = await appwriteService.createPost({
        //                 ...data,
        //                 userId: userData.$id,
        //             });

        //             // if (dbPost) {
        //             //     console.log("Post created:", dbPost);
        //             //     alert("✅ Post created successfully!");
        //             //     navigate(`/post/${dbPost.$id}`);
        //             // } else {
        //             //     console.error("Post creation returned null.");
        //             //     alert("❌ Please try again.");
        //             // }


        //             if (dbPost) {
        //                 alert("✅ Post created successfully! You can go back.");
        //                 navigate(`/post/${dbPost.$id}`);
        //             } else {
        //                 alert("❌ Post creation failed. Please try again.");
        //             }

        //         } catch (error) {
        //             console.error("Error during post creation:", error);
        //             alert("❌ Failed to create post. See console.");
        //         }
        //     }

        // }
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

            // ❗ Remove image field before sending to backend
            delete data.image;

            console.log("User ID:", userData.$id);
            console.log("File ID:", fileId);
            console.log("Post data before creating:", data);

            try {
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (dbPost) {
                    alert("✅ Post created successfully! You can go back.");
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    alert("❌ Post creation failed. Please try again.");
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


        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full md:w-2/3 px-2 mb-4">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />

                <label className="block mb-1">Caption:</label>
                <textarea
                    {...register("content")}
                    className="w-full border rounded p-2 min-h-[100px]"
                    placeholder="Write a caption..."
                />



            </div>

            <div className="w-full md:w-1/3 px-2 mb-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full max-h-[300px] object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <button
                    type="submit"
                    className={`w-full ${post ? "bg-green-500" : "bg-blue-500"
                        } text-white py-2 rounded`}
                >
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>

    );
}