import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Surfer = ({ content, path, className }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(path)}
			className={className}>
			{content}
		</div>
	);
};
