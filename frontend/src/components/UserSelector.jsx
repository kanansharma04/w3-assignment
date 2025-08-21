export default function UserSelector({ users, selectedUser, setSelectedUser }) {
  return (
    <select
      className="border p-2 rounded w-full"
      value={selectedUser}
      onChange={e => setSelectedUser(e.target.value)}
    >
      {users.map(u => (
        <option key={u._id} value={u._id}>{u.name}</option>
      ))}
    </select>
  );
}
