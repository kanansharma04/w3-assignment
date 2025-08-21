import { useEffect, useState } from "react";
import UserSelector from "../components/UserSelector";
import ClaimHistory from "../components/ClaimHistory";
import { getUsers, getHistory } from "../common/api"; // <-- Import API functions

export default function HistoryPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
        if (data.length && !selectedUser) setSelectedUser(data[0]._id);
      } catch {
        setUsers([]);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchHistory() {
      if (selectedUser) {
        try {
          const data = await getHistory(selectedUser);
          setHistory(data);
        } catch {
          setHistory([]);
        }
      }
    }
    fetchHistory();
  }, [selectedUser]);

  return (
    <div className="flex justify-center px-1 py-2 w-full">
      <div className="card-3d w-full max-w-lg p-3 sm:p-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">User Claim History</h1>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6">
          <UserSelector users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>
        <ClaimHistory history={history} />
      </div>
    </div>
  );
}
