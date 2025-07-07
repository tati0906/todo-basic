import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar después de agregar

function AddTodo() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false); // Estado para la carga al agregar
  const navigate = useNavigate(); // Hook para la navegación programática

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    if (title.trim() === '') {
      setError("El título del Todo no puede estar vacío.");
      return;
    }

    setAdding(true);
    setError(null);

    const newTodo = {
      title: title.trim(),
      completed: false,
    };

    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTitle(''); // Limpiar el campo después de agregar
      navigate('/todos'); // Redireccionar a la lista de todos
    } catch (err) {
      setError("No se pudo agregar el Todo. Inténtalo de nuevo.");
      console.error("Error al agregar todo:", err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <h1>Agregar Nuevo Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu nuevo Todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={adding} // Deshabilitar el input mientras se agrega
        />
        <button type="submit" disabled={adding}>
          {adding ? 'Agregando...' : 'Agregar Todo'}
        </button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </form>
    </div>
  );
}

export default AddTodo;
