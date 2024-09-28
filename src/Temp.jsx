import React, { useState } from "react";
import FaceAnalysis from "./utils/FaceAnalysis";

export default function Temp() {
    const [distracted, setDistracted] = useState(false);
    return (
        <>
            face analysis
            <FaceAnalysis distracted={distracted} setDistracted={setDistracted} />
        </>
    );
}