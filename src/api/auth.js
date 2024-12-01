import { API_BASE_URL } from '../api';

// Регистрация
export const signup = async (user) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        if (response.status === 400) {
            const errorData = await response.json(); // Распаковываем тело ответа
            throw new Error(errorData.detail); // Используем поле detail
        }
        throw new Error('Ошибка регистрации');
    }

    return response.json();
};


// Вход
export const login = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error('Ошибка авторизации');
    }
    return response.json();
};
