import React from 'react';
import type { ColumnDef } from '../interfaces';
import { usePagination } from '../hooks/usePagination';
import { useSorting } from '../hooks/useSorting';

// Props del componente DataTable
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number; // Make pageSize optional and provide a default
}

export function DataTable<T extends object>({ data, columns, pageSize = 10 }: DataTableProps<T>) {
  const { sortedData, sortBy, sortDirection, requestSort } = useSorting({ data });
  const { paginatedData, currentPage, totalPages, goToNextPage, goToPreviousPage } = usePagination({
    data: sortedData, // Use sortedData for pagination
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
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}