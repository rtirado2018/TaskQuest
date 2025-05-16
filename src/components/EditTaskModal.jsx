import React, { useState } from 'react';
import "./ModalStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EditTaskModal = ({ initialText, onSave, onCancel }) => {
  const [text, setText] = useState(initialText);

  const handleSave = () => {
    if (text.trim() === '') {
      alert('No puedes dejar la tarea vacía');
      return;
    }
    onSave(text);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button onClick={onCancel} className="cancelButton"><span className="cancelIcon"><FontAwesomeIcon icon={faXmark} /></span></button>
        <h2>Editar Tarea:</h2>
        <textarea
          className="textArea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="addTask" onClick={handleSave}>Guardar cambios</button>
      </div>
    </div>
  );
};

export default EditTaskModal;
