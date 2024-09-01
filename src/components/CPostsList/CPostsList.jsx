import React, { useEffect, useState } from 'react';
import {
  getAllPosts,
  updatePostByAdmin,
  deletePostById,
} from '../../services/apiCalls';
import { CInput } from '../../components/CInput/CInput';
import '../../views/admin/Admin.css';

export const CPostsList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const passport = JSON.parse(localStorage.getItem('passport'));
  const token = passport?.token;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts(token);
        if (response.success) {
          setPosts(response.data);
        } else {
          console.error('Failed to fetch posts:', response.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const handleEdit = (post) => {
    setEditingPost({ ...post });
  };

  const handleSave = async () => {
    try {
      const response = await updatePostByAdmin(
        editingPost._id,
        editingPost,
        token,
      );
      if (response.success) {
        setPosts(
          posts.map((post) =>
            post._id === editingPost._id ? editingPost : post,
          ),
        );
        setEditingPost(null);
      } else {
        console.error('Failed to update post:', response.message);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await deletePostById(token, postId);
      if (response.success) {
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        console.error('Failed to delete post:', response.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditingPost({ ...editingPost, [e.target.name]: e.target.value });
  };

  return (
    <div className='posts-container'>
      <div className='table-row'>
        <h2 className='title'>ID</h2>
        <h2 className='title'>User</h2>
        <h2 className='title'>Description</h2>
        <h2 className='title'>Likes</h2>
        <h2 className='title'>Actions</h2>
      </div>
      {posts.map((post) => (
        <div
          className='table-row'
          key={post._id}>
          <div className='content'>{post._id}</div>
          {editingPost && editingPost._id === post._id ? (
            <>
              <div className='content'>{post.user?.user_name || 'N/A'}</div>
              <CInput
                type='text'
                name='description'
                value={editingPost.description}
                emitFunction={handleInputChange}
                className='input-field'
              />
              <div className='content'>{post.likes?.length || 0}</div>
              <div>
                <CInput
                  type='button'
                  value='Save'
                  clickFunction={handleSave}
                  className='button button-save'
                />
                <CInput
                  type='button'
                  value='Cancel'
                  clickFunction={() => setEditingPost(null)}
                  className='button button-cancel'
                />
              </div>
            </>
          ) : (
            <>
              <div className='content'>{post.user?.user_name || 'N/A'}</div>
              <div className='content'>{post.description}</div>
              <div className='content'>{post.likes?.length || 0}</div>
              <div>
                <CInput
                  type='button'
                  value='Edit'
                  clickFunction={() => handleEdit(post)}
                  className='button'
                />
                <CInput
                  type='button'
                  value='Delete'
                  clickFunction={() => handleDelete(post._id)}
                  className='button'
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};