import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../../services/apiCalls';
import { CForm } from '../../../components/CForm/CForm';
import { validateCredentials } from '../../../utils/functions';

export const Register = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const registerFields = [
        { type: 'email', name: 'email', placeholder: 'Email' },
        { type: 'password', name: 'password', placeholder: 'Password' },
    ];

    const handleRegister = async (credentials) => {
        const isValid = validateCredentials(credentials);
        if (!isValid) {
            setErrors({
                email: 'Invalid email format',
                password: 'Password must be between 8 and 12 characters',
            });
            return;
        }

        try {
            const response = await RegisterUser(credentials);
            if (response.success) {
                alert('Registration successful! You can now log in.');
                navigate('/login');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <CForm
                fields={registerFields}
                onSubmit={handleRegister}
                submitButtonText="Register"
            />
            {errors.email && <p>{errors.email}</p>}
            {errors.password && <p>{errors.password}</p>}
        </div>
    );
};