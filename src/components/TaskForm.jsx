import React, { useState } from 'react';
import "./FormStyle.css";


const TaskForm = ({ onAdd }) => {
  const [taskText, setTaskText] = useState(''); // Estado para el texto de la tarea

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {//e es abreviatura de evento
    e.preventDefault(); // Evita que se recargue la página
    if (taskText.trim() === '') return; // No añadir tarea vacía
    onAdd(taskText); // Llama a la función para añadir la tarea
    setTaskText(''); // Limpia el input después de añadir la tarea
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* El input para añadir tarea*/}
      <textarea className="textArea"
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)} // Actualiza el texto de la tarea
        placeholder="Escribe una tarea..."
      />
      <button className="addTask" type="submit">Añadir tarea</button>
    </form>
  );
};

export default TaskForm;
