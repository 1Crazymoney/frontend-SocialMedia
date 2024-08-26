import React from 'react';
import { createContext } from 'react';
import { useAuthorization } from './AuthContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const auth = useAuthorization();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
