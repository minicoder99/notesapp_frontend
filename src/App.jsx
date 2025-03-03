import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const fetchNotes = async () => {
    try {
      const response = await axios.get('/');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/search?keyword=${encodeURIComponent(keyword)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching notes:', error);
      alert('Failed to search notes. Please try again.');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleEdit = (id) => {
    setEditingNoteId(id);
  };

  const handleNoteUpdated = () => {
    setEditingNoteId(null);
    fetchNotes();
  };

  return (
    <div>
      <h1>Notes App</h1>
      {editingNoteId ? (
        <EditNote noteId={editingNoteId} onNoteUpdated={handleNoteUpdated} />
      ) : (
        <AddNote onNoteAdded={fetchNotes} />
      )}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search notes"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p><strong>Category:</strong> {note.category}</p>
            <button onClick={() => handleEdit(note.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;