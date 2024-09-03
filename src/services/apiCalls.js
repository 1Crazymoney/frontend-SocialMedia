const URL = 'http://localhost:4000/api';

// PUBLIC

export const RegisterUser = async (credentials) => {
	try {
		const request = await fetch(`${URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		if (!request.ok) {
			throw new Error(`Error: ${request.status} ${request.statusText}`);
		}

		return await request.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};

export const LoginUser = async (credentials) => {
	try {
		const request = await fetch(`${URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		if (!request.ok) {
			throw new Error(`Error: ${request.status} ${request.statusText}`);
		}

		return await request.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};

// USER

export const getProfile = async (token) => {
	try {
		const response = await fetch(`${URL}/users/profile`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};

export const updateProfile = async (data, token) => {
	if (!data || !token) {
		throw new Error('Data and token are required');
	}

	try {
		const response = await fetch(`${URL}/users/profile`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorDetails = await response.text();
			throw new Error(
				`Error: ${response.status} ${response.statusText} - ${errorDetails}`,
			);
		}

		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		console.error('Error in updateProfile API call:', error.message);
		throw error;
	}
};

export const getFollowers = async (token) => {
	try {
		const response = await fetch(`${URL}/users/followers`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: 'Error fetching followers' };
	}
};

export const unFollow = async (id, token) => {
	try {
		const response = await fetch(`${URL}/users/unfollow/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: 'Error unfollowing user' };
	}
};

export const follow = async (id, token) => {
	try {
		const response = await fetch(`${URL}/users/follow/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: 'Error following user' };
	}
};

// POSTS

export const createPost = async (formData, token) => {
	try {
		const response = await fetch(`${URL}/posts`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};

export const likeOrNot = async (postId, token) => {
	try {
		const response = await fetch(`${URL}/posts/like/${postId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};

export const deletePost = async (postId, token) => {
	try {
		const response = await fetch(`${URL}/posts/${postId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};

export const updatePost = async (postId, data, token) => {
	if (!postId || !data || !token) {
	  throw new Error('Post ID, data, and token are required');
	}
  
	try {
	  
  
	  const response = await fetch(`${URL}/posts/${postId}`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	  });
  
	  if (!response.ok) {
		const errorDetails = await response.text();
		
		throw new Error(
		  `Error: ${response.status} ${response.statusText} - ${errorDetails}`,
		);
	  }
  
	  const result = await response.json();
	  
	  return result;
	} catch (error) {
	    
	  throw error;
	}
  };

  export const getOwnPosts = async (token) => {
	try {
	  const response = await fetch(`${URL}/posts/own`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${token}`,
		},
	  });
  
	  if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
	  }
  
	  const data = await response.json();
	  return { success: true, data: data.data };
	} catch (error) {
	 
	  return { success: false, message: error.message };
	}
  };

export const getAllPosts = async (token) => {
	try {
		const response = await fetch(`${URL}/posts`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorDetails = await response.text();
			
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		
		return { success: false, message: error.message };
	}
};

export const getPostById = async (postId, token) => {
	try {
		const response = await fetch(`${URL}/posts/${postId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};

export const getPostsByUserId = async (userId, token) => {
	try {
		const response = await fetch(`${URL}/posts/users/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};


export const getAllUsers = async (token) => {
	try {
		const response = await fetch(`${URL}/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};

export const deleteUserById = async (token, id) => {
	try {
		const response = await fetch(`${URL}/users/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};

//Delete posts Admin
export const deletePostById = async (token, postId) => {
	try {
		const response = await fetch(`${URL}/posts/admin/${postId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorDetails = await response.text();
			throw new Error(
				`Error: ${response.status} ${response.statusText} - ${errorDetails}`,
			);
		}

		return await response.json();
	} catch (error) {
		console.error('Error deleting post:', error);
		return { success: false, message: error.message };
	}
};

//Update post by Admin
export const updatePostByAdmin = async (postId, data, token) => {
	try {
		const response = await fetch(`${URL}/posts/admin/${postId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorDetails = await response.text();
			throw new Error(
				`Error: ${response.status} ${response.statusText} - ${errorDetails}`,
			);
		}

		return await response.json();
	} catch (error) {
		throw new Error(`Error updating post: ${error.message}`);
	}
};

//Delete user by ADMIN
export const deleteUserByAdmin = async (userId, token) => {
    try {
        console.log('Deleting user:', userId);
        console.log('Token:', token);

        const response = await fetch(`${URL}/users/admin/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        console.log('Delete response:', data);

        if (response.ok) {
            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.message || response.statusText };
        }
    } catch (error) {
        console.error('Error in deleteUserByAdmin:', error);
        return { success: false, message: error.message };
    }
};

//Update user ADMIN
export const updateUserByAdmin = async (userId, userData, token) => {
    try {
        console.log("Sending update request for user:", userId);
        console.log("Update data:", userData);
        console.log("Token:", token);

        const response = await fetch(`${URL}/users/admin/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} ${response.statusText} - ${responseData.message || 'Unknown error'}`,
            );
        }

        console.log("Update response:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error in updateUserByAdmin:", error);
        return { success: false, message: error.message };
    }
};

