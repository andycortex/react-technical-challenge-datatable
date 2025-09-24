import './index.css';
import { users } from './data/users';
import { DataTable } from './components/DataTable';
import { userColumns } from './config/tableColumns.tsx';

function App() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Tabla de Usuarios</h1>
      <DataTable columns={userColumns} data={users} />
    </div>
  );
}

export default App;
