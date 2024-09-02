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

          if (response.success === false) {
            setError('Error fetching posts: ' + response.message);
            console.error('Error fetching posts:', response.message);
          } else {
            setPosts(response.data || []);
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

// const Home = () => {
//   const { token, setToken, isLoggedIn, logout } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState('');

//   const handlePostCreated = (newPost) => {
//     if (newPost && newPost.data && newPost.data.post) {
//       setPosts((prevPosts) => [...prevPosts, newPost.data.post]);
//     } else {
//       console.error("Error: newPost is not a valid post object");
//     }
//   };

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         if (token) {
//           const response = await getAllPosts(token);

//           if (response.success === false) {
//             setError('Error fetching posts: ' + response.message);
//             console.error('Error fetching posts:', response.message);
//           } else {
//             setPosts(response.data || []);
//           }
//         } else {
//           setError('Token is invalid or expired.');
//           console.error('Token is invalid or expired.');
//           logout();
//         }
//       } catch (error) {
//         setError('Error fetching posts: ' + error.message);
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, [token, logout]);

//   return (
//     <div className="home-page">
     
//       <div className="create-post-wrapper">
//         <CreatePost onPostCreated={handlePostCreated} />
//       </div>
  
    
//       {error && <p>{error}</p>}
  
     
//       {Array.isArray(posts) && posts.length > 0 ? (
//         posts.map((post) => (
//           <PostCard key={post._id} post={post} />
//         ))
//       ) : (
//         <p>No posts available.</p>
//       )}
//     </div>
//   );
// };

// export default Home;
