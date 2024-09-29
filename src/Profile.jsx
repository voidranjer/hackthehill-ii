import Navbar from "./components/Navbar";
import { useAtom } from "jotai";
import { historyAtom } from "./utils/jotai";

export default function Profile() {
    const [history] = useAtom(historyAtom);
    console.log("History: ", history);

    return (
        <>
            <Navbar />

            <div className="flex pt-24">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Past Interviews</h1>
                </div>
            </div>
        </>
    );
}