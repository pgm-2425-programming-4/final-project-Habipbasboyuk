export async function fetchTodos() {
      return fetch("http://localhost:1337/api/todos?populate=*")
      .then(res => res.json())
      
      .catch(err => console.error("Fout bij ophalen:", err));
}

export async function postTodo(data) {
  try {
    const response = await fetch("http://localhost:1337/api/todos?poulate=*", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Post mislukt");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fout bij POST:", error);
    throw error;
  }
}

