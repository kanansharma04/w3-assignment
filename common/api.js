const API_BASE = "/"; // Vite proxy handles /users, /claim, /history

export async function getUsers() {
  try {
    const res = await fetch(`${API_BASE}users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  } catch (err) {
    console.error("getUsers error:", err);
    throw err;
  }
}

export async function addUser(name) {
  try {
    const res = await fetch(`${API_BASE}users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Failed to add user");
    }
    return await res.json();
  } catch (err) {
    console.error("addUser error:", err);
    throw err;
  }
}

export async function claimPoints(userId) {
  try {
    const res = await fetch(`${API_BASE}claim/${userId}`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to claim points");
    return await res.json();
  } catch (err) {
    console.error("claimPoints error:", err);
    throw err;
  }
}

export async function getHistory(userId) {
  try {
    const res = await fetch(`${API_BASE}history/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch history");
    return await res.json();
  } catch (err) {
    console.error("getHistory error:", err);
    throw err;
  }
}
