import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../../services/apiCalls';
import { useAuth } from '../../../contexts/AuthContext/AuthContext'
import PostCard from '../../../components/PostCard/PostCard';
import CreatePost from '../../../components/CreatePost/CreatePost';
import './Home.css';

const Home = () => {
  const { token, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const handlePostCreated = (newPost) => {
    if (newPost && newPost.data && newPost.data.post) {
      setPosts((prevPosts) => [...prevPosts, newPost.data.post]);
    } else {
      console.error("Error: newPost is not a valid post object");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (token) {
          const response = await getAllPosts(token);
          console.log(response);
          if (response.success === false) {
            setError('Error fetching posts: ' + response.message);
            console.error('Error fetching posts:', response.message);
          } else {
            const validPosts = (response.data || []).filter(post => post && post._id);
            setPosts(validPosts);
          }
        }
      } catch (error) {
        setError('Error fetching posts: ' + error.message);
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, [token]);

  return (
    <div className="home-page">
      <div className="create-post-wrapper">
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
    </div>
  );
};

export default Home;