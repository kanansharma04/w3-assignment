import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import LeaderboardPage from "./pages/LeaderboardPage";
import HistoryPage from "./pages/HistoryPage";

function Navbar() {
  const location = useLocation();
  return (
    <nav className="flex justify-between items-center mb-8 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-xl transition-all duration-300">
      <div className="text-white font-bold text-xl tracking-wide">Leaderboard App</div>
      <div className="flex gap-6">
        <Link
          to="/leaderboard"
          className={`transition-colors px-3 py-2 rounded-lg font-medium ${
            location.pathname === "/leaderboard" ? "bg-white text-blue-600 shadow" : "text-white hover:bg-blue-700"
          }`}
        >
          Leaderboard
        </Link>
        <Link
          to="/history"
          className={`transition-colors px-3 py-2 rounded-lg font-medium ${
            location.pathname === "/history" ? "bg-white text-blue-600 shadow" : "text-white hover:bg-blue-700"
          }`}
        >
          Claim History
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="max-w-3xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<LeaderboardPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}
