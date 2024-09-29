import { useState, useEffect } from "react";
import { gemini_prompt } from "./gemini/gemini";
import ReactMarkdown from "react-markdown";
import { useAtom } from "jotai";

import { resumeAtom, historyAtom, progressAtom } from "./utils/jotai";
import Navbar from "./components/Navbar";
import FinalResults from "./FinalResults";

function buildPrompt(description, questions, response, resume, distractedTimes) {
    return `
        You need to help me analyze how well I did in my interview. Criticize every aspect of my response so that I can improve, do NOT hold back.

        This is the job description that I am applying for: ${description}
        This is the question that I was asked: ${questions}
        This is the response that I gave: ${response}
        This is my resume: ${resume}
        These were the times that I was distracted during the interview: ${distractedTimes}
        Everytime my distracted times are logged, then that means that was when the distracted state was changed to the new value. In our case, distracted means that me, the interviewer, was not looking at the camera. This is important because it can help us analyze my behaviour during the interview.

        The response that I give is NOT formatted and has no grammar because it is strictly speech to text. Assume grammatically correct but use the context of live spoken to analyze. Based on the the question and response. Provide a detailed analysis of what I did well and what I could improve on. Be as critical as possible and do NOT hold back.

        Your response should include:
        The bottom should all be rated out of 5.
        Communication: How well did I communicate my thoughts?
        Professionalism: How professional was my response?
        Knowledge: How well did I demonstrate my knowledge?
        Confidence: How confident was I in my response?
        Clarity: How clear was my response?

        And then, comment on what I did well and what I could improve on. Be as detailed as possible and do NOT hold back. When giving feedback, be sure to reference by resume and how we can shape my answer following my resume or things that I can infer. However, you should NOT judge my resume itself, only judge the response that I gave and how stuff in my resume could have helped me answer the question better. If I was distracted during the interview, you should also comment on how that affected my response.

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

export default function Results({ setStatus, setIndex, description, question, response, distractedTimes }) {
    const [prompt, setPrompt] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(true);

    const [resume] = useAtom(resumeAtom);
    const [history, setHistory] = useAtom(historyAtom);
    const [progress] = useAtom(progressAtom);

    useEffect(() => {
        // Set the prompt
        const newPrompt = buildPrompt(description, question, response, resume, distractedTimes);
        setPrompt(newPrompt);

        // Generate the analysis
        gemini_prompt(newPrompt, setAnalysis, setLoading);
    }, [description, question, response]);

    useEffect(() => {
        if (prompt) {
            console.log("Prompt: ", prompt);
        }
    }, [prompt]);

    // save the history of the interview
    useEffect(() => {
        if (analysis) {
            // current date
            const date = new Date();
            const newHistory = {
                question,
                response,
                analysis,
                date: date.toLocaleString()
            };

            setHistory((prevHistory) => {
                const isDuplicate = prevHistory.some((item) => item.question === newHistory.question && item.response === newHistory.response);
                if (isDuplicate) {
                    return prevHistory;
                } else {
                    return [newHistory, ...prevHistory];
                }
            });
            console.log("History: ", history);
        }
    }, [analysis]);

    // if (progress >= 100) {
    //     return (
    //         <FinalResults />
    //     );
    // }

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center h-screen bg-gray-100 z-[100]">
                <div className="p-4 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-center">Results for "{question}"</h1>
                    <hr className="mt-[2vw]"/>
                    <p className="text-left mt-[3vw]">Your response: {response}</p>
                    <div className="text-left">
                        Analysis: <ReactMarkdown>{analysis}</ReactMarkdown>
                    </div>
                </div>

                {progress < 100 ? <button
                    onClick={() => {
                        setIndex((prevIndex) => prevIndex + 1);
                        setStatus("question")}
                    }
                    className="fixed bottom-4 right-4 px-4 py-2 text-white bg-green-500 hover:opacity-[60%] active:opacity-[30%] rounded-lg"
                >
                    Next Question
                </button>
                : <button
                    onClick={() => {
                        // setIndex((prevIndex) => prevIndex + 1);
                        setStatus("summary")}
                    }
                    className="fixed bottom-4 right-4 px-4 py-2 text-white bg-green-500 hover:opacity-[60%] active:opacity-[30%] rounded-lg"
                >
                    View Summary!
                </button>}
            </div>
        </>
    );
}