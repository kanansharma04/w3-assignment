import { useEffect, useState } from "react";
import UserSelector from "../components/UserSelector";
import AddUser from "../components/AddUser";
import ClaimButton from "../components/ClaimButton";
import Leaderboard from "../components/Leaderboard";

function ClaimPopup({ show, user, points, onClose }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in">
      <div className="bg-gradient-to-br from-pink-400 via-yellow-300 to-purple-400 rounded-2xl shadow-2xl p-8 text-center scale-105 animate-bounce">
        <h2 className="text-3xl font-extrabold text-white mb-4 drop-shadow-lg">🎉 Points Claimed! 🎉</h2>
        <div className="text-2xl font-bold text-white mb-2">
          {user} just won <span className="text-black-800">{points}</span> points!
        </div>
        <button 
          className="mt-4 px-6 py-2 bg-white text-pink-600 font-bold rounded-full shadow hover:bg-pink-100 transition-all"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [claimPoints, setClaimPoints] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch("/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLeaderboard(data);
        if (data.length && !selectedUser) setSelectedUser(data[0]._id);
      });
  }, []);

  const refreshLeaderboard = () => {
    fetch("/users")
      .then(res => res.json())
      .then(setLeaderboard);
  };

  const handleAddUser = async (name) => {
    if (!name.trim()) return;
    const res = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      const user = await res.json();
      setUsers([...users, user]);
      setLeaderboard([...leaderboard, user]);
      setSelectedUser(user._id);
    } else {
      alert("User already exists or error occurred.");
    }
  };

  const handleClaim = async () => {
    if (!selectedUser) return;
    const res = await fetch(`/claim/${selectedUser}`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      const points = data.user.totalPoints - leaderboard.find(u => u._id === selectedUser)?.totalPoints || data.user.totalPoints;
      setClaimPoints(points);
      setShowPopup(true);
      refreshLeaderboard();
    }
  };

  return (
    <div>
      <ClaimPopup
        show={showPopup}
        user={users.find(u => u._id === selectedUser)?.name}
        points={claimPoints}
        onClose={() => setShowPopup(false)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card for user actions */}
        <div className="card-3d rounded-xl shadow-2xl p-6 transition-transform duration-300 border-4 border-pink-400"
             style={{ background: "#E6E6FA" }}>
          <h2 className="text-lg font-extrabold mb-2 text-pink-600 tracking-wider">Claim Points</h2>
          <div className="flex flex-col gap-4">
            <UserSelector users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <ClaimButton onClick={handleClaim} disabled={!selectedUser} />
            <AddUser onAddUser={handleAddUser} />
          </div>
        </div>
        {/* Card for leaderboard */}
        <div className="card-3d rounded-xl shadow-2xl p-6 transition-transform duration-300 border-4 border-yellow-300"
             style={{ background: "#E6E6FA" }}>
          <Leaderboard leaderboard={leaderboard} selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
}

