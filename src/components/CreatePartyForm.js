import React, { useState } from 'react';

const CreatePartyForm = ({ onCreate }) => {
    const [partyName, setPartyName] = useState('');
    const [partyDate, setPartyDate] = useState('');
    const [partyLocation, setPartyLocation] = useState('');
    const [partyDescription, setPartyDescription] = useState('');
    const [participants, setParticipants] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newParty = {
            title: partyName,  // Изменено на 'title', как ожидает сервер
            date_time: partyDate,  // Убедись, что формат даты правильный
            platform: partyLocation,  // Используем 'platform', как указано на сервере
            description: partyDescription,
            invite_emails: participants.split(',').map(email => email.trim()),  // Переименовали в 'invite_emails'
        };

        onCreate(newParty); // Отправляем данные на сервер

        // Очистка полей формы
        setPartyName('');
        setPartyDate('');
        setPartyLocation('');
        setPartyDescription('');
        setParticipants('');
    };

    return (
        <form onSubmit={handleSubmit} className="party-form">
            <h2>Создать партию</h2>

            <label htmlFor="partyName">Название партии</label>
            <input
                type="text"
                id="partyName"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                placeholder="Введите название партии"
                required
            />

            <label htmlFor="partyDate">Дата и время</label>
            <input
                type="datetime-local"
                id="partyDate"
                value={partyDate}
                onChange={(e) => setPartyDate(e.target.value)}
                required
            />

            <label htmlFor="partyLocation">Местоположение</label>
            <input
                type="text"
                id="partyLocation"
                value={partyLocation}
                onChange={(e) => setPartyLocation(e.target.value)}
                placeholder="Введите местоположение (онлайн или оффлайн)"
                required
            />

            <label htmlFor="partyDescription">Описание</label>
            <textarea
                id="partyDescription"
                value={partyDescription}
                onChange={(e) => setPartyDescription(e.target.value)}
                placeholder="Введите описание партии"
            ></textarea>

            <label htmlFor="participants">Пригласить участников (email)</label>
            <input
                type="text"
                id="participants"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder="Введите email участников через запятую"
            />

            <button type="submit">Создать партию</button>
        </form>
    );
};

export default CreatePartyForm;
