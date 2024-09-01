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

	useEffect(() => {
		const fetchPosts = async () => {
			if (!token) return;
			try {
				console.log('Token being sent:', token);
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
		} catch (error) {
			console.error('Error updating post:', error);
		}
	};

	return (
		<>
			<ProfileHeader />
			<div className='profile-posts'>
				{posts.length === 0 ? (
					<p>No posts available.</p>
				) : (
					posts.map((post) => (
						<PostItem
							key={post._id}
							post={post}
							onDelete={handleDelete}
							onEdit={handleEdit}
						/>
					))
				)}
			</div>
		</>
	);
};

export default Profile;
