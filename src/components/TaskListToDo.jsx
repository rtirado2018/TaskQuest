import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';

const TaskToDo = ({ tasks, onToggle, onDelete, openEditModal }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

//Comprobando si es movil o no
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  //Si es mobil establece el expansible en la lista
  const toggleExpansion = () => {
    if (isMobile) setIsExpanded(!isExpanded);
  };

  //renderizado:

  return (
    <Droppable droppableId="todo-tasks">
      {(provided) => (
        <div className="list" {...provided.droppableProps} ref={provided.innerRef}>
          <h3 onClick={toggleExpansion}>
            Tareas pendientes: {isMobile ? (isExpanded ? '↓' : '↑') : null}
          </h3>
          {(!isMobile || isExpanded) && (
            <ul className="listaTareas toDo">
              {tasks.map((task, index) => (
                <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <TaskItem
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={openEditModal}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default TaskToDo;
