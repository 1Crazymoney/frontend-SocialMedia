import React, { useState, useEffect } from 'react';
import { getOwnPosts, deletePost } from '../../../services/apiCalls';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import PostItem from '../../../components/PostItem/PostItem';

const Profile = () => {
	const [posts, setPosts] = useState([]);
	const { token } = useAuth();

	useEffect(() => {
		const fetchPosts = async () => {
			if (!token) return; // Asegúrate de que el token esté disponible antes de hacer la solicitud
			try {
				console.log('Token being sent:', token); // Verifica que el token esté correcto
				const result = await getOwnPosts(token);
				console.log('API Response:', result);
				if (result.success) {
					setPosts(result.data);
				} else {
					console.error(result.message);
				}
			} catch (error) {
				console.error('Error fetching own posts:', error);
			}
		};

		fetchPosts();
	}, [token]); // Vuelve a intentar la solicitud cuando el token esté disponible

	const handleDelete = async (postId) => {
		try {
			const result = await deletePost(postId, token);
			if (result.success) {
				setPosts(posts.filter((post) => post._id !== postId));
			} else {
				console.error(result.message);
			}
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	return (
		<div className='profile-posts'>
			{Array.isArray(posts) && posts.length === 0 ? (
				<p>No posts available.</p>
			) : (
				posts.map((post) => (
					<PostItem
						key={post._id}
						post={post}
						onDelete={handleDelete}
					/>
				))
			)}
		</div>
	);
};

export default Profile;
