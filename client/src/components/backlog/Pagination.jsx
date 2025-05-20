import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        disabled={i === currentPage}
        style={{
          margin: '0 4px',
          fontWeight: i === currentPage ? 'bold' : 'normal',
        }}
      >
        {i}
      </button>
    );
  }

  return <div>{pages}</div>;
}

export default Pagination;