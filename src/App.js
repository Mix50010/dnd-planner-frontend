import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CreatePartyForm from './components/CreatePartyForm';
import PartyList from './components/PartyList';
import { fetchParties, createParty, deleteParty, updateParty } from './api/parties';
import { login, signup } from './api/auth';
import { getCurrentUser } from './api/user';

import './App.css';

const App = () => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [parties, setParties] = useState([]);
	const [isSignup, setIsSignup] = useState(false);

	useEffect(() => {
		if (token) {
			const loadParties = async () => {
				try {
					const currentUser = await getCurrentUser(token); // Получаем текущего пользователя
					const data = await fetchParties(token); // Загружаем все партии
					const userParties = data.filter((party) => party.creator_id === currentUser.id); // Фильтруем партии
					setParties(userParties);
				} catch (error) {
					console.error(error.message);
				}
			};
			loadParties();
		}
	}, [token]);
	

	const handleLogin = async (email, password) => {
		try {
			const response = await fetch('http://localhost:8000/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
	
			if (!response.ok) {
				if (response.status === 401) {
					alert('Неверный логин или пароль');
				} else {
					throw new Error('Ошибка авторизации');
				}
			} else {
				const data = await response.json();
				setToken(data.access_token); // Сохраняем токен
			}
		} catch (error) {
			console.error(error.message);
		}
	};
	

	const handleSignup = async (user) => {
		try {
			await signup(user);
			alert('Регистрация успешна! Войдите в систему.');
			setIsSignup(false); // Переключение на форму входа
		} catch (error) {
			alert(error.message);
		}
	};

	const handleCreateParty = async (party) => {
		try {
			const newParty = await createParty(party, token);
			setParties([...parties, newParty]);
		} catch (error) {
			console.error(error.message);
		}
	};

	// Функция для удаления партии
	const handleDeleteParty = (index, partyId) => {
		console.log(`Attempting to delete party with ID: ${partyId}, at index: ${index}`); // Логирование

		deleteParty(partyId, token)
			.then(() => {
				console.log(`Party with ID: ${partyId} successfully deleted`); // Успешное удаление
				setParties((prevParties) => prevParties.filter((_, i) => i !== index)); // Обновление состояния
			})
			.catch((error) => {
				console.error(`Error deleting party with ID: ${partyId}`, error); // Лог ошибок
			});
	};

	// Функция для обновления партии
	const handleUpdateParty = (index, updatedParty) => {
		console.log(`Attempting to update party with ID: ${updatedParty.id}, at index: ${index}`);
		console.log('Updated party data:', updatedParty); // Логирование

		updateParty(updatedParty.id, updatedParty, token)
			.then(() => {
				console.log(`Party with ID: ${updatedParty.id} successfully updated`); // Успешное обновление
				setParties((prevParties) =>
					prevParties.map((party) =>
						party.id === updatedParty.id ? { ...party, ...updatedParty } : party
					)
				);
			})
			.catch((error) => {
				console.error(`Error updating party with ID: ${updatedParty.id}`, error); // Лог ошибок
			});
	};

	return (
		<div className="container">
			{!token ? (
				isSignup ? (
					<SignupForm
						onSignup={handleSignup}
						onSwitchToLogin={() => setIsSignup(false)}
					/>
				) : (
					<LoginForm
						onLogin={handleLogin}
						onSwitchToSignup={() => setIsSignup(true)}
					/>
				)
			) : (
				<>
					<h1>Планировщик партий Dungeons & Dragons</h1>
					<CreatePartyForm onCreate={handleCreateParty} />
					<PartyList
						parties={parties}
						onDelete={handleDeleteParty} // Передаем функцию удаления
						onUpdate={handleUpdateParty} // Передаем функцию обновления
					/>

				</>
			)}
		</div>
	);
};

export default App;
