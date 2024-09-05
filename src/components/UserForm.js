import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../api/userApi';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = ({ users, onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const userId = id ? parseInt(id) : null;

  useEffect(() => {
    if (userId) {
      const user = users.find((user) => user.id === userId);
      if (user) {
        setFormData({ name: user.name, email: user.email, phone: user.phone });
      }
    }
  }, [userId, users]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        const updatedUser = await updateUser(userId, formData);
        onSave(updatedUser);
      } else {
        const newUser = await createUser(formData);
        onSave({ id: Date.now(), ...newUser });
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to submit user:', error.message);
      alert('Error submitting user!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">{userId ? 'Update User' : 'Create User'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        {userId ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
