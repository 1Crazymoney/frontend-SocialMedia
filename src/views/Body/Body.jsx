import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Register } from '../public/Register/Register';
import { Login } from '../public/Login/Login';
import { Home } from '../user/Home/Home';
import { Profile } from '../user/Profile/Profile';
import { Admin } from '../admin/Admin';
import { NotFound } from '../../components/NotFound/NotFound';

export const Body = () => {
	const passport = JSON.parse(localStorage.getItem('passport'));
	let role = null;
	if (passport) {
		role = passport.tokenData.role;
	}

	return (
		<main className='body'>
			<Routes>
				<Route
					path='*'
					element={<NotFound />}
				/>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route
					path='/profile'
					element={<Profile />}
				/>

				{role === 'admin' && (
					<Route
						path='/admin'
						element={<Admin />}
					/>
				)}
			</Routes>
		</main>
	);
};
