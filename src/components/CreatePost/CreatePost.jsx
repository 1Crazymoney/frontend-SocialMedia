import React, { useState } from 'react';
import { createPost } from '../../services/apiCalls';
import { useAuth } from '../../contexts/AuthContext/AuthContext'
import './CreatePost.css'; // Asegúrate de que esta ruta sea correcta

const CreatePost = ({ onPostCreated }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const { token } = useAuth(); // Obtén el token del contexto de autenticación

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description) {
      alert('Description is required');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const result = await createPost(formData, token);
      if (result.success) {
        console.log('Post created successfully:', result.data.post);
        setDescription('');
        setImage(null);
        if (onPostCreated) {
          onPostCreated(result.data.post);
        }
      } else {
        console.error('Error creating post:', result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post.');
    }
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;

