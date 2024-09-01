import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser, deleteUserById } from '../../services/apiCalls';
import { CInput } from '../../components/CInput/CInput';
import '../../views/admin/Admin.css'

export const CUsersList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const passport = JSON.parse(localStorage.getItem('passport'));
    const token = passport.token;

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getAllUsers(token);
            if (response.success) {
                setUsers(response.data);
            }
        };
        fetchUsers();
    }, [token]);

    const handleEdit = (user) => {
        setEditingUser({ ...user });
    };

    const handleSave = async () => {
        const response = await updateUser(token, editingUser._id, editingUser);
        if (response.success) {
            setUsers(users.map((user) => (user._id === editingUser._id ? editingUser : user)));
            setEditingUser(null);
        }
    };

    const handleDelete = async (userId) => {
        const response = await deleteUserById(token, userId);
        if (response.success) {
            setUsers(users.filter((user) => user._id !== userId));
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
                                onChange={handleInputChange}
                            />
                            <CInput
                                type='text'
                                name='first_name'
                                value={editingUser.first_name}
                                onChange={handleInputChange}
                            />
                            <CInput
                                type='text'
                                name='role'
                                value={editingUser.role}
                                onChange={handleInputChange}
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
