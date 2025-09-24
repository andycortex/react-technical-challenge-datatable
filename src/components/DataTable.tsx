import React from 'react';
import type { DataTableProps } from '../interfaces';
import { usePagination } from '../hooks/usePagination';
import { useSorting } from '../hooks/useSorting';
import { PaginationControls } from './PaginationControls';

export function DataTable<T extends object>({ data, columns, pageSize = 10, loading }: DataTableProps<T>) {
  const { sortedData, sortBy, sortDirection, requestSort } = useSorting({ data });
  const { paginatedData, currentPage, totalPages, goToNextPage, goToPreviousPage } = usePagination({
    data: sortedData, 
    pageSize,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 bg-white shadow-md rounded-lg">
        <p className="text-gray-500 text-lg">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div>
      {paginatedData.length === 0 ? (
        <div className="flex items-center justify-center h-48 bg-white shadow-md rounded-lg">
          <p className="text-gray-500 text-lg">No hay datos para mostrar.</p>
        </div>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200" role="table">
            <thead className="bg-gray-50" role="rowgroup">
              <tr role="row">
                {columns.map((column) => (
                  <th
                    key={column.accessorKey as string}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort(column.accessorKey)}
                    scope="col"
                    aria-sort={
                      sortBy === column.accessorKey
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                    role="columnheader"
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
            <tbody className="bg-white divide-y divide-gray-200" role="rowgroup">
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} role="row">
                  {columns.map((column) => (
                    <td key={column.accessorKey as string} className="px-6 py-4 whitespace-nowrap" role="cell">
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
        </>
      )}
    </div>
  );
}