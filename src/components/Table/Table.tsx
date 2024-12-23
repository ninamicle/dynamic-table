import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TableData, DynamicTableProps } from "../../types/table";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { useTableSelection } from "../../hooks/useTableSelection";

function DynamicTable<T extends TableData>({
  scrolableId,
  columns,
  data,
  loadMore,
  isLoading,
  hasMore,
  setFilter,
  isSelectable = false,
  customContent,
}: DynamicTableProps<T>): JSX.Element {
  const [showFilter, setShowFilter] = useState<string | null>(null);
  const { selectedRows, selectAllRef, toggleSelectAll, toggleRowSelection } =
    useTableSelection(data);

  return (
    <div className="h-[400px]  overflow-hidden m-5 border-2 rounded-md relative">
      <table className="table-auto w-full">
        <TableHeader
          columns={columns}
          isSelectable={isSelectable}
          selectedRows={selectedRows}
          data={data}
          onSelectAll={toggleSelectAll}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          setFilter={setFilter}
          selectAllRef={selectAllRef}
        />
      </table>
      <div id={scrolableId} className="h-[calc(100%-2rem)] overflow-auto">
        <InfiniteScroll
          dataLength={data?.length}
          next={loadMore}
          hasMore={hasMore}
          loader={isLoading && <h4>Loading...</h4>}
          scrollableTarget={scrolableId}
        >
          <table className="table-auto w-full">
            <tbody>
              {data.map((item) => (
                <TableRow
                  key={item.id as number}
                  item={item}
                  columns={columns}
                  isSelectable={isSelectable}
                  isSelected={selectedRows.has(item.id as number)}
                  onToggleSelect={toggleRowSelection}
                  customContent={customContent}
                />
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default DynamicTable;
