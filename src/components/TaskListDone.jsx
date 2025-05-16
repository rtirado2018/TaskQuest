import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import './ListStyle.css';

const TaskDone = ({ tasks, onToggle, onDelete }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleExpansion = () => {
    if (isMobile) setIsExpanded(!isExpanded);
  };

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="list">
      <h3 onClick={toggleExpansion}>
        Tareas realizadas: {isMobile ? (isExpanded ? '↓' : '↑') : null}
      </h3>
      {(!isMobile || isExpanded) && (
        <ul className="listaTareas done">
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              editable={false}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskDone;
