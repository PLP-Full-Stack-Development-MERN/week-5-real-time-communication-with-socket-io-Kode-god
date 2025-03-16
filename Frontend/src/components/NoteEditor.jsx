import React from 'react';


const NoteEditor = ({ content, onChange }) => (
  <div className="note-editor">
    <textarea
      value={content}
      onChange={onChange}
      placeholder="Start typing your note..."
      style={{ width: '100%', height: '300px' }}
    />
  </div>
 
);

export default NoteEditor;