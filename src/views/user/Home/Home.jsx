import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../../services/apiCalls';
import { useAuth } from '../../../contexts/AuthContext/AuthContext'
import PostCard from '../../../components/PostCard/PostCard';
import CreatePost from '../../../components/CreatePost/CreatePost';
import './Home.css';

const Home = () => {
  const { token, setToken, isLoggedIn, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const handlePostCreated = (newPost) => {
      setPosts([newPost, ...posts]);
  };

  useEffect(() => {
      const fetchPosts = async () => {
          try {
              if (token) {
                  const response = await getAllPosts(token);

                  if (response.success === false) {
                      setError('Error fetching posts: ' + response.message);
                      console.error('Error fetching posts:', response.message);
                  } else {
                      setPosts(response);
                  }
              } else {
                  setError('Token is invalid or expired.');
                  console.error('Token is invalid or expired.');
                  logout();
              }
          } catch (error) {
              setError('Error fetching posts: ' + error.message);
              console.error('Error fetching posts:', error);
          }
      };

      fetchPosts();
  }, [token, logout]);

  return (
      <>
          <div className="posts-container">
              <CreatePost onPostCreated={handlePostCreated} />
          </div>
          {error && <p>{error}</p>}
          {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                  <PostCard key={post._id} post={post} />
              ))
          ) : (
              <p>No posts available.</p>
          )}
      </>
  );
};

export default Home;