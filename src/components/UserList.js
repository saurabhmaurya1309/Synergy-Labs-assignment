import React from 'react';
import { deleteUser } from '../api/userApi';
import { Link } from 'react-router-dom';

const UserList = ({ users, setUsers }) => {
  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">User List</h1>
      <Link to="/user/new" className="bg-green-500 text-white px-4 py-2 rounded my-4 inline-block">
        Add New User
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mt-4 border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.phone}</td>
                <td className="px-4 py-2 border">
                  <Link to={`/user/${user.id}`} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</Link>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
