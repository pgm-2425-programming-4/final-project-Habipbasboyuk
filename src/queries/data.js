export default async function fetchTodos() {
  const res = await fetch(
    `http://localhost:1337/api/todos?populate=*`
  )
  if (!res.ok) {
    throw new Error('Failed to fetch todos')
  }
  const data = await res.json()
  return data
}

export async function backlog() {
 const page = 1;
const pageSize = 5;

const params = {
  populate: 'condition',
  'pagination[page]': page,
  'pagination[pageSize]': pageSize,
  'filters[condition][Title][$eq]': 'Backlog'
};


const queryString = new URLSearchParams(params).toString();

const res = await fetch(`http://localhost:1337/api/todos?${queryString}`);

if (!res.ok) {
  throw new Error('Failed to fetch todos');
}

const data = await res.json();
return data;
}



export async function postTodo(data) {
  try {
    const response = await fetch("http://localhost:1337/api/todos?populate=*", {
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

