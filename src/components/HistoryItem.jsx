import Markdown from "react-markdown";

export default function HistoryItem({ interview }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md my-4">
            <h1 className="text-xl font-semibold text-gray-800">Question: {interview.question}</h1>
            <p className="text-gray-600">Date: {interview.date}</p>
            <p className="text-gray-600">Response: {interview.response}</p>
            <p className="text-gray-600 text-sm">Analysis: <Markdown>{interview.analysis}</Markdown></p>
        </div>
    );
}