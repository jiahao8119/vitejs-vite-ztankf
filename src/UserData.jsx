import React, { useState, useEffect } from 'react';

const UserData = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      fetchUserData(userId);
    }
  };

  return (
    <div>
      <h2>Fetch User Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <button type="submit">Fetch User</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData && (
        <div>
          <h3>User Information</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>User Name:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Address:</strong> {userData.address.street}, {userData.address.city}</p>
        </div>
      )}
    </div>
  );
};

export default UserData;
