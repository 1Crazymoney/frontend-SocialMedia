import React from 'react';
import bannerImage from '../../assets/img/banner-EMME.png';
import './Sidebar.css';

export const Sidebar = () => {
	return (
		<>
			<aside className='sidebar'>
			<img className='img-side-item' src={bannerImage} alt='Banner' />
			</aside>
		</>
	);
};
