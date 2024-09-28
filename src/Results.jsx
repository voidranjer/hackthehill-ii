import { useState, useEffect } from "react";
import { gemini_prompt } from "./gemini/gemini";
import ReactMarkdown from "react-markdown";

function buildPrompt(description, questions, response) {
    return `
        You need to help me analyze how well I did in my interview. Criticize every aspect of my response so that I can improve, do NOT hold back.

        This is the job description that I am applying for: ${description}
        This is the question that I was asked: ${questions}
        This is the response that I gave: ${response}

        Based on the the question and response. Provide a detailed analysis of what I did well and what I could improve on. Be as critical as possible and do NOT hold back.

        Your response should include:
        The bottom should all be rated out of 5.
        Communication: How well did I communicate my thoughts?
        Professionalism: How professional was my response?
        Knowledge: How well did I demonstrate my knowledge?
        Confidence: How confident was I in my response?
        Clarity: How clear was my response?

        And then, comment on what I did well and what I could improve on. Be as detailed as possible and do NOT hold back.

        An exact response format should be:
        Communication: 5/5
        Professionalism: 5/5
        Knowledge: 5/5
        Confidence: 5/5
        Clarity: 5/5

        What you did well:
        - ...

        What you could improve on:
        - ...

        End of response.

        Do not use markdown or any other formatting in your response. You should follow the analysis format exactly as shown above.
    `;
}

export default function Results({ setStatus, setIndex, description, question, response }) {
    const [prompt, setPrompt] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set the prompt
        const newPrompt = buildPrompt(description, question, response);
        setPrompt(newPrompt);

        // Generate the analysis
        gemini_prompt(newPrompt, setAnalysis, setLoading);
    }, [description, question, response]);

    useEffect(() => {
        if (prompt) {
            console.log("Prompt: ", prompt);
        }
    }, [prompt]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center">Results</h1>
                <p className="text-center">{question}</p>
                <p className="text-center">{response}</p>
                <div className="text-center">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
            </div>

            <button
                onClick={() => {
                    setIndex((prevIndex) => prevIndex + 1);
                    setStatus("question")}
                }
                className="fixed bottom-4 right-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
            >
                Next Question
            </button>
        </div>
    );
}