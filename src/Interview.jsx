import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { gemini_prompt } from "./gemini/gemini";
import { useAtom } from "jotai";
import { progressAtom } from "./utils/jotai";
import Question from "./Question";
import Answer from "./Answer";
import Results from "./Results";
import FinalResults from "./FinalResults";

function buildPrompt(description, questions) {
    return `
        You are interviewing for a job and this is the job description of the role that you want to apply for.

        Job Description: "${description}" End of job description.

        Generate only ONE question that could be asked to help improve in a technical or behavioral aspect of the job for the job interview. The question should be open-ended and should not be a yes or no question. The question should relate to the job posting as much as possible.

        Questions already asked: "${questions}" End of questions. Do not ask a question that has already been asked.

        The question should be directed to the interviewee, who is applying to the job. You should provide the question in only 1 line, and the question should be relevant to the job description provided. Do NOT add any additional markup formatting in your response and ONLY provide the question in the response.
    `;
}

export default function Interview() {
    const [status, setStatus] = useState("question"); // question, interview, results!
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState("");
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(1);
    const [newQuestion, setNewQuestion] = useState(false);
    const [distractedTimes, setDistractedTimes] = useState("");

    const [searchParams] = useSearchParams();

    const [progress, setProgress] = useAtom(progressAtom);

    useEffect(() => {
        const urlDescription = searchParams.get("description");
        if (urlDescription) {
            setDescription(urlDescription);
        }
    }, [searchParams]);

    useEffect(() => {
        if (description) {
            const prompt = buildPrompt(description, questions);
            console.log(prompt);
            gemini_prompt(prompt, setQuestion, setLoading);
        }
    }, [description, newQuestion]);

    useEffect(() => {
        if (question) {
            setQuestions(prevQuestions => prevQuestions ? `${prevQuestions}; ${question}` : question);
        }
    }, [question]);

    // increment progress only once when changed to results
    useEffect(() => {
        if (status === "results") {
            setProgress(progress + 20); // increase the progress by 20%
        }
    }, [status]);

    // reset the question and response when the index changes
    useEffect(() => {
        setQuestion("");
        setResponse("");
        setLoading(true);
        setNewQuestion(!newQuestion);
    }, [index]);

    if (status === "summary") {
        return (
            <FinalResults />
        );
    } else if (status === "question") {
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
                setDistractedTimes={setDistractedTimes}
            />
        );
    } else if (status === "results") {
        // setProgress(progress + 20); // increase the progress by 20%
        return (
            <Results 
                setStatus={setStatus}
                setIndex={setIndex}
                description={description}
                question={question}
                response={response}
                distractedTimes={distractedTimes}
            />
        )
    }
}