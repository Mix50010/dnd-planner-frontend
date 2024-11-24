import React, { useState } from 'react';

const LoginForm = ({ onLogin, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="login-form">
            <h2>Вход</h2>
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

                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите ваш пароль"
                    required
                />

                <button type="submit">Войти</button>
            </form>
            <p>
                Еще нет аккаунта?{' '}
                <button type="button" onClick={onSwitchToSignup}>
                    Зарегистрироваться
                </button>
            </p>
        </div>
    );
};

export default LoginForm;
