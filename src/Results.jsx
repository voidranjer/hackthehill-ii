import { useEffect } from "react";

function buildPrompt(description, questions, response) {
    return `
        You need to help me analyze how well I did in my interview. Criticize every aspect of my response so that I can improve, do NOT hold back.

        This is the job description that I am applying for: ${description}
        This is the question that I was asked: ${questions}
        This is the response that I gave: ${response}

        Based on the the question and response,
    `;
}

export default function Results({ setStatus, description, question, response }) {
    const [prompt, setPrompt] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // set the prompt
        setPrompt(buildPrompt(description, question, response));
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center">Results</h1>
                <p className="text-center">{question}</p>
                <p className="text-center">{response}</p>
            </div>

            <button
                onClick={() => setStatus("question")}
                className="fixed bottom-4 right-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
            >
                Next Question
            </button>
        </div>
    );
}