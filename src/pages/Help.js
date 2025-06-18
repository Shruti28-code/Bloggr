import React from 'react';

export default function Help() {
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl  text-center font-bold mb-6 text-blue-700">Help & Support</h1>

            <p className="text-gray-700 mb-4">
                Welcome to Bloggr’s Help Center. We’re here to assist you in using our platform to share your memories and stories seamlessly. Here’s how you can get started:
            </p>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold  text-blue-700">📝 Creating a Blog Post</h2>
                    <p className="text-gray-700">
                        Click on the <strong>"Add Post"</strong> button from the navbar. Use the rich text editor to write your thoughts, upload images . Don’t forget to hit <strong>“Submit”</strong> to make it live!
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-blue-700">📸 Uploading Images</h2>
                    <p className="text-gray-700">
                        You can attach images to your blog using the upload button in the editor. We support JPG, PNG, and GIF formats.
                    </p>
                </section>



                <section>
                    <h2 className="text-xl font-semibold text-blue-700">🧑‍💼 Managing Your Account</h2>
                    <p className="text-gray-700">
                        Sign up, sign in, or log out using the buttons in the top-right corner. Your posts are saved securely to your account.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold  text-blue-700">🗑️ Deleting a Post</h2>
                    <p className="text-gray-700">
                        Go to your profile, click the post you want to delete, and hit the <strong>Delete</strong> icon. Deletion is irreversible, so be careful!
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-blue-700">📧 Still Need Help?</h2>
                    <p className="text-gray-700">
                        If you're facing any issues, feel free to reach out to us at
                        <a href="shrutikhadatkar2004@gmail.com" className="text-blue-600 underline ml-1">shrutikhadatkar2004@gmail.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
