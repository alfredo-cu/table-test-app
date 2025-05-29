'use client';

import { Pagination } from '@mantine/core';
import { Table } from '@tanstack/react-table';

type Props<T> = {
  table: Table<T>;
};

export default function PaginationMantine<T>({ table }: Props<T>) {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const handleChange = (page: number) => {
    table.setPageIndex(page - 1);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={handleChange}
        siblings={1}
        boundaries={1}
        withEdges
        size="sm"
        radius="md"
      />
    </div>
  );
}
