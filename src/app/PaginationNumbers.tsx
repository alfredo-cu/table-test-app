'use client';

import { Table } from '@tanstack/react-table';

type Props<T> = {
  table: Table<T>;
};

export default function PaginationNumbers<T>({ table }: Props<T>) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    const siblings = 1; // páginas antes/después de la actual
    const totalNumbers = siblings * 2 + 5; // 1ª + última + actual +/- siblings + 2 puntos suspensivos

    if (pageCount <= totalNumbers) {
      return [...Array(pageCount).keys()];
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, pageCount - 2);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < pageCount - 3;

    pages.push(0); // siempre mostrar la primera

    if (showLeftDots) pages.push('...');
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }
    if (showRightDots) pages.push('...');

    if (pageCount > 1) pages.push(pageCount - 1); // última página

    return pages;
  };

  const pagesToShow = getPageNumbers();

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
      {pagesToShow.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} style={{ padding: '0.5rem' }}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => table.setPageIndex(page)}
            disabled={page === currentPage}
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: page === currentPage ? '#007bff' : '#fff',
              color: page === currentPage ? '#fff' : '#000',
              cursor: page === currentPage ? 'default' : 'pointer',
            }}
          >
            {page + 1}
          </button>
        )
      )}
    </div>
  );
}
