export default function ClaimHistory({ history }) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-2 text-indigo-600">Claim History</h2>
      <ul className="divide-y">
        {history.length === 0 && <li className="p-2 text-gray-500">No claims yet.</li>}
        {history.map(item => (
          <li key={item._id} className="p-2 flex justify-between items-center transition-all duration-300 hover:bg-blue-50 rounded">
            <span className="text-green-700 font-semibold">+{item.pointsClaimed} points</span>
            <span className="text-gray-500">{new Date(item.claimedAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
