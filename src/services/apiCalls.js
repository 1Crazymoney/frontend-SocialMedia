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
		const response = await fetch(`${URL}/posts`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				postId,
				...data,
			}),
		});

		if (!response.ok) {
			const errorDetails = await response.text();
			throw new Error(
				`Error: ${response.status} ${response.statusText} - ${errorDetails}`,
			);
		}

		return await response.json();
	} catch (error) {
		throw error;
	}
};

// export const getOwnPosts = async (token) => {
// 	try {
// 		const response = await fetch(`${URL}/posts/own`, {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${token}`,
// 			},
// 		});

// 		if (!response.ok) {
// 			throw new Error(`Error: ${response.status} ${response.statusText}`);
// 		}

// 		return await response.json();
// 	} catch (error) {
// 		return { success: false, message: error.message };
// 	}
// };

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
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
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
		console.error(`Error fetching posts: ${errorDetails}`);
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	  }
  
	  return await response.json();
	} catch (error) {
	  console.error('Error in getAllPosts:', error);
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

// SUPER ADMIN

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

export const deletePostById = async (postId, token) => {
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
			throw new Error(`Error: ${response.status} ${response.statusText} - ${errorDetails}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};

export const updateUser = async (userId, userData, token) => {
	try {
		const response = await fetch(`${URL}/users/admin/${userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			const errorDetails = await response.text();
			throw new Error(`Error: ${response.status} ${response.statusText} - ${errorDetails}`);
		}

		return await response.json();
	} catch (error) {
		return { success: false, message: error.message };
	}
};