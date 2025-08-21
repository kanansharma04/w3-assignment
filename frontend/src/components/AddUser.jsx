import { useState } from "react";

export default function AddUser({ onAddUser }) {
  const [name, setName] = useState("");
  return (
    <>
      <input
        className="border p-2 rounded w-full md:w-auto"
        type="text"
        placeholder="Add new user"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => {
          onAddUser(name);
          setName("");
        }}
      >
        Add User
      </button>
    </>
  );
}
