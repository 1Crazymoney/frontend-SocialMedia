const URL = 'http://localhost:4000/api'

export const RegisterUser = async (credentials) => {
	const request = await fetch(`${URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	const result = await request.json();
	return result;
};

export const LoginUser = async (credentials) => {
	const request = await fetch(`${URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	const result = await request.json();
	console.log(result);

	return result;
};