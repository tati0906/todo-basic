# Todo App Básica

Este proyecto es una aplicación de gestión de tareas (Todos) construida con React y un backend simulado usando [json-server](https://github.com/typicode/json-server).

## Funcionalidades Implementadas

- **Agregar Todos:** Puedes crear nuevas tareas desde el formulario principal.
- **Listar Todos:** Se muestran todas las tareas almacenadas en el backend.
- **Filtrar Todos:** Puedes filtrar la lista por:
  - Todos
  - Completados
  - Pendientes
- **Completar/Desmarcar Todos:** Marca una tarea como completada o vuelve a marcarla como pendiente.
- **Editar Todos:** Puedes editar el título de una tarea existente.
- **Eliminar Todos:** Elimina tareas de la lista.
- **Persistencia:** Todas las tareas se guardan y consultan desde un backend simulado con json-server.

## Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

### `npm start`

Ejecuta la app en modo desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

### `npm run server`

Inicia el backend simulado con json-server en [http://localhost:3001](http://localhost:3001).\
Asegúrate de tener libre el puerto 3001.

### `npm test`

Lanza el test runner en modo interactivo.

### `npm run build`

Construye la app para producción en la carpeta `build`.

## Requisitos

- Node.js y npm instalados.
- json-server instalado como dependencia de desarrollo.

## Notas

- Si el puerto 3001 está ocupado, debes cerrarlo o cambiar el puerto en el comando y en el código fuente.
- El backend simulado usa el archivo `db.json` en la raíz del proyecto.

## Aprende más

- [Documentación de Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [Documentación de React](https://reactjs.org/)