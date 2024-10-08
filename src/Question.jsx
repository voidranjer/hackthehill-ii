import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

export default function Question({ question, setStatus }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center w-full">
                {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                        <TailSpin
                            visible={true}
                            height="80"
                            width="80"
                            color="black"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                        
                        <h1 className=' text-[36px] font-semibold'>
                            Creating <span className='bg-gradient-to-r from-[#7CFF7C] to-gray-400 text-transparent bg-clip-text'>personalized</span> interview questions...
                        </h1>
                        <div className='w-[40%] font-medium text-[15px] text-center flex justify-center items-center'>
                            <p>Improving your life with AI and Computer Vision</p>
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-full flex flex-col justify-center items-center'>
                        <h1 className='font-bold text-[28px] mb-[1vw]'>Question</h1>
                        <button
                        onClick={() => setStatus("interview")}
                        className="mt-[10vw] hover:opacity-[60%] active:opacity-[30%] fixed px-4 py-2 bg-green-500 text-white rounded-lg"
                        >
                        Start Interview
                        </button>
                        <p className="text-center text-xl">{question}</p>
                    </div>
                )}
            </div>


        </div>
    );
}
