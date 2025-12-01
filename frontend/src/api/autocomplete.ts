export async function getAutocomplete(code: string, cursor: number, language: string = "python") {
  const res = await fetch("http://127.0.0.1:8000/autocomplete/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      cursorPosition: cursor,
      language,
    }),
  });

  if (!res.ok) throw new Error("Failed to fetch autocomplete");
  return res.json();
}