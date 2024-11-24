import React, { useState } from 'react';

const SignupForm = ({ onSignup, onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup({ email, username, password });
    };

    return (
        <div className="signup-form">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите ваш email"
                    required
                />

                <label htmlFor="username">Имя пользователя</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите имя пользователя"
                    required
                />

                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    required
                />

                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>
                Уже есть аккаунт?{' '}
                <button type="button" onClick={onSwitchToLogin}>
                    Войти
                </button>
            </p>
        </div>
    );
};

export default SignupForm;
