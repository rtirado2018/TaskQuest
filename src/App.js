import React, { useState, useEffect } from 'react';
import {Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faFileLines } from '@fortawesome/free-solid-svg-icons';

import TaskForm from './components/TaskForm';
import EditTaskModal from './components/EditTaskModal';
import NotesPage from './components/NotesPage';
import HomePage from './components/HomePage';

import logoFull from './img/logoFull.png';
import './App.css';
//-----------------------------------------------------------------------------------------------------------
//Botones Notas y Agregar
const AccessButtons = ({ setShowModal }) => {
  const location = useLocation();
  if (location.pathname !== "/") return null;

  return (
    <div className="button-container">

      <Link to="/notas">
        <button className="openModalButton">
          <span className="plusIcon"><FontAwesomeIcon icon={faFileLines} /></span> Notas
        </button>
      </Link>
      <button className="openModalButton" onClick={() => setShowModal(true)}>
        <span className="noteIcon"><FontAwesomeIcon icon={faPlus} /></span> Añadir Tarea
      </button>
    </div>
  );
};

//La App

const App = () => {
  //Cargar tareas con localStorage
  const loadTasksFromLocalStorage = () => {
    try {
      const tasksFromStorage = localStorage.getItem('tasks');
      return tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
    } catch (error) {
      console.error('Error al cargar las tareas desde localStorage:', error);
      return []; // En caso de error, devolver un array vacío
    }
  };
  


  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  //Añadir tarea
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      realizationTime: null,
    };
    
    // Usamos la versión de función de setTasks para garantizar que trabajemos con el estado más reciente
    setTasks((prevTasks) => [newTask, ...prevTasks]);

    setShowModal(false);
  };
  /* Editar tarea */
  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
    setShowEditModal(false);
  };

  /* Abrir Modal de Editar tarea */
  const openEditModal = (id, currentText) => {
    setEditTaskId(id);
    setEditTaskText(currentText);
    setShowEditModal(true);
  };

  
//Toggle

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id) {
          const completed = !task.completed;
          const now = new Date().toISOString();
          return {
            ...task,
            completed,
            completedAt: completed ? now : null,
            realizationTime: completed
              ? new Date(now) - new Date(task.createdAt)
              : null,
          };
        }
        return task;
      })
    );
  };


//Eliminar tarea

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Agregamos la definición de handleDragEnd
  const handleDragEnd = (result) => {
    const { source, destination } = result;
  
    if (!destination) return;
    if (source.index === destination.index) return;
  
    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
  
    // Mover sólo dentro de tareas incompletas
    const newActiveTasks = Array.from(activeTasks);
    const [movedTask] = newActiveTasks.splice(source.index, 1);
    newActiveTasks.splice(destination.index, 0, movedTask);
  
    // Ahora juntamos las listas: tareas incompletas primero, luego completadas
    const newTasks = [...newActiveTasks, ...completedTasks];
  
    setTasks(newTasks);
  };
  
//---------------------------------------------------------------------------------------
return (
  <div className="mainContainer">
    <header>
      <img className="logo" src={logoFull} alt="Logo TaskQuest" />
    </header>

    <AccessButtons setShowModal={setShowModal} />

    {showModal && (
      <div className="modalOverlay">
        <div className="modalContent">
          <button onClick={() => setShowModal(false)} className="cancelButton">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2>Añadir Nueva Tarea:</h2>
          <TaskForm onAdd={addTask} />
        </div>
      </div>
    )}

    {showEditModal && (
      <EditTaskModal
        taskId={editTaskId}
        currentText={editTaskText}
        initialText={editTaskText}
        onSave={(newText) => editTask(editTaskId, newText)}
        setShowEditModal={setShowEditModal}
        onCancel={() => setShowEditModal(false)}
      />
    )}

    <DragDropContext onDragEnd={handleDragEnd}>
      <Routes>
        <Route path="/notas" element={<NotesPage />} />
        <Route path="/" element={
          <HomePage
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            openEditModal={openEditModal}
          />
        } />
      </Routes>
    </DragDropContext>
  </div>
);

};

export default App;
