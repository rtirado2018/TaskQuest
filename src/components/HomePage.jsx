import React from 'react';
import TaskToDo from './TaskListToDo'; // Importamos el componente correcto
import TaskDone from './TaskListDone';  // Aquí se asume que también está el componente de tareas completadas


const HomePage = ({ tasks, onToggle, onDelete, handleDragEnd, openEditModal }) => {
  return (
    <div className="listContainer">
    
        {/* Aquí pasas openEditModal correctamente */}
        <TaskToDo
          tasks={tasks.filter(task => !task.completed)}
          onToggle={onToggle}
          onDelete={onDelete}
          openEditModal={openEditModal} // Debe ser pasado aquí
        />
    

      <TaskDone
        tasks={tasks.filter(task => task.completed)}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </div>
  );
};

export default HomePage;
