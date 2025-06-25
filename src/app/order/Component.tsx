'use client';
import React, { useState } from 'react';
import {
  Table,
  TableThead,
  TableTbody,
  TableTr,
  TableTh,
  TableTd,
} from '@mantine/core';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  Table as ReactTableInstance,
} from '@tanstack/react-table';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Person = { id: number; firstName: string; lastName: string; age: number };

const data: Person[] = [
  { id: 1, firstName: 'Juan', lastName: 'Pérez', age: 30 },
  { id: 2, firstName: 'Ana', lastName: 'López', age: 25 },
  { id: 3, firstName: 'Carlos', lastName: 'Gómez', age: 40 },
];

const columnsDef: ColumnDef<Person>[] = [
  { id: 'firstName', accessorKey: 'firstName', header: 'Nombre', cell: info => info.getValue() },
  { id: 'lastName', accessorKey: 'lastName', header: 'Apellido', cell: info => info.getValue() },
  { id: 'age', accessorKey: 'age', header: 'Edad', cell: info => info.getValue() },
];

export default function MantineTableWithAllParts({ activeOrderColumns = true }: { activeOrderColumns?: boolean }) {
  const [columnOrder, setColumnOrder] = useState(columnsDef.map(c => c.id!));
  const sensors = useSensors(useSensor(PointerSensor));

  const table = useReactTable({
    data,
    columns: columnsDef,
    state: { columnOrder },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });

  const headers = table.getAllLeafColumns();

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <TableThead>
        {activeOrderColumns ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
              if (active.id !== over?.id) {
                setColumnOrder(prev =>
                  arrayMove(prev, prev.indexOf(active.id as string), prev.indexOf(over!.id as string))
                );
              }
            }}
          >
            <SortableContext items={headers.map(h => h.id)} strategy={horizontalListSortingStrategy}>
              <TableTr>
                {headers.map(col => (
                  <DraggableHeader key={col.id} column={col} table={table} />
                ))}
              </TableTr>
            </SortableContext>
          </DndContext>
        ) : (
          <TableTr>
            {headers.map(col => (
              <TableTh key={col.id}>
                {flexRender(col.columnDef.header, { column: col, table })}
              </TableTh>
            ))}
          </TableTr>
        )}
      </TableThead>
      <TableTbody>
        {table.getRowModel().rows.map(row => (
          <TableTr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableTd key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableTd>
            ))}
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}

function DraggableHeader({ column, table }: { column: any; table: ReactTableInstance<any> }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: column.id });

  return (
    <TableTh
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
      }}
      {...attributes}
      {...listeners}
    >
      {flexRender(column.columnDef.header, { column, table })}
    </TableTh>
  );
}
