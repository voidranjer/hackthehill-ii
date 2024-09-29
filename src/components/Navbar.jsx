import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { progressAtom } from "../utils/jotai";
import Logo from "./Logo";

const Navbar = ({ }) => {
    // const [progress, setProgress] = useState(0); // example progress value
    const [progress, setProgress] = useAtom(progressAtom);
    
    if (progress > 100) {
        setProgress(100);
    }

    return (
        <div className="flex w-screen justify-center items-center absolute z-[0]">
            <div className="w-[80vw] bg-white rounded-2xl sticky mt-[1%]">
                <div className="container mx-auto flex items-center p-4">
                    <Link className="flex items-center space-x-2" to={"/"}>
                        <Logo className={"h-10 w-10"}/>
                        <span className="font-regular text-gray-700"><span className="font-bold">AI</span>vantage</span>
                    </Link>

                    <div className="flex-1 mx-6">
                        <div className="relative w-full h-4 bg-gray-200 rounded-full">
                            <div
                                className="absolute h-full bg-green-400 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                    </div>

                    {/* profile icon */}
                    <Link
                        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
                        to="/profile"
                    >
                        <FiUser className="text-2xl text-gray-700" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
