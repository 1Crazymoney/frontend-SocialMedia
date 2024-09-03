import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import './PostItem.css';

const PostItem = ({ post, onEdit, onDelete }) => {
    const { token } = useAuth();
    const [likes, setLikes] = useState(post?.likes?.length || 0);

    useEffect(() => {
      console.log('PostItem recibió:', post);
    }, [post]);

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
            alt={`${first_name} ${last_name}`}
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
          <button onClick={() => onEdit(post._id)} className='button'>Edit</button>
          <button onClick={() => onDelete(post._id)} className='button'>Delete</button>
        </div>
      </div>
    );
};

export default PostItem;

