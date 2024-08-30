import React, { useState } from 'react';
import { likeOrNot } from '../../services/apiCalls';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

const PostCard = ({ post, onLike }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = async () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    try {
      const { token } = useAuth();
      const response = await likeOrNot(post._id, token);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h4 className="user-name">{post.user.user_name}</h4>
        <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="post-body">
        <p className="post-description">{post.description}</p>
        {post.image && <img className="post-image" src={post.image} alt="Post" />}
      </div>
      <div className="post-footer">
        <button 
          onClick={toggleLike}
          className={`like-button ${isLiked ? 'liked' : ''}`}
        >
          {isLiked ? 'Unlike' : 'Like'}
        </button>
        <span className="likes-counter">
          {likes} {likes === 1 ? 'Like' : 'Likes'}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
