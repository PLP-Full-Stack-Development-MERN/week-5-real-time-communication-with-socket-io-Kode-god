import React from 'react';


const OnlineUsers = ({ users }) => (
  <div className="online-users">
    <h3>Online Users: {users.length}</h3>
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user}</li>
      ))}
    </ul>
  </div>
);

export default OnlineUsers;