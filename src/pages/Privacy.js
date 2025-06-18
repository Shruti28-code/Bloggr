// Privacy.jsx
import React from 'react';

export default function Privacy() {
    return (
        <div className="max-w-3xl mx-auto p-4 text-gray-800 leading-relaxed">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Privacy Policy</h1>

            <p className="mb-4">
                Bloggr respects your privacy and is committed to protecting your personal data. This policy outlines how we collect, use, and protect your information.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">1. Information We Collect</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Email address and name during registration.</li>
                <li>Content you post (text, images, hashtags).</li>
                <li>Technical data like IP address and browser type.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">2. How We Use Your Data</h2>
            <p className="mb-4">
                We use your data to operate Bloggr, personalize your experience, communicate with you, and improve our services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">3. Data Security</h2>
            <p className="mb-4">
                We implement robust security measures to safeguard your data. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">4. Third-Party Access</h2>
            <p className="mb-4">
                We do not sell your personal information. Limited data may be shared with third-party services (like hosting or analytics) as needed to provide our services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">5. Your Rights</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Access and update your personal information.</li>
                <li>Delete your account and data.</li>
                <li>Contact us for any concerns.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">6. Contact</h2>
            <p className="mb-8">
                For any questions regarding this policy, reach out at <span className="text-blue-600">shrutikhadatkar2004@gmail.com</span>.
            </p>

            <p className="text-center font-semibold text-sm text-gray-600">
                Last updated: June 2025
            </p>
        </div>
    );
}
