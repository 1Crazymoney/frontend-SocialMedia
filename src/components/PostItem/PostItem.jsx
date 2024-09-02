import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import './PostItem.css';

const PostItem = ({ post }) => {
    const { token } = useAuth();
    const [error, setError] = useState(null);
    
    useEffect(() => {
      console.log('PostItem recibió:', post);
      console.log('post.user:', post.user);
      console.log('post.likes:', post.likes);
    }, [post]);

  
    const [likes, setLikes] = useState(post?.likes?.length || 0);
  
    const {
      user,
      description = '',
      image = null,
      createdAt = '',
    } = post;
  
    const {
      profilePicture = '',
      first_name = 'Unknown',
      last_name = 'User',
      user_name = 'user',
    } = user;
  
    return (
      <div className='post-card'>
        <div className='post-header'>
        <img
            className='profile-picture-post'
            src={profilePicture}
            alt={`${post.user.first_name} ${last_name}`}
          />
  
          <div className='user-info'>
            <h4 className='user-name'>
              {first_name} {last_name}
            </h4>
            <h6 className='user-username'>@{user_name}</h6>
          </div>
          <p className='post-date'>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <div className='post-body'>
          <p className='post-description'>{description}</p>
          {image && (
            <img
              className='post-image'
              src={image}
              alt='Post'
            />
          )}
        </div>
        <div className='post-footer'>
          <span className='likes-counter'>
            {likes} {likes === 1 ? 'Like' : 'Likes'}
          </span>
        </div>
      </div>
    );
  };

export default PostItem;
