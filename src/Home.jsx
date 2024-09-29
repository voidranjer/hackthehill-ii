import React, { useState } from 'react';
import { useAtom } from 'jotai'
import { Link, useNavigate } from 'react-router-dom';
import pdfToText from "react-pdftotext";

import { resumeAtom } from './utils/jotai';
import { jobs } from './utils/jobs';

function JobPosting({ job }) {
    const url = "/interview?description=" + encodeURIComponent("Company Name: " + job.company_name + " Job Title: " + job.job_title + " Job Location: " + job.location + " Job Description: " + job.job_description);

    return (
        <Link 
            className='flex flex-col bg-red-300 w-full h-[264px]'
            to={url}
        >
            <img src={job.icon} alt="Job Icon" className="object-contain w-10 h-12" />
            <h2>{job.company_name} - {job.job_title}</h2>
            <div>{job.posted_date} - {job.location}</div>
            <p className='truncate text-wrap'>{job.job_description}</p>
        </Link>
    );
}

export default function Home() {
  const [description, setDescription] = useState('');
  const [resume, setResume] = useAtom(resumeAtom);
  const navigate = useNavigate();

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
        pdfToText(file)
            .then((text) => { console.log("Resume", text); setResume(text) })
            .catch((error) => console.error("Failed to extract text from pdf"));
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Job Description:
                    <input type="text" value={description} onChange={handleDescriptionChange} />
                </label>
                <label>
                    Resume:
                    <input type="file" accept="application/pdf" onChange={extractText} />
                </label>
                <button type="submit">Start Interview</button>
            </form>

            {/* jobs */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-1 h-[256px] overflow-y-auto'>
                {jobs.map((job) => (
                    <JobPosting key={job.job_title} job={job} />
                ))}
            </div>
        </>
    );
}
