import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from '../public/Register/Register';
import { Login } from '../public/Login/Login';
import Home from '../user/Home/Home';
import Profile from '../user/Profile/Profile';
import { NotFound } from '../../components/NotFound/NotFound';
import UsersList from '../admin/UsersList';
import PostsList from '../admin/PostsList';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

export const Body = () => {
	const { isLoggedIn, isAdmin } = useAuth();

	return (
		<main className='body'>
			<Routes>
				<Route
					path='/'
					element={
						isLoggedIn ? <Navigate to='/home' /> : <Navigate to='/login' />
					}
				/>
				<Route
					path='/login'
					element={!isLoggedIn ? <Login /> : <Navigate to='/home' />}
				/>
				<Route
					path='/register'
					element={!isLoggedIn ? <Register /> : <Navigate to='/home' />}
				/>
				<Route
					path='/home'
					element={isLoggedIn ? <Home /> : <Navigate to='/login' />}
				/>
				<Route
					path='/profile'
					element={isLoggedIn ? <Profile /> : <Navigate to='/login' />}
				/>

				{isAdmin && (
					<>
						<Route
							path='/adminusers'
							element={<UsersList />}
						/>
						<Route
							path='/adminposts'
							element={<PostsList />}
						/>
					</>
				)}

				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</main>
	);
};
