export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Editor';
  status: 'Active' | 'Inactive';
  creationDate: string;
}

export interface ColumnDef<T, K extends keyof T = keyof T> {
  accessorKey: K;
  header: string;
  cell?: (info: { getValue: () => T[K] }) => React.ReactNode;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}
