import { useEffect, useState } from "react";
import UserSelector from "../components/UserSelector";
import ClaimHistory from "../components/ClaimHistory";

export default function HistoryPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        if (data.length && !selectedUser) setSelectedUser(data[0]._id);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetch(`/history/${selectedUser}`)
        .then(res => res.json())
        .then(setHistory);
    }
  }, [selectedUser]);

  return (
    <div className="flex justify-center">
      <div className="card-3d w-full max-w-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">User Claim History</h1>
        <div className="flex items-center gap-4 mb-6">
          <UserSelector users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>
        <ClaimHistory history={history} />
      </div>
    </div>
  );
}
