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
    <div className="backlog">
      <ul className="backlog__list">
        {backlog.map(item => (
          <li className="backlog__item" key={item.id}>
            {item.Task || 'Er zijn geen taken'}
          </li>
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