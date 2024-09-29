import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Interview from "./Interview";
import Temp from "./Temp";
import Profile from "./Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/interview" element={<Interview />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/temp" element={<Temp />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
