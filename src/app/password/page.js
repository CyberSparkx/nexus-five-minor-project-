'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState({
    website: '',
    username: '',
    password: ''
  });

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get('https://minor-project-n5m6836rl-cybersparkxs-projects.vercel.app/api/password');
        setPasswords(response.data); // Assuming the API returns an array of passwords
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch passwords');
        setLoading(false);
      }
    };

    fetchPasswords();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
  };

  const addPassword = async () => {
    try {
      const response = await axios.post('https://minor-project-oe6arjltz-cybersparkxs-projects.vercel.app/api/password', newPassword);
      setPasswords((prevPasswords) => [...prevPasswords, response.data]);
      setNewPassword({ website: '', username: '', password: '' });
      closeModal();
    } catch (error) {
      setError('Failed to add password');
    }
  };

  const handleDeletePassword = async (id) => {
    try {
      // Send DELETE request to the backend to delete the specific password
      const response = await axios.delete(`https://minor-project-oe6arjltz-cybersparkxs-projects.vercel.app/api/password?id=${id}`);

      // Check if the password was successfully deleted
      if (response.data.message === 'Password deleted successfully') {
        setPasswords((prevPasswords) => prevPasswords.filter((password) => password._id !== id));
      } else {
        setError('Failed to delete password');
      }
    } catch (error) {
      setError('Failed to delete password');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="w-full py-5 px-8 bg-gray-900 shadow-md z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Password Manager</h1>
          <button 
            onClick={openModal} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Add Password
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full p-5 z-10 relative">
        <h2 className="text-xl font-semibold mb-5">Stored Passwords</h2>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {passwords.map((item) => (
              <div key={item._id} className="bg-gray-800 rounded-lg p-4 shadow-md hover:bg-gray-700 transition-all">
                <h3 className="text-2xl font-semibold">{item.website}</h3>
                <p className="text-sm mt-2">Username: {item.username}</p>
                <p className="text-sm mt-2">Password: {item.password}</p>
                <button
                  onClick={() => handleDeletePassword(item._id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-gray-800 p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-5">Add New Password</h2>
            <input
              type="text"
              name="website"
              value={newPassword.website}
              onChange={handleInputChange}
              placeholder="Website"
              className="w-full bg-gray-700 text-white p-3 rounded-md mb-4"
            />
            <input
              type="text"
              name="username"
              value={newPassword.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="w-full bg-gray-700 text-white p-3 rounded-md mb-4"
            />
            <input
              type="password"
              name="password"
              value={newPassword.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full bg-gray-700 text-white p-3 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={addPassword}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                Save Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordManager;
