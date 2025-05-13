export async function fetchTodos() {
      return fetch("http://localhost:1337/api/todos?populate=*")
      .then(res => res.json())
      
      .catch(err => console.error("Fout bij ophalen:", err));
}