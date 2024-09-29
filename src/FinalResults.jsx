import Navbar from "./components/Navbar";
import { useAtom } from "jotai";
import { historyAtom, progressAtom } from "./utils/jotai";
import HistoryItem from "./components/HistoryItem";

export default function FinalResults() {
    const [history] = useAtom(historyAtom);
    const [progress, setProgress] = useAtom(progressAtom);

    const sortedHistory = history
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (
        <>
            <Navbar />
            <div className="flex pt-24">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Final Results</h1>

                    <div className="grid">
                        {sortedHistory.map((interview, index) => (
                            <HistoryItem key={index} interview={interview} />
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="flex w-full justify-center items-center">
                <button
                    onClick={() => {
                        setProgress(0);
                        window.location.href = "/";
                    }}
                    className="shadow-xl font-bold bg-gradient-to-r from-[#7CFF7C] to-gray-400 text-transparent bg-clip-text"
                >
                    Go Home
                </button>
            </div>

            <div className="my-2" />
        </>
    );
}