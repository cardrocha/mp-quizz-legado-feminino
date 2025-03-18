import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { PageQuiz } from "./pages/Quiz";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<PageQuiz />} />
    </Routes>
  );
};

export default Rotas;

