export async function createRoom(name: string) {
  const res = await fetch("http://127.0.0.1:8000/rooms/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Failed to create room");
  return res.json();
}