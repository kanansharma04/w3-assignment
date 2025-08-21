import { useEffect, useState } from "react";
import UserSelector from "../components/UserSelector";
import AddUser from "../components/AddUser";
import ClaimButton from "../components/ClaimButton";
import Leaderboard from "../components/Leaderboard";
import { getUsers, addUser, claimPoints } from "../common/api"; // <-- Import API functions

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
  const [claimPointsState, setClaimPointsState] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(""); // Add error state

  useEffect(() => {
    async function fetchUsers() {
      setError("");
      try {
        const data = await getUsers();
        setUsers(data);
        setLeaderboard(data);
        if (data.length && !selectedUser) setSelectedUser(data[0]._id);
      } catch (err) {
        setError(err.message || "Could not load users. Please try again later.");
        setUsers([]);
        setLeaderboard([]);
      }
    }
    fetchUsers();
  }, []);

  const refreshLeaderboard = async () => {
    try {
      const data = await getUsers();
      setLeaderboard(data);
    } catch {
      // Optionally handle error
    }
  };

  const handleAddUser = async (name) => {
    if (!name.trim()) return;
    try {
      const user = await addUser(name);
      setUsers([...users, user]);
      setLeaderboard([...leaderboard, user]);
      setSelectedUser(user._id);
    } catch (err) {
      alert(err.message || "User already exists or error occurred.");
    }
  };

  const handleClaim = async () => {
    if (!selectedUser) return;
    try {
      const data = await claimPoints(selectedUser);
      const points = data.user.totalPoints - leaderboard.find(u => u._id === selectedUser)?.totalPoints || data.user.totalPoints;
      setClaimPointsState(points);
      setShowPopup(true);
      refreshLeaderboard();
    } catch {
      // Optionally handle error
    }
  };

  return (
    <div className="px-1 py-2 w-full">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-bold">
          {error}
        </div>
      )}
      <ClaimPopup
        show={showPopup}
        user={users.find(u => u._id === selectedUser)?.name}
        points={claimPointsState}
        onClose={() => setShowPopup(false)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 w-full">
        {/* Card for user actions */}
        <div className="card-3d rounded-xl shadow-2xl p-3 sm:p-6 transition-transform duration-300 border-4 border-pink-400"
             style={{ background: "#E6E6FA" }}>
          <h2 className="text-lg font-extrabold mb-2 text-pink-600 tracking-wider">Add User</h2>
          <h2 className="text-lg font-extrabold mb-2 text-pink-600 tracking-wider">Claim Points</h2>
          <div className="flex flex-col gap-3 sm:gap-4">
            <UserSelector users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <ClaimButton onClick={handleClaim} disabled={!selectedUser} />
            <AddUser onAddUser={handleAddUser} />
          </div>
        </div>
        {/* Card for leaderboard */}
        <div className="card-3d rounded-xl shadow-2xl p-3 sm:p-6 transition-transform duration-300 border-4 border-yellow-300 overflow-x-auto"
             style={{ background: "#E6E6FA" }}>
          <Leaderboard leaderboard={leaderboard} selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
}

