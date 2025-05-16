import React, { useState } from 'react';

import './notesStyle.css';

const NoteForm = ({ onAdd, onClose }) => {
  const [noteContent, setNoteContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteContent.trim()) {
      onAdd(noteContent);
    }
  };

  return (       
    <div className="noteForm">
      <h3 className="addNote">Añadir Nueva Nota</h3>
      <form onSubmit={handleSubmit}>
        <textarea  className="noteFormArea"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Escribe tu nota aquí..."
        />
        <div className="formButtons">
          <button className="saveButton" type="submit">Guardar</button>
          <button className="cnclButton" type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;





