import React, { useState } from 'react';

const CreatePartyForm = ({ onCreate }) => {
    const [partyName, setPartyName] = useState('');
    const [partyDate, setPartyDate] = useState('');
    const [partyLocation, setPartyLocation] = useState('');
    const [partyDescription, setPartyDescription] = useState('');
    const [participantInput, setParticipantInput] = useState('');
    const [participants, setParticipants] = useState([]);

    const handleAddParticipant = () => {
        if (participantInput.trim()) {
            setParticipants([...participants, participantInput.trim()]);
            setParticipantInput('');
        }
    };

    const handleRemoveParticipant = (index) => {
        setParticipants(participants.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newParty = {
            title: partyName,
            date_time: partyDate,
            platform: partyLocation,
            description: partyDescription,
            invite_emails: participants,
        };
		console.log(newParty);
        onCreate(newParty);

        setPartyName('');
        setPartyDate('');
        setPartyLocation('');
        setPartyDescription('');
        setParticipants([]);
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

            <label htmlFor="participantInput">Добавить участника</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="email"
                    id="participantInput"
                    value={participantInput}
                    onChange={(e) => setParticipantInput(e.target.value)}
                    placeholder="Введите email участника"
                />
                <button type="button" onClick={handleAddParticipant}>
                    Добавить
                </button>
            </div>

            {participants.length > 0 && (
                <ul>
                    {participants.map((email, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            {email}
                            <button
                                type="button"
                                onClick={() => handleRemoveParticipant(index)}
                                style={{
                                    marginLeft: '10px',
                                    background: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '2px 5px',
                                }}
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <button type="submit">Создать партию</button>
        </form>
    );
};

export default CreatePartyForm;
