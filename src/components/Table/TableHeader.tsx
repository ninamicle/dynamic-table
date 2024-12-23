import { Filter, X } from "lucide-react";
import { Column, Filters, TableData } from "../../types/table";

interface TableHeaderProps<T extends TableData> {
  columns: Column[];
  isSelectable: boolean;
  selectedRows: Set<number>;
  data: T[];
  onSelectAll: () => void;
  showFilter: string | null;
  setShowFilter: (key: string | null) => void;
  setFilter?: (value: Filters) => void;
  selectAllRef: React.RefObject<HTMLInputElement>;
}

export const TableHeader = <T extends TableData>({
  columns,
  isSelectable,
  selectedRows,
  data,
  onSelectAll,
  showFilter,
  setShowFilter,
  setFilter,
  selectAllRef,
}: TableHeaderProps<T>) => (
  <thead className="bg-gray-200 text-slate-800 sticky top-0 z-10">
    <tr className="rounded-md">
      {isSelectable && (
        <th className="w-1/12 p-2 border">
          <span className="flex justify-between items-center p-2">
            <input
              type="checkbox"
              ref={selectAllRef}
              checked={selectedRows.size === data.length}
              onChange={onSelectAll}
            />
          </span>
        </th>
      )}
      {columns.map((column) => (
        <th
          className={`${column.width ? column.width : ""} p-2 border`}
          key={column.key}
        >
          <span className="flex justify-between items-center p-2 relative">
            {column.label}
            {column.hasFilter && (
              <Filter
                size={16}
                className="cursor-pointer"
                onClick={() => setShowFilter(column.key)}
              />
            )}
            {showFilter === column.key && (
              <span className="absolute top-8 right-0 p-2 border rounded-md bg-gray-200 border-slate-800 shadow-lg">
                <span className="flex justify-between gap-1 items-center">
                  <input
                    onChange={(e) =>
                      setFilter?.({ [column.key]: e.target.value })
                    }
                    type="text"
                    className="bg-gray-200 active:bg-gray-200 focus:outline-none"
                  />
                  <X
                    size={16}
                    className="cursor-pointer"
                    onClick={() => {
                      setShowFilter(null);
                      setFilter?.({});
                    }}
                  />
                </span>
              </span>
            )}
          </span>
        </th>
      ))}
    </tr>
  </thead>
);
