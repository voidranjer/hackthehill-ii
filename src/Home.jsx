import React, { useState } from 'react';
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom';
import pdfToText from "react-pdftotext";

import { resumeAtom } from './utils/jotai';

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
          .then((text) => {console.log("Resume", text); setResume(text)})
          .catch((error) => console.error("Failed to extract text from pdf"));
      }

    return (
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
    );
}