import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Interview from "./Interview";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/interview" element={<Interview />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
