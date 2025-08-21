const rankIcons = [
  <span key="1" className="text-3xl mr-2 animate-bounce">🥇</span>,
  <span key="2" className="text-3xl mr-2 animate-bounce">🥈</span>,
  <span key="3" className="text-3xl mr-2 animate-bounce">🥉</span>
];

const rowColors = [
  "bg-gradient-to-r from-yellow-300 via-pink-200 to-yellow-100",
  "bg-gradient-to-r from-purple-300 via-pink-100 to-purple-100",
  "bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-100"
];

export default function Leaderboard({ leaderboard, selectedUser }) {
  return (
    <div className="mb-2 animate-fade-in overflow-x-auto w-full">
      <h2 className="text-2xl font-extrabold mb-4 text-blue-600 text-center drop-shadow-lg">Leaderboard</h2>
      <table className="w-full min-w-[340px] rounded-xl overflow-hidden shadow-2xl">
        <thead>
          <tr className="bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 text-white text-lg">
            <th className="p-3">Rank</th>
            <th className="p-3">Name</th>
            <th className="p-3">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map((u, idx) => (
              <tr
                key={u._id}
                className={`row-funky transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  idx < 3 ? rowColors[idx] : "bg-white"
                } ${u._id === selectedUser ? "ring-2 ring-pink-400 font-bold" : ""}`}
                style={{ fontSize: idx < 3 ? "1.15em" : "1em" }}
              >
                <td className="p-3 font-bold flex items-center justify-center">
                  {idx < 3 ? rankIcons[idx] : idx + 1}
                </td>
                <td className="p-3">{u.name}</td>
                <td className="p-3 text-pink-600 font-semibold">{u.totalPoints}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

