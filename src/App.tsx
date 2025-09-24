import './index.css';
import { users } from './data/users';
import { DataTable } from './components/DataTable';
import type { ColumnDef } from './components/DataTable';
import type { User } from './data/users';

function App() {
  const columns: ColumnDef<User>[] = [
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
    },
    {
      accessorKey: 'creationDate',
      header: 'Fecha de Creación',
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Tabla de Usuarios</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
}

export default App;