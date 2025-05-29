'use client';

import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import TableExportActions from './TableActions';

const columnHelper = createColumnHelper<{ name: string; age: number; country: string }>();

const columns = [
  columnHelper.accessor('name', { header: 'Nombre' }),
  columnHelper.accessor('age', { header: 'Edad' }),
  columnHelper.accessor('country', { header: 'País' }),
];

export default function Home() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    age: true,
    country: true,
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })


  const data = useMemo(
    () => [
      { name: 'Ana', age: 28, country: 'México' },
      { name: 'Luis', age: 34, country: 'Chile' },
      { name: 'María', age: 22, country: 'Perú' },
      { name: 'Juan', age: 26, country: 'Colombia' },
      { name: 'Carlos', age: 32, country: 'España' },
      { name: 'Daniel', age: 45, country: 'México' },
      { name: 'Fernando', age: 28, country: 'Chile' },
      { name: 'Isabel', age: 22, country: 'Perú' },
      { name: 'Miguel', age: 26, country: 'Colombia' },
      { name: 'David', age: 32, country: 'España' },      
      { name: 'Ana', age: 28, country: 'México' },
      { name: 'Luis', age: 34, country: 'Chile' },
      { name: 'María', age: 22, country: 'Perú' },
      { name: 'Juan', age: 26, country: 'Colombia' },
      { name: 'Carlos', age: 32, country: 'España' },
      { name: 'Daniel', age: 45, country: 'México' },
      { name: 'Fernando', age: 28, country: 'Chile' },
      { name: 'Isabel', age: 22, country: 'Perú' },
      { name: 'Miguel', age: 26, country: 'Colombia' },   
      { name: 'Ana', age: 28, country: 'México' },
      { name: 'Luis', age: 34, country: 'Chile' },
      { name: 'María', age: 22, country: 'Perú' },
      { name: 'Juan', age: 26, country: 'Colombia' },
      { name: 'Carlos', age: 32, country: 'España' },
      { name: 'Daniel', age: 45, country: 'México' },
      { name: 'Fernando', age: 28, country: 'Chile' },
      { name: 'Isabel', age: 22, country: 'Perú' },   
      { name: 'Miguel', age: 26, country: 'Colombia' },     
      { name: 'Ana', age: 28, country: 'México' },
      { name: 'Luis', age: 34, country: 'Chile' },
      { name: 'María', age: 22, country: 'Perú' },
      { name: 'Juan', age: 26, country: 'Colombia' },
      { name: 'Carlos', age: 32, country: 'España' },
      { name: 'Daniel', age: 45, country: 'México' },
      { name: 'Fernando', age: 28, country: 'Chile' },
      { name: 'Isabel', age: 22, country: 'Perú' },
      { name: 'Miguel', age: 26, country: 'Colombia' },
      { name: 'David', age: 32, country: 'España' },
      { name: 'Ana', age: 28, country: 'México' },
      { name: 'Luis', age: 34, country: 'Chile' },
      { name: 'María', age: 22, country: 'Perú' },
      { name: 'Juan', age: 26, country: 'Colombia' },
      { name: 'Carlos', age: 32, country: 'España' },
      { name: 'Daniel', age: 45, country: 'México' },
      { name: 'Fernando', age: 28, country: 'Chile' },
      { name: 'Isabel', age: 22, country: 'Perú' },
      { name: 'Miguel', age: 26, country: 'Colombia' },
      { name: 'David', age: 32, country: 'España' },
      { name: 'Ana', age: 28, country: 'México' },
      { name: 'Luis', age: 34, country: 'Chile' },
      { name: 'María', age: 22, country: 'Perú' },
      { name: 'Juan', age: 26, country: 'Colombia' },   
      { name: 'Carlos', age: 32, country: 'España' },     
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, columnVisibility, sorting, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tabla con Exportaciones</h1>

      <input
        type="text"
        placeholder="Buscar..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />

      <div>
        <h4>Seleccionar columnas visibles</h4>
        {table.getAllColumns().map((column) => (
          <label key={column.id} style={{ marginRight: '1rem' }}>
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={() =>
                setColumnVisibility((prev) => ({
                  ...prev,
                  [column.id]: !prev[column.id],
                }))
              }
            />
            {column.columnDef.header}
          </label>
        ))}
      </div>

      <TableExportActions table={table} />

      <table border={1} cellPadding={5} style={{ marginTop: '1rem' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted(); // "asc" | "desc" | false
                return (
                  <th
                    key={header.id}
                    onClick={(e) => {
                      const isMultiSort = e.shiftKey;
                      header.column.toggleSorting(undefined, isMultiSort);
                    }}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    {header.column.columnDef.header}
                    {sorted === 'asc' ? ' 🔼' : sorted === 'desc' ? ' 🔽' : ''}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.getValue()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
        {table.getRowCount().toLocaleString()} Rows
      </div>
    </div>
  );
}
