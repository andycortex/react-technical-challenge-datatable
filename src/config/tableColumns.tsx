import type { ColumnDef, User } from '../interfaces';
import React from 'react';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Correo Electrónico',
  },
  {
    accessorKey: 'role',
    header: 'Rol',
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: (info) => {
      const status = info.getValue();
      const color = status === 'Active' ? 'bg-green-500' : 'bg-red-500';
      return <span className={`px-2 py-1 text-white rounded ${color}`}>{status}</span>;
    }
  },
  {
    accessorKey: 'creationDate',
    header: 'Fecha de Creación',
  },
];
