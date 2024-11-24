import React, { useState } from 'react';

const PartyItem = ({ party, onDelete, onUpdate, index }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedParty, setEditedParty] = useState({ ...party });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedParty({ ...editedParty, [name]: value });
    };

    const handleSave = () => {
        onUpdate(index, editedParty);
        setIsEditing(false);
    };

    return (
        <div className="party">
            {isEditing ? (
                <div>
                    <label>Название:</label>
                    <input
                        type="text"
                        name="partyName"
                        value={editedParty.partyName}
                        onChange={handleInputChange}
                    />
                    <label>Дата и время:</label>
                    <input
                        type="datetime-local"
                        name="partyDate"
                        value={editedParty.partyDate}
                        onChange={handleInputChange}
                    />
                    <label>Местоположение:</label>
                    <input
                        type="text"
                        name="partyLocation"
                        value={editedParty.partyLocation}
                        onChange={handleInputChange}
                    />
                    <label>Описание:</label>
                    <textarea
                        name="partyDescription"
                        value={editedParty.partyDescription}
                        onChange={handleInputChange}
                    ></textarea>
                    <label>Участники:</label>
                    <input
                        type="text"
                        name="participants"
                        value={editedParty.participants.join(', ')}
                        onChange={(e) =>
                            setEditedParty({
                                ...editedParty,
                                participants: e.target.value.split(',').map((p) => p.trim()),
                            })
                        }
                    />
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={() => setIsEditing(false)}>Отмена</button>
                </div>
            ) : (
                <div>
                    <h2>Название партии: {party.partyName}</h2>
                    <p><strong>Дата и время:</strong> {party.partyDate}</p>
                    <p><strong>Местоположение:</strong> {party.partyLocation}</p>
                    <p><strong>Описание:</strong> {party.partyDescription}</p>
                    <p><strong>Участники:</strong> {party.participants.join(', ')}</p>
                    <div className="actions">
                        <button onClick={() => setIsEditing(true)}>Редактировать</button>
                        <button onClick={() => onDelete(index)}>Удалить</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartyItem;
