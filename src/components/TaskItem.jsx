import React, { useState } from 'react';
import "./ItemStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faCircleCheck, faThumbtack, faStopwatch } from '@fortawesome/free-solid-svg-icons';

function formatRealizationTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const TaskItem = ({ task, onToggle, onDelete, onEdit, editable = true }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <li className="item">
    <div className="taskControls">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="taskCheckbox"
      />
  
      <span className="taskText" style={{
        textDecoration: task.completed ? 'line-through' : 'none',
        textDecorationThickness: task.completed ? '3px' : 'none',
        color: task.completed ? '#888' : 'inherit'
      }}>
        {task.text}
      </span>
  
      {editable && (
        <button
          className="editButton"
          onClick={() => onEdit(task.id, task.text)}
          title="Editar tarea"
        >
          <span className="pencilIcon"><FontAwesomeIcon icon={faPencil} /></span>
        </button>
      )}
  
      <button
        className={`dltButton ${isDeleting ? 'deleting' : ''}`}
        onMouseDown={() => {
          setIsDeleting(true);
          task._deleteTimeout = setTimeout(() => {
            onDelete(task.id);
            setIsDeleting(false);
          }, 800);
        }}
        onMouseUp={() => {
          clearTimeout(task._deleteTimeout);
          setIsDeleting(false);
        }}
        onMouseLeave={() => {
          clearTimeout(task._deleteTimeout);
          setIsDeleting(false);
        }}
        onTouchStart={() => {
          setIsDeleting(true);
          task._deleteTimeout = setTimeout(() => {
            onDelete(task.id);
            setIsDeleting(false);
          }, 800);
        }}
        onTouchEnd={() => {
          clearTimeout(task._deleteTimeout);
          setIsDeleting(false);
        }}
        title="Mantén para borrar"
      >
        <span className="trashIcon"><FontAwesomeIcon icon={faTrash} /></span>
        <div className="deleteBar"></div>
      </button>
    </div>
  
    {task.createdAt && (
      <p className="taskDate">
        <span className="createdIcon"><FontAwesomeIcon icon={faThumbtack} /></span>
        Creada: {new Date(task.createdAt).toLocaleString()}
      </p>
    )}
  
    {task.completed && task.completedAt && (
      <p className="taskDate">
        <span className="checkIcon"><FontAwesomeIcon icon={faCircleCheck} /></span>
        Realizada: {new Date(task.completedAt).toLocaleString()}
      </p>
    )}
  
    {task.completed && task.realizationTime && (
      <p className="taskDate">
        <span className="timingIcon"><FontAwesomeIcon icon={faStopwatch} /></span>
        Tiempo de realización: {formatRealizationTime(task.realizationTime)}
      </p>
    )}
  </li>
  
  );
};

export default TaskItem;
