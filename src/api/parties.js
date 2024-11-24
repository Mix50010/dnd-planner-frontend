import { API_BASE_URL } from '../api';

export const fetchParties = async (token) => {
    const response = await fetch(`${API_BASE_URL}/parties`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Не удалось загрузить список партий');
    }
    return response.json();
};

export const createParty = async (party, token) => {
    const response = await fetch(`${API_BASE_URL}/parties`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(party),
    });
    if (!response.ok) {
        throw new Error('Ошибка при создании партии');
    }
    return response.json();
};

export const deleteParty = async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/parties/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Ошибка при удалении партии');
    }
};

export const updateParty = async (id, party, token) => {
    const response = await fetch(`${API_BASE_URL}/parties/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(party),
    });
    if (!response.ok) {
        throw new Error('Ошибка при обновлении партии');
    }
    return response.json();
};

