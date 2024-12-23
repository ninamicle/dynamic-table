import { useState, useRef, useEffect } from "react";
import { TableData } from "../types/table";

export const useTableSelection = <T extends TableData>(data: T[]) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      if (selectedRows.size === 0) {
        selectAllRef.current.indeterminate = false;
        selectAllRef.current.checked = false;
      } else if (selectedRows.size === data.length) {
        selectAllRef.current.indeterminate = false;
        selectAllRef.current.checked = true;
      } else {
        selectAllRef.current.indeterminate = true;
      }
    }
  }, [data, selectedRows]);

  const toggleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((obj) => obj.id as number)));
    }
  };

  const toggleRowSelection = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  return {
    selectedRows,
    selectAllRef,
    toggleSelectAll,
    toggleRowSelection,
  };
};
