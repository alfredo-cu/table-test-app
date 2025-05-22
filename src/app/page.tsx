'use client';

import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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

  const data = useMemo(
    () => [
      { name: 'Ana', age: 28, country: 'México' },
      { name: 'Luis', age: 34, country: 'Chile' },
      { name: 'María', age: 22, country: 'Perú' },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, columnVisibility, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    </div>
  );
}
