import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchUsers } from './api/userApi';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Spinner from './components/Spinner'; // Import Spinner

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    };
    getUsers();
  }, []);

  const handleCreateUser = (newUser) => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <Router>
      {loading ? (
       <div className="flex justify-center items-center h-screen">
       <Spinner />
     </div>
     
      ) : (
        <Routes>
          <Route path="/" element={<UserList users={users} setUsers={setUsers} />} />
          <Route path="/user/new" element={<UserForm onSave={handleCreateUser} />} />
          <Route path="/user/:id" element={<UserForm users={users} onSave={handleUpdateUser} />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
