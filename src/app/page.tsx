"use client";
import { useReactTable, createColumnHelper, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
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
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    age: true,
    country: true,
  });

  const data = useMemo(() => [
    { name: 'Ana', age: 28, country: 'México' },
    { name: 'Luis', age: 34, country: 'Chile' },
    { name: 'María', age: 22, country: 'Perú' },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, columnVisibility },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tabla con Exportaciones</h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />

      <div>
        <h4>Seleccionar columnas visibles</h4>
        {table.getAllColumns().map((column) => (
          <label key={column.id}>
            <input
              type="checkbox"
              checked={columnVisibility[column.id]}
              onChange={() => setColumnVisibility((prev) => ({
                ...prev,
                [column.id]: !prev[column.id]
              }))}
            />
            {column.columnDef.header}
          </label>
        ))}
      </div>

      <TableExportActions table={table} />

      <table border={1} cellPadding={5}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>{header.column.columnDef.header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{cell.getValue()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
