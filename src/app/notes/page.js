'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/components/Loading';
import Nav from '@/components/Nav';

const NotesApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteDescription, setNewNoteDescription] = useState('');

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/notes`);
        setNotes(response.data); // Assuming the API returns an array of notes
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch notes');
        setLoading(false);
      }
    };

    fetchNotes();
  }, [API_BASE_URL]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNote = async () => {
    const newNote = { title: newNoteTitle, description: newNoteDescription };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/notes`, newNote);
      setNotes((prevNotes) => [...prevNotes, response.data]);
      setNewNoteTitle('');
      setNewNoteDescription('');
      setIsModalOpen(false);
    } catch (error) {
      setError('Failed to add note');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      // Send DELETE request to the backend to delete the specific note
      const response = await axios.delete(`${API_BASE_URL}/api/notes?id=${id}`);

      // Check if the note was successfully deleted
      if (response.data.message === 'Note deleted successfully') {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } else {
        setError('Failed to delete note');
      }
    } catch (error) {
      setError('Failed to delete note');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Nav/>
      <Loading/>
      {/* Header */}
      <header className="w-full py-5 px-8 bg-gray-900 shadow-md z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Notes</h1>
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Add Note
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full p-5 z-10 relative">
        <h2 className="text-xl font-semibold mb-5">Your Notes</h2>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id} // Changed from note.id to note._id
                className="bg-gray-800 rounded-lg p-4 shadow-md hover:bg-gray-700 transition-all"
              >
                <h3 className="text-2xl font-semibold">{note.title}</h3>
                <p className="text-sm mt-2">{note.description}</p>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteNote(note._id)} // Changed from note.id to note._id
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
            <h2 className="text-2xl font-semibold mb-5">Add New Note</h2>
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Note Title"
              className="w-full bg-gray-700 text-white p-3 rounded-md mb-4"
            />
            <textarea
              value={newNoteDescription}
              onChange={(e) => setNewNoteDescription(e.target.value)}
              placeholder="Note Description"
              rows="5"
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
                onClick={handleAddNote}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesApp;
