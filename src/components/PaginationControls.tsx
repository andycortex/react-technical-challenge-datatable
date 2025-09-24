import type { PaginationControlsProps } from '../interfaces';

export function PaginationControls({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
}: PaginationControlsProps) {
  return (
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
  );
}