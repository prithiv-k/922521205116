import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


const Post = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [updateName, setUpdateName] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3500/post')
      .then(res => setUsers(res.data));
  }, []);

  const postUser = () => {
    axios.post('http://localhost:3500/post', { name: name })
      .then(res => setUsers([...users, res.data]))
      .then(() => setName(""))
      .catch(err => console.error("Failed to post user:", err));
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3500/post/${id}`)
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(err => console.error("Failed to delete user:", err));
  }

  const updateUser = () => {
    axios.put(`http://localhost:3500/post/${updateId}`, { name: updateName })
      .then(() => {
        const updatedUsers = users.map(u => {
          if (u.id === updateId) {
            return { ...u, name: updateName };
          }
          return u;
        });
        setUsers(updatedUsers);
        setUpdateId(null);
        setUpdateName("");
      })
      .catch(err => console.error("Failed to update user:", err));
  }

  return (
    <div>
      {users.map(u => (
        <div key={u.id}>
          {u.name}
          <button onClick={() => deleteUser(u.id)}>delete</button>
          <button onClick={() => {setUpdateId(u.id); setUpdateName(u.name);}}>edit</button>
        </div>
      ))}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={postUser}>post</button>
      {updateId && (
        <div>
          <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
          <button onClick={updateUser}>update</button>
        </div>
      )}
    </div>
  );
};

export default Post;
