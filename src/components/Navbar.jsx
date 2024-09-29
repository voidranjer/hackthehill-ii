import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [progress, setProgress] = useState(70); // example progress value

  useEffect(() => {
    // Simulate progress update over time
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 10;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-screen justify-center items-center absolute">        
        <div className="w-[80vw] bg-white shadow-md rounded-2xl sticky mt-[1%]">
        <div className="container mx-auto flex items-center p-4">
            <div className="flex items-center space-x-2">
            <svg width="48" height="29" viewBox="0 0 48 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.38095 22.1905C8.38095 24.5048 6.50482 26.381 4.19048 26.381C1.87616 26.381 0 24.5048 0 22.1905C0 19.8761 1.87616 18 4.19048 18C6.50482 18 8.38095 19.8761 8.38095 22.1905Z" fill="url(#paint0_linear_7_170)"/>
                <path d="M4.5 22L13 4.5L35 24.5L43 4.5" stroke="url(#paint1_linear_7_170)" stroke-width="2"/>
                <path d="M47.381 4.19048C47.381 6.50482 45.5048 8.38096 43.1905 8.38096C40.8762 8.38096 39 6.50482 39 4.19048C39 1.87613 40.8762 0 43.1905 0C45.5048 0 47.381 1.87613 47.381 4.19048Z" fill="url(#paint2_linear_7_170)"/>
                <path d="M39.381 24.1905C39.381 26.5048 37.5048 28.381 35.1905 28.381C32.8762 28.381 31 26.5048 31 24.1905C31 21.8761 32.8762 20 35.1905 20C37.5048 20 39.381 21.8761 39.381 24.1905Z" fill="url(#paint3_linear_7_170)"/>
                <path d="M17.381 4.19048C17.381 6.50482 15.5048 8.38096 13.1905 8.38096C10.8762 8.38096 9 6.50482 9 4.19048C9 1.87613 10.8762 0 13.1905 0C15.5048 0 17.381 1.87613 17.381 4.19048Z" fill="url(#paint4_linear_7_170)"/>
                <defs>
                <linearGradient id="paint0_linear_7_170" x1="8.38095" y1="22.1905" x2="0" y2="22.1905" gradientUnits="userSpaceOnUse">
                <stop stop-color="#91F891"/>
                <stop offset="1" stop-color="#B5B5B5"/>
                </linearGradient>
                <linearGradient id="paint1_linear_7_170" x1="43" y1="14.5" x2="4.5" y2="14.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#91F891"/>
                <stop offset="1" stop-color="#919191"/>
                </linearGradient>
                <linearGradient id="paint2_linear_7_170" x1="47.381" y1="4.19048" x2="39" y2="4.19048" gradientUnits="userSpaceOnUse">
                <stop stop-color="#91F891"/>
                <stop offset="1" stop-color="#B5B5B5"/>
                </linearGradient>
                <linearGradient id="paint3_linear_7_170" x1="39.381" y1="24.1905" x2="31" y2="24.1905" gradientUnits="userSpaceOnUse">
                <stop stop-color="#91F891"/>
                <stop offset="1" stop-color="#B5B5B5"/>
                </linearGradient>
                <linearGradient id="paint4_linear_7_170" x1="17.381" y1="4.19048" x2="9" y2="4.19048" gradientUnits="userSpaceOnUse">
                <stop stop-color="#91F891"/>
                <stop offset="1" stop-color="#B5B5B5"/>
                </linearGradient>
                </defs>
            </svg>
            <span className="font-regular text-gray-700"><span className="font-bold">AI</span>vantage</span>
            </div>

            <div className="flex-1 mx-6">
            <div className="relative w-full h-4 bg-gray-200 rounded-full">
                <div
                className="absolute h-full bg-green-400 rounded-full"
                style={{ width: `${progress}%` }}
                ></div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Navbar;
