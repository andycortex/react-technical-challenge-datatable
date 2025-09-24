export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Editor';
  status: 'Active' | 'Inactive';
  creationDate: string;
}

export interface ColumnDef<T> {
  accessorKey: keyof T;
  header: string;
  cell?: (info: { getValue: () => any }) => React.ReactNode;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}