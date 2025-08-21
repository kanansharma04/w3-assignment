import { useState } from "react";
import { addUser } from "../common/api";

export default function AddUserPage() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleAddUser = async () => {
    if (!name.trim()) {
      setStatus("Name is required.");
      return;
    }
    try {
      await addUser(name);
      setStatus("User added successfully!");
      setName("");
    } catch (err) {
      setStatus(err.message || "Error adding user.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md transition-transform hover:scale-105 duration-300">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">Add New User</h1>
        <input
          className="border p-2 rounded w-full mb-4"
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full font-bold"
          onClick={handleAddUser}
        >
          Add User
        </button>
        {status && <div className="mt-4 text-center text-pink-600 font-semibold">{status}</div>}
      </div>
    </div>
  );
}
