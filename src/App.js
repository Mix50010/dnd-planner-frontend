import React, { useState, useEffect } from 'react';
import CreatePartyForm from './components/CreatePartyForm';
import PartyList from './components/PartyList';
import { fetchParties, createParty, deleteParty, updateParty } from './api/parties';
import { login, signup } from './api/auth';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [parties, setParties] = useState([]);

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
            const { access_token } = await login({ email, password });
            setToken(access_token);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSignup = async (user) => {
        try {
            await signup(user);
            alert('Регистрация успешна! Войдите в систему.');
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
                <div>
                    <h1>Авторизация</h1>
                    {/* Компонент для входа */}
                </div>
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
