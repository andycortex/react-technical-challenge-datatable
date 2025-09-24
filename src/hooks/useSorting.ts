import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc' | null;

interface UseSortingProps<T> {
  data: T[];
}

interface UseSortingReturn<T> {
  sortedData: T[];
  sortBy: keyof T | null;
  sortDirection: SortDirection;
  requestSort: (key: keyof T) => void;
}

export function useSorting<T extends object>({ data }: UseSortingProps<T>): UseSortingReturn<T> {
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
      if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortBy, sortDirection]);

  const requestSort = (key: keyof T) => {
    if (sortBy === key) {
      setSortDirection((prevDirection) => {
        if (prevDirection === 'asc') return 'desc';
        if (prevDirection === 'desc') return null;
        return 'asc';
      });
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  return { sortedData, sortBy, sortDirection, requestSort };
}
