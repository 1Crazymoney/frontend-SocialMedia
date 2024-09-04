import React, { useState, useEffect } from 'react';
import {
	getOwnPosts,
	deletePost,
	updatePost,
} from '../../../services/apiCalls';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import PostItem from '../../../components/PostItem/PostItem';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';

const Profile = () => {
	const [posts, setPosts] = useState([]);
	const { token } = useAuth();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			try {
				if (token) {
					const response = await getOwnPosts(token);

					if (response.success === false) {
						setError(response.message || 'Error fetching posts');
						console.log('Error fetching posts:', response.message);
					} else {
						setPosts(response.data || []);
					}
				}
			} catch (error) {
				setError('Error fetching posts: ' + error.message);
				console.error('Error fetching posts:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, [token]);

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

	const handleEdit = async (postId, updatedData) => {
		try {
			const result = await updatePost(postId, updatedData, token);

			if (result.success) {
				setPosts(
					posts.map((post) =>
						post._id === postId ? { ...post, ...updatedData } : post,
					),
				);
			} else {
				console.error(result.message);
			}
		} catch (error) {}
	};

	return (
		<>
			<ProfileHeader />
			<div className='profile-posts'>
				{isLoading ? (
					<p>Loading posts...</p>
				) : error ? (
					<p>Error: {error}</p>
				) : Array.isArray(posts) && posts.length > 0 ? (
					posts.map((post) => (
						<PostItem
							key={post._id}
							post={post}
							onEdit={(updatedData) => handleEdit(post._id, updatedData)}
							onDelete={() => handleDelete(post._id)}
						/>
					))
				) : (
					<p>No posts found. Make your first post!</p>
				)}
			</div>
		</>
	);
};

export default Profile;
