export type ColumnType = "string" | "number" | "boolean" | "date";

export interface Column {
  key: string;
  label: string;
  type: ColumnType;
  width?: string;
  hasFilter?: boolean;
  isCustom?: boolean;
}

export interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

export interface Filters {
  [key: string]: string;
}

// Tipo generico per i dati della tabella
export interface TableData {
  [key: string]: unknown;
}

export interface DynamicTableProps<T extends TableData> {
  scrolableId: string;
  columns: Column[];
  data: T[];
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  totalRows?: number;
  setFilter?: (filter: Filters) => void;
  isSelectable?: boolean;
  customContent?: Record<number, Record<string, JSX.Element>>;
}
