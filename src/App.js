import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CreatePartyForm from './components/CreatePartyForm';
import PartyList from './components/PartyList';
import { fetchParties, createParty, deleteParty, updateParty } from './api/parties';
import { login, signup } from './api/auth';
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
                    const data = await fetchParties(token);
                    setParties(data);
                } catch (error) {
                    console.error(error.message);
                }
            };
            loadParties();
        }
    }, [token]);

	const handleLogin = async (email, password) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
				{
					method: 'POST',
				}
			);
	
			if (!response.ok) {
				if (response.status === 401) {
					// Если статус 401, показываем ошибку
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
            console.error(error.message);
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
                        onDelete={(index) => deleteParty(index, token)}
                        onUpdate={(index, updatedParty) => updateParty(index, updatedParty, token)}
                    />
                </>
            )}
        </div>
    );
};

export default App;
