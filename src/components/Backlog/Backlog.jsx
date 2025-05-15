import { useQuery } from '@tanstack/react-query'
import fetchTodos from '../../queries/data' // voorbeeld

export default function Backlog() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Fout bij laden: {error.message}</p>

return (
    <ul>
        {data.data
            .filter((todo) => todo.condition.Title === "Backlog")
            .map((todo) => (
                <li>{todo.title}</li>
            ))
            
            }
    </ul>
)
}
