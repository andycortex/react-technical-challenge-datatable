# Prueba Técnica: Componente de Tabla de Datos en React

¡Hola! Gracias por tu interés en unirte a nuestro equipo.

Esta prueba está diseñada para evaluar tus habilidades en la construcción de componentes de UI robustos y reutilizables con React y TypeScript, simulando el tipo de desafíos que enfrentamos en nuestros proyectos.

**El objetivo es construir un componente de tabla genérico y reutilizable desde cero.**

## Requisitos Fundamentales

1.  **Tecnología:** El proyecto debe ser construido utilizando **Vite + React + TypeScript**.
2.  **Sin Librerías de UI Externas:** El núcleo del componente de la tabla (la estructura, la lógica de paginación) debe ser creado por ti. Puedes usar librerías para estilizar (como `clsx` o `classnames` si lo deseas) pero **no están permitidas librerías como `react-table`, `ag-grid` o `Material-UI` para la funcionalidad de la tabla.**
3.  **Estilizado:** Eres libre de usar la herramienta de estilizado que prefieras (CSS Modules, Styled Components, etc.). Sin embargo, demostrar habilidad con **TailwindCSS** será considerado un plus.

## La Tarea: Crear un Componente `<DataTable />`

Tu misión es crear un componente `<DataTable />` que sea capaz de renderizar una tabla de datos a partir de dos props principales: `data` y `columns`.

### 1. Datos de Muestra

Puedes usar los siguientes datos para tus pruebas. Siéntete libre de crear más si lo necesitas.

```typescript
// en un archivo /data/users.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Editor';
  status: 'Active' | 'Inactive';
  creationDate: string;
}

export const users: User[] = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', role: 'Admin', status: 'Active', creationDate: '2023-01-15' },
  { id: 2, name: 'Ana Gómez', email: 'ana.gomez@example.com', role: 'Editor', status: 'Active', creationDate: '2023-02-20' },
  { id: 3, name: 'Carlos Sánchez', email: 'carlos.sanchez@example.com', role: 'User', status: 'Inactive', creationDate: '2023-03-10' },
  { id: 4, name: 'María López', email: 'maria.lopez@example.com', role: 'User', status: 'Active', creationDate: '2023-04-05' },
  { id: 5, name: 'Pedro Ramírez', email: 'pedro.ramirez@example.com', role: 'Editor', status: 'Active', creationDate: '2023-05-12' },
  { id: 6, name: 'Sofía Martínez', email: 'sofia.martinez@example.com', role: 'Admin', status: 'Inactive', creationDate: '2023-06-18' },
  { id: 7, name: 'Luis Fernández', email: 'luis.fernandez@example.com', role: 'User', status: 'Active', creationDate: '2023-07-22' },
  { id: 8, name: 'Laura García', email: 'laura.garcia@example.com', role: 'Editor', status: 'Active', creationDate: '2023-08-30' },
  { id: 9, name: 'Diego Torres', email: 'diego.torres@example.com', role: 'User', status: 'Inactive', creationDate: '2023-09-10' },
  { id: 10, name: 'Carmen Ruiz', email: 'carmen.ruiz@example.com', role: 'Admin', status: 'Active', creationDate: '2023-10-15' },
  { id: 11, name: 'Javier Díaz', email: 'javier.diaz@example.com', role: 'User', status: 'Active', creationDate: '2023-11-20' },
  { id: 12, name: 'Elena Moreno', email: 'elena.moreno@example.com', role: 'Editor', status: 'Inactive', creationDate: '2023-12-25' },
  { id: 13, name: 'Miguel Ángel', email: 'miguel.angel@example.com', role: 'User', status: 'Active', creationDate: '2024-01-30' },
  { id: 14, name: 'Clara Ortiz', email: 'clara.ortiz@example.com', role: 'Admin', status: 'Active', creationDate: '2024-02-10' },
  { id: 15, name: 'Andrés Vargas', email: 'andres.vargas@example.com', role: 'User', status: 'Inactive', creationDate: '2024-03-15' },
  { id: 16, name: 'Paula Castro', email: 'paula.castro@example.com', role: 'Editor', status: 'Active', creationDate: '2024-04-20' },
  { id: 17, name: 'Raúl Mendoza', email: 'raul.mendoza@example.com', role: 'User', status: 'Active', creationDate: '2024-05-25' },
  { id: 18, name: 'Isabel Navarro', email: 'isabel.navarro@example.com', role: 'Admin', status: 'Inactive', creationDate: '2024-06-30' },
  { id: 19, name: 'Héctor Silva', email: 'hector.silva@example.com', role: 'User', status: 'Active', creationDate: '2024-07-05' },
  { id: 20, name: 'Natalia Rojas', email: 'natalia.rojas@example.com', role: 'Editor', status: 'Active', creationDate: '2024-08-10' },
];
```

### 2. Configuración de Columnas

El componente `<DataTable />` debe ser configurable a través de una prop `columns`. Esta prop será un array de objetos donde cada objeto define una columna.

```typescript
// Ejemplo de cómo se vería la configuración de columnas
export const columns: ColumnDef<User>[] = [
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
];
```
*   `accessorKey`: Corresponde a la clave del objeto en el array `data`.
*   `header`: El texto que se mostrará en la cabecera de la tabla.

### 3. Funcionalidad Requerida

Tu componente `<DataTable />` debe implementar:

*   **Renderizado Dinámico:** Debe renderizar las cabeceras y las filas de datos basándose en la configuración de `columns` y los `data` proporcionados.
*   **Paginación del Lado del Cliente:**
    *   La tabla debe mostrar un número fijo de filas por página (ej: 5 o 10, tú eliges).
    *   Debe haber controles para ir a la página "Siguiente" y "Anterior".
    *   Los controles deben deshabilitarse cuando sea apropiado (ej: "Anterior" en la primera página).
    *   Debe mostrar información sobre la página actual (ej: "Página 1 de 4").

### 4. (Bonus) Funcionalidad Adicional

Si tienes tiempo y quieres impresionar, considera implementar una o más de las siguientes características:

*   **Renderizado Personalizado de Celdas:** Modifica la definición de `columns` para permitir una función `cell` que personalice el renderizado. Por ejemplo, para renderizar el `status` como una "píldora" de color.
    ```typescript
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: (info) => {
        const status = info.getValue();
        const color = status === 'Active' ? 'bg-green-500' : 'bg-red-500';
        return <span className={`px-2 py-1 text-white rounded ${color}`}>{status}</span>;
      }
    }
    ```
*   **Ordenamiento (Sorting):** Permitir que el usuario haga clic en las cabeceras para ordenar los datos de esa columna de forma ascendente/descendente.

## ¿Qué Evaluaremos?

*   **Calidad del Código:** Limpieza, mantenibilidad y adhesión a las mejores prácticas de React.
*   **Correcto Uso de TypeScript:** Tipado fuerte y claro. Evita el uso de `any`.
*   **Reusabilidad del Componente:** Qué tan bien diseñado está el componente para ser utilizado en diferentes contextos con diferentes datos.
*   **Lógica y Estado:** Cómo manejas el estado del componente (paginación, ordenamiento, etc.). El uso de hooks (`useState`, `useMemo`, `useEffect`, hooks personalizados) será evaluado.
*   **Atención al Detalle:** Pequeños detalles en la UI/UX que hacen la experiencia más agradable.
*   **Profesionalismo:** Un `README.md` claro en tu repositorio con instrucciones para ejecutar el proyecto y un historial de commits limpio y descriptivo son muy valorados.

## Entregable

1.  Crea un **fork** de este repositorio o crea uno nuevo y público en tu cuenta de GitHub.
2.  Desarrolla la solución.
3.  Asegúrate de incluir un `README.md` en tu proyecto con las instrucciones para instalar las dependencias y ejecutarlo.
4.  Envíanos el enlace a tu repositorio.

¡Mucha suerte! Estamos ansiosos por ver tu trabajo.

## Cómo Ejecutar el Proyecto

Sigue estos pasos para poner en marcha el proyecto localmente:

### 1. Instalación de Dependencias

Abre tu terminal en la raíz del proyecto y ejecuta:

```bash
npm install
```

### 2. Ejecutar el Servidor de Desarrollo

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo con:

```bash
npm run dev
```

Esto abrirá la aplicación en tu navegador por defecto (normalmente en `http://localhost:5173`).

### 3. Configuración de Tailwind CSS

El proyecto utiliza Tailwind CSS para el estilizado. La configuración ya está incluida y no requiere pasos adicionales para su funcionamiento.