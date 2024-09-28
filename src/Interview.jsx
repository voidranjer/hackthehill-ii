import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { gemini_prompt } from "./gemini/gemini";
import Question from "./Question";
import Answer from "./Answer";
import Results from "./Results";

function buildPrompt(description, questions) {
    return `
        You are interviewing for a job and this is the job description of the role that you want to apply for.

        Job Description: "${description}" End of job description.

        Generate only ONE question that could be asked to help improve in a technical or behavioral aspect of the job for the job interview. The question should be open-ended and should not be a yes or no question.

        Question: "${questions}" End of question.

        You should provide the question in only 1 line, and the question should be relevant to the job description provided. Do NOT add any additional markup formatting in your response and ONLY provide the question in the response.
    `;
}

export default function Interview() {
    const [status, setStatus] = useState("question"); // question, interview, results!
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState("");
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [newQuestion, setNewQuestion] = useState(false);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const urlDescription = searchParams.get("description");
        if (urlDescription) {
            setDescription(urlDescription);
        }
    }, [searchParams]);

    useEffect(() => {
        if (description) {
            const prompt = buildPrompt(description, questions);
            gemini_prompt(prompt, setQuestion, setLoading);
        }
    }, [description, questions, newQuestion]);

    useEffect(() => {
        if (question) {
            setQuestions(prevQuestions => prevQuestions ? `${prevQuestions}; ${question}` : question);
        }
    }, [question]);

    // reset the question and response when the index changes
    useEffect(() => {
        setQuestion("");
        setResponse("");
        setLoading(true);
        setNewQuestion(!newQuestion);
    }, [index]);

    if (status === "question") {
        return (
            <Question
                loading={loading}
                question={question}
                setStatus={setStatus}
            />
        );
    } else if (status === "interview") {
        return (
            <Answer 
                setStatus={setStatus}
                question={question}
                setResponse={setResponse}
            />
        );
    } else if (status === "results") {
        return (
            <Results 
                setStatus={setStatus}
                setIndex={setIndex}
                description={description}
                question={question}
                response={response}
            />
        )
    }
}