import React from 'react';

function Footer() {
    return (
        <footer className="bg-transparent text-gray-800 py-6 px-4 bottom-0 z-50 mt-auto w-full">
            {/* Top Links */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-m mb-3">
                <a href="/terms" className="hover:underline font-medium">
                    Terms of Service
                </a>
                <a href="/help" className="hover:underline font-medium">
                    Help
                </a>
                <a href="/privacy" className="hover:underline font-medium">
                    Privacy
                </a>
            </div>

            {/* Divider */}
            <div className="border-t border-white/40 w-full text-sm max-w-4xl mx-auto mb-3" />

            {/* Bottom Info */}
            <div className="text-center text-xs text-gray-700 space-y-1">
                {/* <p>
                    Powered by{' '}
                    <span className="font-semibold text-blue-600">
                        Shruti Khadatkar
                    </span>
                </p> */}
                <p>© {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
