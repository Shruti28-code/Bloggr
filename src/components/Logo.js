
import React from 'react';
import { Link } from 'react-router-dom';

function Logo({ fontSize = '1.5rem' }) {
    return (
        <Link to="/" className="flex items-center space-x-2 group">
            {/* Speech Bubble Icon */}
            <div className="relative w-8 h-6 bg-blue-800 rounded-md shadow group-hover:bg-blue-900">
                {/* Tail/Pointer */}
                <div className="absolute -bottom-1 left-2 w-2 h-2 bg-blue-800 rotate-45 group-hover:bg-blue-900"></div>

                {/* "Text lines" inside bubble */}
                <div className="absolute w-4 h-0.5 bg-white top-1 left-2 rounded"></div>
                <div className="absolute w-3 h-0.5 bg-white top-2.5 left-2 rounded"></div>
            </div>

            {/* App Name */}
            <span
                className="font-bold text-blue-800 group-hover:text-blue-900 transition-colors"
                style={{ fontSize }}
            >
                Bloggr
            </span>
        </Link>
    );
}

export default Logo;


// import React from 'react';
// import { Link } from 'react-router-dom';

// function Logo({ fontSize = '1.5rem' }) {
//     return (
//         <Link to="/" className="flex items-center space-x-2 group">
//             {/* Notepad with Pen */}
//             <div className="relative w-8 h-10 bg-white border-2 border-sky-500 rounded-sm shadow-sm">
//                 {/* Notebook lines */}
//                 <div className="absolute w-5 h-0.5 bg-sky-400 top-2 left-1 rounded"></div>
//                 <div className="absolute w-6 h-0.5 bg-sky-400 top-4 left-1 rounded"></div>
//                 <div className="absolute w-4 h-0.5 bg-sky-400 top-6 left-1 rounded"></div>

//                 {/* Pen */}
//                 <div className="absolute w-1 h-5 bg-sky-500 rotate-45 top-1 right-[-6px] rounded-sm shadow-md group-hover:bg-sky-600"></div>
//             </div>

//             {/* App Name */}
//             <span
//                 className="font-bold text-sky-700 group-hover:text-sky-800 transition-colors"
//                 style={{ fontSize }}
//             >
//                 Bloggr
//             </span>
//         </Link>
//     );
// }

// export default Logo;

// import React from 'react';
// import { Link } from 'react-router-dom';

// function Logo({ fontSize = '1.5rem' }) {
//     return (
//         <Link to="/" className="flex items-center space-x-2 group">
//             {/* Diary Icon */}
//             <div className="relative w-10 h-10 bg-white border-2 border-sky-500 rounded-xl shadow-sm overflow-hidden">
//                 {/* Notebook Lines */}
//                 <div className="absolute w-6 h-0.5 bg-sky-400 top-2 left-2 rounded animate-pulse"></div>
//                 <div className="absolute w-7 h-0.5 bg-sky-400 top-4 left-2 rounded animate-pulse delay-100"></div>
//                 <div className="absolute w-5 h-0.5 bg-sky-400 top-6 left-2 rounded animate-pulse delay-200"></div>

//                 {/* Animated Pen */}
//                 <div className="absolute w-1 h-5 bg-gradient-to-b from-sky-600 to-sky-400 rotate-45 top-1 right-[-6px] rounded-sm shadow-md group-hover:scale-105 transition-transform"></div>
//             </div>

//             {/* App Name */}
//             <span
//                 className="font-bold text-sky-700 group-hover:text-sky-800 transition-colors"
//                 style={{ fontSize }}
//             >
//                 Bloggr
//             </span>
//         </Link>
//     );
// }

// export default Logo;


