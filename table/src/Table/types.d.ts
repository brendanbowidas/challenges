export interface TableProps {
  columns: TableColumn[];
  rows: any[];
}

export interface TableColumn {
  label: string;
  selector: string;
  renderer?: (rowData: T) => T | React.ReactNode;
  sortable?: boolean;
  sort?: (rows: T[], columnSelector: string, sortDirection: SortDirection) => T[];
}

export type SortDirection = "asc" | "desc";
