import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditNote = ({ noteId, onNoteUpdated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`/${noteId}`);
        const { title, content, category } = response.data;
        setTitle(title);
        setContent(content);
        setCategory(category);
      } catch (error) {
        console.error('Error fetching note:', error);
        alert('Failed to fetch note. Please check if the note exists.');
      }
    };

    fetchNote();
  }, [noteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/notes/${noteId}`, { title, content, category });
      console.log('Note updated');
      onNoteUpdated();
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Update Note</button>
    </form>
  );
};

export default EditNote;