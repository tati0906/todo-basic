import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // Nuevo estado para el filtro: 'all', 'completed', 'pending'

  // Función para obtener los todos de la API
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/todos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError("No se pudieron cargar los Todos. Inténtalo de nuevo.");
      console.error("Error al cargar todos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar todos al montar el componente
  useEffect(() => {
    fetchTodos();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Función para cambiar el estado de un todo (completado/pendiente)
  const toggleTodoCompletion = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH', // Usamos PATCH para actualizar parcialmente el recurso
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Actualizamos el estado local para que se refleje el cambio inmediatamente
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      ));
    } catch (err) {
      setError("No se pudo actualizar el Todo.");
      console.error("Error al actualizar todo:", err);
    }
  };

  // Función para eliminar un todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Filtramos el todo eliminado del estado local
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError("No se pudo eliminar el Todo.");
      console.error("Error al eliminar todo:", err);
    }
  };

  // Lógica para filtrar los todos basados en el estado 'filter'
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    }
    if (filter === 'pending') {
      return !todo.completed;
    }
    return true; // Si filter es 'all', mostramos todos
  });

  if (loading) {
    return <p>Cargando Todos...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Mis Todos</h1>

      {/* Controles de filtro */}
      <div>
        <button
          onClick={() => setFilter('all')}
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal', marginRight: '5px' }}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal', marginRight: '5px' }}
        >
          Completados
        </button>
        <button
          onClick={() => setFilter('pending')}
          style={{ fontWeight: filter === 'pending' ? 'bold' : 'normal' }}
        >
          Pendientes
        </button>
      </div>
      <hr style={{ margin: '15px 0' }} />

      {filteredTodos.length === 0 ? (
        <p>No hay Todos que coincidan con el filtro actual.</p>
      ) : (
        <ul>
          {filteredTodos.map(todo => ( // Usamos filteredTodos aquí
            <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
              <button onClick={() => toggleTodoCompletion(todo.id, todo.completed)} style={{ marginLeft: '10px' }}>
                {todo.completed ? 'Desmarcar' : 'Completar'}
              </button>
              <Link to={`/edit/${todo.id}`} style={{ marginLeft: '10px', textDecoration: 'none' }}>
                <button>Editar</button>
              </Link>
              <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;