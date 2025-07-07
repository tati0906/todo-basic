import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTodo() {
  // useParams nos permite acceder a los parámetros de la URL, en este caso, el 'id'
  const { id } = useParams();
  // useNavigate nos permite navegar programáticamente a otras rutas
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false); // Estado para indicar si se está guardando

  // useEffect para cargar el todo cuando el componente se monta o el ID cambia
  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/todos/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTitle(data.title);
        setCompleted(data.completed);
      } catch (err) {
        setError("No se pudo cargar el Todo para editar.");
        console.error("Error al cargar todo:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]); // Dependencia 'id' para recargar si el ID de la URL cambia

  // Función para manejar el envío del formulario de edición
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    if (title.trim() === '') {
      setError("El título del Todo no puede estar vacío.");
      return;
    }

    setSaving(true);
    setError(null);

    const updatedTodo = {
      title: title.trim(),
      completed: completed,
    };

    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PUT', // Usamos PUT para reemplazar completamente el recurso
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Si la actualización es exitosa, redirigir a la lista de todos
      navigate('/todos');
    } catch (err) {
      setError("No se pudo actualizar el Todo.");
      console.error("Error al actualizar todo:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Cargando datos del Todo...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Editar Todo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={saving} // Deshabilitar mientras se guarda
          />
        </div>
        <div>
          <label htmlFor="completed">Completado:</label>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            disabled={saving} // Deshabilitar mientras se guarda
          />
        </div>
        <button type="submit" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
        <button type="button" onClick={() => navigate('/todos')} disabled={saving} style={{ marginLeft: '10px' }}>
          Cancelar
        </button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </form>
    </div>
  );
}

export default EditTodo;