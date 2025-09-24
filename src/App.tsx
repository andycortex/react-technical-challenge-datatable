import './index.css';
import { users } from './data/users';
import { DataTable } from './components/DataTable';
import { userColumns } from './config/tableColumns.tsx';
import type { User } from './interfaces';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUserData(users);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Tabla de Usuarios</h1>
      <DataTable columns={userColumns} data={userData} loading={loading} />
    </div>
  );
}

export default App;