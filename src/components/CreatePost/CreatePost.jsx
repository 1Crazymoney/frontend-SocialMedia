import React, { useState } from 'react';
import { createPost } from '../../services/apiCalls';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import './CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const { token } = useAuth();

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

			console.log('Post creation result:', result);

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
		<div className='create-post-container'>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Description:</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Image:</label>
					<input
						type='file'
						id='image'
						onChange={handleImageChange}
						accept='image/*'
					/>
				</div>
				<button type='submit'>Create Post</button>
			</form>
		</div>
	);
};

export default CreatePost;
