import { API_URL } from "../constants/constants";

export async function fetchTodos() {
  return fetch(`${API_URL}/todos?populate=*`)
    .then(res => res.json())
    .catch(err => console.error("Fout bij ophalen:", err));
}

export async function fetchProjects() {
  return fetch(`${API_URL}/projects?populate=*`)
    .then(res => res.json())
    .catch(err => console.error("Fout bij ophalen:", err));
}



export async function fetchBacklog({ page = 1, pageSize = 5, condition = "Backlog" } = {}) {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'populate': '*',
  };

if (condition) {
  params['filters[condition][title][$eq]'] = condition;
}

  const query = new URLSearchParams(params);

  const url = `${API_URL}/todos?${query}`;

  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error("Fout bij ophalen todos:", err);
    return null;
  }
}


export async function postTodo(data) {
  try {
    const response = await fetch(`${API_URL}/todos?populate=*`, {
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