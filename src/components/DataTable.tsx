import React from 'react';
import type { ColumnDef } from '../interfaces';
import { usePagination } from '../hooks/usePagination';
import { useSorting } from '../hooks/useSorting';
import { PaginationControls } from './PaginationControls';


interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
}

export function DataTable<T extends object>({ data, columns, pageSize = 10 }: DataTableProps<T>) {
  const { sortedData, sortBy, sortDirection, requestSort } = useSorting({ data });
  const { paginatedData, currentPage, totalPages, goToNextPage, goToPreviousPage } = usePagination({
    data: sortedData, 
    pageSize,
  });

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessorKey as string}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort(column.accessorKey)}
              >
                <div className="flex items-center">
                  {column.header}
                  {sortBy === column.accessorKey && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '⬆️' : sortDirection === 'desc' ? '⬇️' : ''}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.accessorKey as string} className="px-6 py-4 whitespace-nowrap">
                  {column.cell
                    ? column.cell({ getValue: () => row[column.accessorKey] })
                    : (row[column.accessorKey] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      />
    </div>
  );
}