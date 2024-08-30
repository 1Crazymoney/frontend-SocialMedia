import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../../services/apiCalls';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import PostCard from '../../../components/PostCard/PostCard';
import './Home.css';

const Home = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const fetchPosts = async () => {
          try {
              const result = await getAllPosts(token); 
              console.log(result);

              if (result && Array.isArray(result.data)) {
                  setPosts(result.data);
              } else {
                  console.error("Unexpected API response structure:", result);
              }
          } catch (error) {
              console.error("Error fetching posts:", error);
          }
      };

      fetchPosts();
  }, [token]);

  return (
      <div>
          {Array.isArray(posts) && posts.length > 0 ? (
              posts.map(post => (
                  <PostCard key={post._id} post={post} />
              ))
          ) : (
              <p>No posts available.</p>
          )}
      </div>
  );
};

export default Home;
