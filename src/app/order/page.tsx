import TableWithDraggableColumns from "./Component";

export default function Order() {
  return (
    <>
      <TableWithDraggableColumns activeOrderColumns={true} /> // 🟢 Con ordenamiento
      <TableWithDraggableColumns activeOrderColumns={false} /> // 🚫 Sin ordenamiento
    </>
  );
}