import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Surfer } from '../Surfer/Surfer';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

export const Navbar = () => {
	const navigate = useNavigate();
	const { isLoggedIn, logout, isAdmin } = useAuth();
	return (
		<nav className='navbar'>
			{!isLoggedIn ? (
				<>
					<Surfer
						className='nav-item'
						path='/login'
						content='Login'
					/>
					<Surfer
						className='nav-item'
						path='/register'
						content='Register'
					/>
				</>
			) : (
				<>
					<Surfer
						className='nav-item'
						path='/profile'
						content='Profile'
					/>
					<Surfer
						className='nav-item'
						path='/home'
						content='Home'
					/>
					<div
						className='logout'
						onClick={logout}>
						Logout
					</div>
				</>
			)}
			{isAdmin && (
				<Surfer
					className='nav-item'
					path='/superadmin'
					content='SuperAdmin'
				/>
			)}
		</nav>
	);
};
