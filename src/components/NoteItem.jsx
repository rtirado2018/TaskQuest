import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchMinus, faSearchPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import './notesStyle.css';

const NoteItem = ({ note, onDelete, onToggleExpand, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSaveEdit = () => {
    if (editedContent !== note.content) {
      onEdit(note.id, editedContent);
    }
  };

  

  return (
    <div className={`noteItem ${note.expanded ? 'expanded' : ''}`}>
      {note.date && (
        <p>Creada: {new Date(note.date).toLocaleString()}</p>
      )}

      {note.expanded ? (
        <textarea 
          className="noteEditArea"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              e.target.blur(); // dispara onBlur
            }
          }}
          placeholder="Haz clic para editar..."
        />
      ) : (
        <p>{note.content.length > 1200 ? note.content.substring(0, 12008) + '...' : note.content}</p>
      )}

      <div className="btnContainer">
        <h3
          className="expandButton"
          onClick={() => onToggleExpand(note.id)}
          style={{ cursor: 'pointer' }}
        >
          <span className="expandIcon">
            <FontAwesomeIcon icon={note.expanded ? faSearchMinus : faSearchPlus} />
          </span>
          {note.expanded ? 'Ver menos' : 'Ver más'}
        </h3>

        <button
          className={`delButton ${isDeleting ? 'deleting' : ''}`}
          onMouseDown={() => {
            setIsDeleting(true);
            note._deleteTimeout = setTimeout(() => {
              onDelete(note.id);
              setIsDeleting(false);
            }, 800);
          }}
          onMouseUp={() => {
            clearTimeout(note._deleteTimeout);
            setIsDeleting(false);
          }}
          onMouseLeave={() => {
            clearTimeout(note._deleteTimeout);
            setIsDeleting(false);
          }}
          onTouchStart={() => {
            setIsDeleting(true);
            note._deleteTimeout = setTimeout(() => {
              onDelete(note.id);
              setIsDeleting(false);
            }, 800);
          }}
          onTouchEnd={() => {
            clearTimeout(note._deleteTimeout);
            setIsDeleting(false);
          }}
        >
          <span className="trashIcon"><FontAwesomeIcon icon={faTrash} /></span>Eliminar
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
