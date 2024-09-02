import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserByAdmin, deleteUserByAdmin } from '../../services/apiCalls';
import { CInput } from '../../components/CInput/CInput';
import '../../views/admin/Admin.css';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

export const CUsersList = () => {
  const { token, isLoggedIn, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      // Manejar el caso cuando el usuario no está logueado
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers(token);
      if (response.success) {
        setUsers(response.data);
      }
    };
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleSave = async () => {
    if (!editingUser) return;
    
    console.log("Data being sent:", editingUser);
    try {
        const response = await updateUserByAdmin(editingUser._id, editingUser, token);
        if (response.success) {
            setUsers(users.map((user) => 
                user._id === editingUser._id ? { ...user, ...editingUser } : user
            ));
            console.log("User updated successfully");
            setEditingUser(null);
        } else {
            console.error("Error updating user:", response.message);
        }
    } catch (error) {
        console.error("Error during save:", error);
    }
  };

  const handleDelete = async (userId) => {
      try {
          const response = await deleteUserByAdmin(userId, token);
          if (response.success) {
              setUsers(users.filter((user) => user._id !== userId));
          } else {
              console.error("Error deleting user:", response.message);
          }
      } catch (error) {
          console.error("Error during delete:", error);
      }
  };

  const handleInputChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  return (
    <div className='users-container'>
      <div className='table-row'>
        <h2 className='title'>ID</h2>
        <h2 className='title'>Email</h2>
        <h2 className='title'>Name</h2>
        <h2 className='title'>Role</h2>
        <h2 className='title'>Actions</h2>
      </div>
      {users.map((user) => (
        <div className='table-row' key={user._id}>
          <div className='content'>{user._id}</div>
          {editingUser && editingUser._id === user._id ? (
            <>
              <CInput
                type='text'
                name='email'
                value={editingUser.email}
                emitFunction={handleInputChange} 
              />
              <CInput
                type='text'
                name='first_name'
                value={editingUser.first_name}
                emitFunction={handleInputChange} 
              />
              <CInput
                type='text'
                name='role'
                value={editingUser.role}
                emitFunction={handleInputChange} 
              />
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
                  clickFunction={() => setEditingUser(null)}
                  className='button button-cancel'
                />
              </div>
            </>
          ) : (
            <>
              <div className='content'>{user.email}</div>
              <div className='content'>{user.first_name || 'N/A'}</div>
              <div className='content'>{user.role}</div>
              <div>
                <CInput
                  type='button'
                  value='Edit'
                  clickFunction={() => handleEdit(user)}
                  className='button'
                />
                <CInput
                  type='button'
                  value='Delete'
                  clickFunction={() => handleDelete(user._id)}
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