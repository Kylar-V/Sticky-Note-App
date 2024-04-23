import React from "react";

const Note = (props) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "title", updatedValue);

  };
    const updateDescription = (e) => {
      const updatedValue = e.target.value;
      const editMeId = props.note.id;
      props.onType(editMeId, "description", updatedValue);
    };
    
  const clickDelete = () => {
    props.removeNote(props.note.id);
  }  
  return (
    <li className="note">
        <input  
        type="text" 
        value={props.note.title}
        onChange={updateTitle}
        placeholder="Title" 
        className="note__title"
        />

        <textarea 
         value={props.note.description}
         onChange={updateDescription}
         placeholder="Description..." 
         className="note__description" 
        />
        <span className="note__delete" onClick={clickDelete}>X</span>
      </li>
  );
};

export default Note;