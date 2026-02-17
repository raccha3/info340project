import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OverworldPage from "./pages/OverworldPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/overworld" element={<OverworldPage />} />
    </Routes>
  );
}

export default App;
