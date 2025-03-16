import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import NoteEditor from './components/NoteEditor';
import OnlineUsers from './components/OnlineUsers';

const socket = io('https://week-5-real-time-communication-with-fkoo.onrender.com'); // Backend URL

const App = () => {
  const [roomId, setRoomId] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomIdFromUrl = urlParams.get('roomId');
    if (roomIdFromUrl) {
      setRoomId(roomIdFromUrl);
      socket.emit('joinRoom', roomIdFromUrl);

      // Fetch existing note
      axios.get(`https://week-5-real-time-communication-with-fkoo.onrender.com/${roomIdFromUrl}`)
        .then((res) => setNoteContent(res.data.content || ''))
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    socket.on('noteUpdated', (updatedNote) => {
      setNoteContent(updatedNote.content);
    });
  }, []);

  const handleNoteChange = (e) => {
    const newContent = e.target.value;
    setNoteContent(newContent);
    socket.emit('updateNote', roomId, { content: newContent });
  };

  return (
    <div className="app">
      <h1>Real-Time Collaborative Notes</h1>
      <div className="container">
        <div className="note-container">
          <NoteEditor content={noteContent} onChange={handleNoteChange} />
        </div>
        <div className="online-users-container">
          <OnlineUsers users={onlineUsers} />
        </div>
      </div>
    </div>
  );
};

export default App;
