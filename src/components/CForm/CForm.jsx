import React, { useState } from 'react';
import { CInput } from '../CInput/CInput';

export const CForm = ({ fields, onSubmit, submitButtonText }) => {
	const [formData, setFormData] = useState({});

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = () => {
		onSubmit(formData);
	};

	return (
		<div>
			{fields.map((field, index) => (
				<div key={index}>
					<CInput
						type={field.type}
						name={field.name}
						placeholder={field.placeholder}
						emitFunction={handleChange}
					/>
				</div>
			))}
			<CInput
				type='button'
				name='submit-button'
				value={submitButtonText}
				clickFunction={handleSubmit}
			/>
		</div>
	);
};
