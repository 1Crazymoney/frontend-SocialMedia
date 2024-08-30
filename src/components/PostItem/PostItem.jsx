import React, { useState } from 'react';
import { updatePost } from '../../services/apiCalls';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import './PostItem.css';

const PostItem = ({ post, onDelete, onEdit }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [description, setDescription] = useState(post.description);
	const [image, setImage] = useState(post.image);

	const handleEdit = () => {
		onEdit(post._id, { description, image });
		setIsEditing(false);
	};

	return (
		<div className='post-item'>
			{isEditing ? (
				<div>
					<textarea value={description} onChange={(e) => setDescription(e.target.value)} />
					<input type='text' value={image} onChange={(e) => setImage(e.target.value)} />
					<button onClick={handleEdit}>Save</button>
					<button onClick={() => setIsEditing(false)}>Cancel</button>
				</div>
			) : (
				<div>
					<p>{post.description}</p>
					<img src={post.image} alt='Post' />
					<button onClick={() => setIsEditing(true)}>Edit</button>
					<button onClick={() => onDelete(post._id)}>Delete</button>
				</div>
			)}
		</div>
	);
};

export default PostItem;