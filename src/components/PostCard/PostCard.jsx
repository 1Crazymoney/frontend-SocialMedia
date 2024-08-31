import React, { useState } from 'react';
import { likeOrNot } from '../../services/apiCalls';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

const PostCard = ({ post }) => {
	const [likes, setLikes] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(post.isLiked || false);
	const { token } = useAuth();

	const toggleLike = async () => {
		try {
			setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
			setIsLiked((prevIsLiked) => !prevIsLiked);

			const response = await likeOrNot(post._id, token);

			if (!response.success) {
				setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
				setIsLiked((prevIsLiked) => !prevIsLiked);
				console.error(response.message);
			} else {
				console.log('Response:', response.message);
			}
		} catch (error) {
			setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
			setIsLiked((prevIsLiked) => !prevIsLiked);
			console.error('Error liking/unliking post:', error);
		}
	};

	return (
		<div className='post-card'>
			<div className='post-header'>
				<img
					className='profile-picture-post'
					src={post.user.profilePicture}
					alt={`${post.user.first_name} ${post.user.last_name}`}
				/>
				<div className='user-info'>
					<h4 className='user-name'>{post.user.first_name} {post.user.last_name}</h4>
					<h6 className='user-username'>@{post.user.user_name}</h6>
				</div>
				<p className='post-date'>
					{new Date(post.createdAt).toLocaleDateString()}
				</p>
			</div>
			<div className='post-body'>
				<p className='post-description'>{post.description}</p>
				{post.image && (
					<img
						className='post-image'
						src={post.image}
						alt='Post'
					/>
				)}
			</div>
			<div className='post-footer'>
				<button
					onClick={toggleLike}
					className={`like-button ${isLiked ? 'liked' : ''}`}>
					{isLiked ? 'Unlike' : 'Like'}
				</button>
				<span className='likes-counter'>
					{likes} {likes === 1 ? 'Like' : 'Likes'}
				</span>
			</div>
		</div>
	);
};

export default PostCard;