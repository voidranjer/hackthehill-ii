
export default function Question({ loading, question, setStatus }) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center">Question</h1>
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <p className="text-center">{question}</p>
                )}
            </div>
    
            <button
                onClick={() => setStatus("interview")}
                className="fixed bottom-4 right-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
            >
                Start Interview
            </button>
        </div>
    );
}