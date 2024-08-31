import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../../services/apiCalls';
import { useAuth } from '../../../contexts/AuthContext/AuthContext'
import PostCard from '../../../components/PostCard/PostCard';
import CreatePost from '../../../components/CreatePost/CreatePost';
import './Home.css';

const Home = () => {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]);
  
    const handlePostCreated = (newPost) => {
      setPosts([newPost, ...posts]);
    };
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const result = await getAllPosts(token);
          if (result.success) {
            setPosts(result.data);
          } else {
            console.error('Error fetching posts:', result.message);
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      fetchPosts();
    }, [token]);
  
    return (
      <>
        <div className="posts-container">
        <CreatePost onPostCreated={handlePostCreated} />
            </div>  {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <p>No posts available.</p>
          )}
        <div>
        </div>
      </>
    );
  };
export default Home;  