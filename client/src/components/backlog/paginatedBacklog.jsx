import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { fetchBacklog } from '../../queries/data';

function PaginatedBacklog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [backlog, setBacklog] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  useEffect(() => {
fetchBacklog({ page: currentPage, pageSize })
      .then(data => {
        setBacklog(data.data || []);
        setTotalPages(data.meta?.pagination?.pageCount || 1);
      });
  }, [currentPage]);

  return (
    <div>
      <ul>
        {backlog.map(item => (
          <li key={item.id}>{item.Task || 'No Task'}</li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default PaginatedBacklog;