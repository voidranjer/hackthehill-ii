import Navbar from "./components/Navbar";
import { useAtom } from "jotai";
import { historyAtom } from "./utils/jotai";
import HistoryItem from "./components/HistoryItem";

export default function Profile() {
    const [history] = useAtom(historyAtom);
    console.log("History: ", history);

    const sortedHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
            <Navbar />

            <div className="flex pt-24">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Past Interviews</h1>
                    
                    <div className="grid">
                        {sortedHistory.map((interview, index) => (
                            <HistoryItem key={index} interview={interview} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}