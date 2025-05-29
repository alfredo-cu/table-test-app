/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TableExportActions = ({ table }: { table: any; }) => {
  // Get visible columns
  const getVisibleColumns = table.getVisibleLeafColumns();

  // Get filtered and sorted rows
  //* si esto esta activado, solo va tomar los datos de la pagina actual
  // const getFilteredAndSortedRows = table.getRowModel().rows;

  //! si esto esta desactivado, se toman todos los datos de la tabla, sin importar la pagina actual
  const getFilteredAndSortedRows = table.getPrePaginationRowModel().rows;
  
  const getDataMatrix = () => {
    const columns = getVisibleColumns;
    const rows = getFilteredAndSortedRows; // Filas ya ordenadas

    const headers = columns.map((col: { columnDef: { header: string; }; }) => col.columnDef.header as string);
    const data = rows.map((row: { original: unknown; }) =>
      columns.map((col: { accessorFn: (arg0: unknown) => unknown; }) => col.accessorFn?.(row.original) ?? '')
    );

    return { headers, data };
  };

  const handleCopy = () => {
    const { headers, data } = getDataMatrix();
    const content = [headers, ...data]
      .map(row => row.join('\t'))
      .join('\n');
    navigator.clipboard.writeText(content);
    alert('Datos copiados al portapapeles ✅');
  };

  const handlePrint = () => {
    const { headers, data } = getDataMatrix();
    const htmlTable = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead><tr>${headers.map((h: any) => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${data.map((row: any[]) =>
          `<tr>${row.map((cell: any) => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;
    const win = window.open('', '', 'width=800,height=600');
    win?.document.write(`<html><head><title>Print</title></head><body>${htmlTable}</body></html>`);
    win?.document.close();
    win?.print();
  };

  const handleExportCSV = () => {
    const { headers, data } = getDataMatrix();
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'table.csv', { bookType: 'csv' });
  };

  const handleExportExcel = () => {
    const { headers, data } = getDataMatrix();
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'table.xlsx');
  };

  const handleExportPDF = () => {
    const { headers, data } = getDataMatrix();
    const doc = new jsPDF();
    autoTable(doc, {
      head: [headers],
      body: data,
      styles: { fontSize: 8 },
    });
    doc.save('table.pdf');
  };

  return (
    <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
      <button onClick={handleCopy}>📋 Copiar</button>
      <button onClick={handlePrint}>🖨️ Imprimir</button>
      <button onClick={handleExportCSV}>📁 CSV</button>
      <button onClick={handleExportExcel}>📊 Excel</button>
      <button onClick={handleExportPDF}>📄 PDF</button>
    </div>
  );
};

export default TableExportActions;
