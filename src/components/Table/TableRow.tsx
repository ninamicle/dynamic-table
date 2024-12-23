import { TableData, Column } from "../../types/table";

interface TableRowProps<T extends TableData> {
  item: T;
  columns: Column[];
  isSelectable: boolean;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  customContent?: Record<number, Record<string, JSX.Element>>;
}

export function TableRow<T extends TableData>({
  item,
  columns,
  isSelectable,
  isSelected,
  onToggleSelect,
  customContent,
}: TableRowProps<T>): JSX.Element {
  return (
    <tr className="border-t">
      {isSelectable && (
        <td className="w-1/12 p-2 border">
          <span className="flex justify-between items-center p-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(item.id as number)}
              className="w-6 h-6"
            />
          </span>
        </td>
      )}
      {columns.map((column) => (
        <td className={`${column.width} p-2 border`} key={column.key}>
          {customContent && customContent[item.id as number]?.[column.key]
            ? customContent[item.id as number][column.key]
            : (item[column.key] as React.ReactNode)}
        </td>
      ))}
    </tr>
  );
}
