import React, { useState, useRef } from 'react';
import { useAtom } from 'jotai'
import { Link, useNavigate } from 'react-router-dom';
import pdfToText from "react-pdftotext";
import Navbar from './components/Navbar';
import { resumeAtom } from './utils/jotai';
import { jobs } from './utils/jobs';

function JobPosting({ job }) {
    const url = "/interview?description=" + encodeURIComponent("Company Name: " + job.company_name + " Job Title: " + job.job_title + " Job Location: " + job.job_location + " Job Description: " + job.job_description);

    return (
        <Link 
            className='p-2 text-center hover:opacity-[60%] active:opacity-[30%] bg-white justify-center items-center flex flex-col w-[80%] h-[264px] rounded-2xl'
            to={url}
        >
            <img src={job.icon} alt="Job Icon" className="object-contain w-10 h-12" />
            <h2>{job.company_name} - {job.job_title}</h2>
            <div>{job.posted_date} - {job.job_location}</div>
            {/* Job Location doesn't work */}
            {/* <p className='truncate text-wrap'>{job.job_description}</p> */}
        </Link>
    );
}

export default function Home() {
  const [description, setDescription] = useState('');
  const [resume, setResume] = useAtom(resumeAtom);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const compressedDescription = encodeURIComponent(description);
    navigate(`/interview?description=${compressedDescription}`);
  };

    function extractText(event) {
        const file = event.target.files[0];
        if (file){
            setFileName(file.name); 
            pdfToText(file)
            .then((text) => { console.log("Resume", text); setResume(text) })
            .catch((error) => console.error("Failed to extract text from pdf"));
        }

    }
    const sectionRef = useRef(null);
    const scrollToSection = () => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
    return (
        <>
            <Navbar />
            <form onSubmit={handleFormSubmit}>
                <div className="flex justify-center items-center w-screen h-screen flex-col overflow-x-hidden">
                {/* External Div */}
                <div className="mt-[5vw] min-w-[400px] min-h-[300px] border-2 border-dashed border-[#818183] p-4 rounded-2xl">
                    {/* Interior Div */}
                    <div className="w-full h-full flex flex-col justify-center items-center text-center relative">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={extractText}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <svg
                        width="28"
                        height="29"
                        viewBox="0 0 48 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M8.38095 22.1905C8.38095 24.5048 6.50482 26.381 4.19048 26.381C1.87616 26.381 0 24.5048 0 22.1905C0 19.8761 1.87616 18 4.19048 18C6.50482 18 8.38095 19.8761 8.38095 22.1905Z"
                        fill="url(#paint0_linear_7_170)"
                        />
                        <path
                        d="M4.5 22L13 4.5L35 24.5L43 4.5"
                        stroke="url(#paint1_linear_7_170)"
                        strokeWidth="2"
                        />
                        <path
                        d="M47.381 4.19048C47.381 6.50482 45.5048 8.38096 43.1905 8.38096C40.8762 8.38096 39 6.50482 39 4.19048C39 1.87613 40.8762 0 43.1905 0C45.5048 0 47.381 1.87613 47.381 4.19048Z"
                        fill="url(#paint2_linear_7_170)"
                        />
                        <path
                        d="M39.381 24.1905C39.381 26.5048 37.5048 28.381 35.1905 28.381C32.8762 28.381 31 26.5048 31 24.1905C31 21.8761 32.8762 20 35.1905 20C37.5048 20 39.381 21.8761 39.381 24.1905Z"
                        fill="url(#paint3_linear_7_170)"
                        />
                        <path
                        d="M17.381 4.19048C17.381 6.50482 15.5048 8.38096 13.1905 8.38096C10.8762 8.38096 9 6.50482 9 4.19048C9 1.87613 10.8762 0 13.1905 0C15.5048 0 17.381 1.87613 17.381 4.19048Z"
                        fill="url(#paint4_linear_7_170)"
                        />
                        <defs>
                        <linearGradient
                            id="paint0_linear_7_170"
                            x1="8.38095"
                            y1="22.1905"
                            x2="0"
                            y2="22.1905"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#91F891" />
                            <stop offset="1" stopColor="#B5B5B5" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_7_170"
                            x1="43"
                            y1="14.5"
                            x2="4.5"
                            y2="14.5"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#91F891" />
                            <stop offset="1" stopColor="#919191" />
                        </linearGradient>
                        <linearGradient
                            id="paint2_linear_7_170"
                            x1="47.381"
                            y1="4.19048"
                            x2="39"
                            y2="4.19048"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#91F891" />
                            <stop offset="1" stopColor="#B5B5B5" />
                        </linearGradient>
                        <linearGradient
                            id="paint3_linear_7_170"
                            x1="39.381"
                            y1="24.1905"
                            x2="31"
                            y2="24.1905"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#91F891" />
                            <stop offset="1" stopColor="#B5B5B5" />
                        </linearGradient>
                        <linearGradient
                            id="paint4_linear_7_170"
                            x1="17.381"
                            y1="4.19048"
                            x2="9"
                            y2="4.19048"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#91F891" />
                            <stop offset="1" stopColor="#B5B5B5" />
                        </linearGradient>
                        </defs>
                    </svg>
                    <p className="mt-4 text-gray-500">Connect your Resume</p>
                    {fileName && <p className="mt-2 text-sm text-gray-700">{fileName}</p>}
                    </div>
                </div>
                <div className='flex flex-col min-w-[400px]'>
                    <h1 className='font-bold text-[12px] text-[#2b2b2b] mt-[1vw]'>Enter the Job Description</h1>
                    <input
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="ml-2 p-2 border rounded bg-[#DFDFDF] border-none"
                    />
                    <div className='flex w-full justify-center'>
                    <button type="submit" className="w-[40%] gap-4 flex mt-[3vw] p-2 border-2 shadow-md font-bold bg-gradient-to-r from-[#7CFF7C] to-gray-400 text-transparent bg-clip-text rounded">
                    Get Started
                    <svg
                        width="38"
                        height="29"
                        viewBox="0 0 48 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M8.38095 22.1905C8.38095 24.5048 6.50482 26.381 4.19048 26.381C1.87616 26.381 0 24.5048 0 22.1905C0 19.8761 1.87616 18 4.19048 18C6.50482 18 8.38095 19.8761 8.38095 22.1905Z"
                        fill="url(#paint0_linear_7_170)"
                        />
                        <path
                        d="M4.5 22L13 4.5L35 24.5L43 4.5"
                        stroke="url(#paint1_linear_7_170)"
                        strokeWidth="2"
                        />
                        <path
                        d="M47.381 4.19048C47.381 6.50482 45.5048 8.38096 43.1905 8.38096C40.8762 8.38096 39 6.50482 39 4.19048C39 1.87613 40.8762 0 43.1905 0C45.5048 0 47.381 1.87613 47.381 4.19048Z"
                        fill="url(#paint2_linear_7_170)"
                        />
                        <path
                        d="M39.381 24.1905C39.381 26.5048 37.5048 28.381 35.1905 28.381C32.8762 28.381 31 26.5048 31 24.1905C31 21.8761 32.8762 20 35.1905 20C37.5048 20 39.381 21.8761 39.381 24.1905Z"
                        fill="url(#paint3_linear_7_170)"
                        />
                        <path
                        d="M17.381 4.19048C17.381 6.50482 15.5048 8.38096 13.1905 8.38096C10.8762 8.38096 9 6.50482 9 4.19048C9 1.87613 10.8762 0 13.1905 0C15.5048 0 17.381 1.87613 17.381 4.19048Z"
                        fill="url(#paint4_linear_7_170)"
                        />
                        <defs>
                        <linearGradient
                            id="paint0_linear_7_170"
                            x1="8.38095"
                            y1="22.1905"
                            x2="0"
                            y2="22.1905"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#91F891" />
                            <stop offset="1" stopColor="#B5B5B5" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_7_170"
                            x1="43"
                            y1="14.5"
                            x2="4.5"
                            y2="14.5"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#91F891" />
                            <stop offset="1" stopColor="#919191" />
                        </linearGradient>
                        <linearGradient
                            id="paint2_linear_7_170"
                            x1="47.381"
                            y1="4.19048"
                            x2="39"
                            y2="4.19048"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#91F891" />
                            <stop offset="1" stopColor="#B5B5B5" />
                        </linearGradient>
                        <linearGradient
                            id="paint3_linear_7_170"
                            x1="39.381"
                            y1="24.1905"
                            x2="31"
                            y2="24.1905"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#91F891" />
                            <stop offset="1" stopColor="#B5B5B5" />
                        </linearGradient>
                        <linearGradient
                            id="paint4_linear_7_170"
                            x1="17.381"
                            y1="4.19048"
                            x2="9"
                            y2="4.19048"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#91F891" />
                            <stop offset="1" stopColor="#B5B5B5" />
                        </linearGradient>
                        </defs>
                    </svg>
                    </button>
                    
                    </div>
                </div>
                </div>

            </form>
            <div className='w-full mt-[3vw] flex justify-center items-center'>
                <button onClick={scrollToSection} className='absolute bottom-0 w-[15vw] text-[12px] hover:opacity-[60%] active:opacity-[30%] p-2 bg-gradient-to-r from-[#7CFF7C] to-gray-400 text-white rounded-t-2xl'> View Available Jobs </button>
            
                </div>
            
            {/* jobs */}

            <div ref={sectionRef} className=' overflow-x-hidden justify-center p-5 grid grid-cols-1 md:grid-cols-3 gap-5 h-screen w-screen bg-[#dfdfdf] overflow-y-auto'>
                {jobs.map((job) => (
                    <JobPosting key={job.job_title} job={job} />
                ))}
            </div>
        </>
    );
}
