
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Logo({ fontSize = '1.5rem' }) {
//     return (
//         <Link to="/" className="flex items-center space-x-2 group">
//             {/* Speech Bubble Icon */}
//             <div className="relative w-8 h-6 bg-blue-800 rounded-md shadow group-hover:bg-blue-900">
//                 {/* Tail/Pointer */}
//                 <div className="absolute -bottom-1 left-2 w-2 h-2 bg-blue-800 rotate-45 group-hover:bg-blue-900"></div>

//                 {/* "Text lines" inside bubble */}
//                 <div className="absolute w-4 h-0.5 bg-white top-1 left-2 rounded"></div>
//                 <div className="absolute w-3 h-0.5 bg-white top-2.5 left-2 rounded"></div>
//             </div>

//             {/* App Name */}
//             <span
//                 className="font-bold text-blue-800 group-hover:text-blue-900 transition-colors"
//                 style={{ fontSize }}
//             >
//                 Bloggr
//             </span>
//         </Link>
//     );
// }

// export default Logo;



import React from 'react';
import { Link } from 'react-router-dom';

function Logo({ fontSize = '1.5rem', iconSize = 22 }) {
    return (
        <Link to="/" className="flex items-center space-x-1 group flex-shrink-0">
            {/* Icon Container - Fixed size to prevent compression */}
            <div className="flex-shrink-0 w-8 h-8 bg-blue-800 rounded-lg shadow-md flex items-center justify-center group-hover:bg-blue-900 transition-colors duration-200">
                {/* Custom Blog Icon using SVG */}
                <svg
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
                >
                    <path
                        d="M20 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 10h8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 14h5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* App Name - Responsive text */}
            <span
                className="font-bold text-blue-800 group-hover:text-blue-900 transition-colors duration-200 whitespace-nowrap"
                style={{
                    fontSize,
                    minWidth: 'fit-content'
                }}
            >
                Bloggr
            </span>
        </Link>
    );
}

export default Logo;
