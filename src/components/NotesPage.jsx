import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NoteItem from './NoteItem';
import NoteForm from './NoteForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import './notesStyle.css';

const NotesPage = () => {
  const [notes, setNotes] = useState([]); // Lista de notas
  const [showNoteForm, setShowNoteForm] = useState(false); // Formulario para añadir nota

  // Cargar las notas desde localStorage cuando se monte el componente
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes)); // Cargar las notas al estado
    }
  }, []);

  // Guardar las notas en localStorage solo si las notas cambian
  useEffect(() => {
    if (notes.length > 0) { // Solo guardamos si hay notas
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]); // Se ejecuta cada vez que 'notes' cambia

  // Función para agregar una nueva nota
  const addNote = (noteContent) => {
    const newNote = {
      id: Date.now(),
      content: noteContent,
      expanded: false, // Estará contraído por defecto
      date: new Date().toISOString() // Agregar la fecha actual
    };
    setNotes([newNote, ...notes]); // Añadir la nueva nota al inicio
    setShowNoteForm(false); // Cerrar el formulario
  };

  // Función para borrar una nota
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id)); // Eliminar la nota por ID
  };

  // Función para expandir o contraer una nota
  const toggleNoteExpand = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, expanded: !note.expanded } : note
    ));
  };

  const editNote = (id, newContent) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, content: newContent } : note
    ));
  };
  

  return (
    <div className="main">
      <Link to="/">
        <button className="homeButton">
          <span className="homeIcon"><FontAwesomeIcon icon={faHouse} /></span>Inicio
        </button>
      </Link>
      <div className="notesContainer">
        <h2>Notas</h2>
        <button className="addNoteButton" onClick={() => setShowNoteForm(true)}>
          <span className="addNoteIcon"><FontAwesomeIcon icon={faSquarePlus} /></span>Añadir Nota
        </button>

        {showNoteForm && <NoteForm onAdd={addNote} onClose={() => setShowNoteForm(false)} />}

        <div className="notesList">
          {notes.map(note => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onToggleExpand={toggleNoteExpand}
              onEdit={editNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
