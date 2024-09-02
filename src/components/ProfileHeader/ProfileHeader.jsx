import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/apiCalls';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import './ProfileHeader.css';
import { CInput } from '../../components/CInput/CInput';

const ProfileHeader = () => {
	const [user, setUser] = useState(null);
	const [editData, setEditData] = useState({});
	const [editing, setEditing] = useState(false);
	const [error, setError] = useState(null);
	const { token } = useAuth();

	useEffect(() => {
		const fetchUserProfile = async () => {
			if (!token) return;

			try {
				const response = await getProfile(token);
				if (response.success) {
					setUser(response.data);
					setEditData(response.data);
				} else {
					setError(response.message);
				}
			} catch (err) {
				setError('Error al cargar el perfil del usuario');
			}
		};

		fetchUserProfile();
	}, [token]);

	const editButtonHandler = () => {
		setEditing(!editing);
	};

	const editInputHandler = (e) => {
		setEditData({
			...editData,
			[e.target.name]: e.target.value,
		});
	};

    const confirmButtonHandler = async () => {
        try {
            const response = await updateProfile(editData, token);
            console.log(response); 
    
            if (response && response.success) {
                setUser(editData);
                setEditing(false);
            } else {
                setError(response ? response.message : 'Error desconocido');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError('Error al guardar los cambios');
        }
    };
    

	if (error) {
		return <div className='error-message'>{error}</div>;
	}

	if (!user) {
		return <div className='loading-message'>Cargando perfil...</div>;
	}

	const {
		first_name,
		last_name,
		user_name,
		profilePicture,
		coverPicture,
		about,
		followers,
		following,
	} = user;

	return (
		<div className='profile-header'>
			<div
				className='cover-photo'
				style={{ backgroundImage: `url(${coverPicture})` }}></div>
			<div className='profile-info'>
				<img
					className='profile-picture'
					src={profilePicture}
					alt={`${first_name} ${last_name}`}
				/>
				<div className='user-details'>
					{editing ? (
						<>
							<CInput
								type="text"
								name="first_name"
								placeholder="Nombre"
								value={editData.first_name}
								emitFunction={editInputHandler}
								className='edit-input'
							/>
							<CInput
								type="text"
								name="last_name"
								placeholder="Apellido"
								value={editData.last_name}
								emitFunction={editInputHandler}
								className='edit-input'
							/>
							<CInput
								type="text"
								name="user_name"
								placeholder="Username"
								value={editData.user_name}
								emitFunction={editInputHandler}
								className='edit-input'
							/>
							<CInput
								type="text"
								name="about"
								placeholder="Acerca de ti"
								value={editData.about}
								emitFunction={editInputHandler}
								className='edit-input'
							/>
						</>
					) : (
						<>
							<h1>{`${first_name} ${last_name}`}</h1>
							<p className='username'>@{user_name}</p>
							<p className='about'>{about}</p>
							<div className='stats'>
								<span>{followers.length} seguidores</span>
								<span>{following.length} siguiendo</span>
							</div>
						</>
					)}
				</div>
				<button
					className='button'
					onClick={editing ? confirmButtonHandler : editButtonHandler}>
					{editing ? 'Guardar' : 'Editar Perfil'}
				</button>
				{editing && (
					<button
						className='cancel-edit-btn'
						onClick={editButtonHandler}>
						Cancelar
					</button>
				)}
			</div>
		</div>
	);
};

export default ProfileHeader;
