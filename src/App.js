import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/Movies/MovieDetails"; // Make sure this exists or create it
import HomePage from "./HomePage"; // We'll move your main app logic into this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
