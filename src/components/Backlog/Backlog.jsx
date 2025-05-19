import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function Backlog() {
  const [page, setPage] = useState(1)
  const pageSize = 5


  const fetchBacklogTodos = async ({ queryKey }) => {
    const [key, page] = queryKey;
    const queryParams = new URLSearchParams({
      'populate': 'condition',
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'filters[condition][Title][$eq]': 'Backlog'
    }).toString()

    const response = await fetch(`http://localhost:1337/api/todos?${queryParams}`)
    
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    
    return response.json()
  }

  const { data, isLoading, error} = useQuery({
    queryKey: ['backlogTodos', page],
    queryFn: fetchBacklogTodos,
    keepPreviousData: true,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading data: {error.message}</p>

  const totalItems = data?.meta?.pagination?.total;
  const totalPages = data?.meta?.pagination?.pageCount;
  return (
    <div className='backlog'>
      <h2>Backlog ({totalItems} items)</h2>
      
      <ul>
        {data?.data?.map((todo) => (
          <li key={todo.id}>
            {todo.Task}
            {todo.condition?.data?.Title && (
              <span> ({todo.condition.data.Title})</span>
            )}
          </li>
        ))}
      </ul>

      <div className='backlog__pagination'>
        <button 
          className='btn' 
          onClick={() => setPage((p) => Math.max(p - 1, 1))} 
          disabled={page === 1}
        >
          Previous
        </button>

        <span>{page}</span>

        <button 
          className='btn'
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}