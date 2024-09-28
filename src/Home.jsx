import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const compressedDescription = encodeURIComponent(description);
        navigate(`/interview?description=${compressedDescription}`);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Job Description:
                <input type="text" value={description} onChange={handleDescriptionChange} />
            </label>
            <button type="submit">Start Interview</button>
        </form>
    );
}