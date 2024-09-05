// src/api/userApi.js

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

// export const createUser = async (userData) => {
//   const response = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
//   if (!response.ok) throw new Error('Failed to create user');
//   return response.json();
// };
export const createUser = async (userData) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
  
    // Simulate an API response with a generated ID
    return { id: Date.now(), ...userData };
  };
  

// export const updateUser = async (id, userData) => {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
//   if (!response.ok) throw new Error('Failed to update user');
//   return response.json();
// };
export const updateUser = async (id, userData) => {
    // Check if the user is local (i.e., created with a Date.now() ID)
    if (id >= 10000) {  // Assuming that API user IDs are all less than 10000
      return new Promise((resolve) => {
        // Just simulate the update for locally created users
        setTimeout(() => resolve({ id, ...userData }), 500);
      });
    }
  
    // For users from the API, perform an actual PUT request
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  };
  
export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
};

