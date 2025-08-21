// Set your backend API base URL here
export const API_BASE = "https://w3-assignment-backend.onrender.com";

export async function getUsers() {
  try {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    console.error("getUsers error:", err);
    throw err;
  }
}

export async function addUser(name) {
  try {
    const res = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add user");
    return data;
  } catch (err) {
    console.error("addUser error:", err);
    throw err;
  }
}

export async function claimPoints(userId) {
  try {
    const res = await fetch(`${API_BASE}/claim/${userId}`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to claim points");
    return data;
  } catch (err) {
    console.error("claimPoints error:", err);
    throw err;
  }
}

export async function getHistory(userId) {
  try {
    const res = await fetch(`${API_BASE}/history/${userId}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    console.error("getHistory error:", err);
    throw err;
  }
}
