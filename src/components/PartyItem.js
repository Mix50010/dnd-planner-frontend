import React, { useState } from 'react';

const PartyItem = ({ party, onDelete, onUpdate, index }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Копируем исходные данные партии для редактирования
    const [editedParty, setEditedParty] = useState({
        title: party.title,
        date_time: party.date_time,
        platform: party.platform,
        description: party.description,
        attendees: party.attendees || [], // Участники — массив, если нет данных, пустой массив
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedParty({ ...editedParty, [name]: value });
    };

    const handleSave = () => {
        // Преобразуем структуру редактируемой партии обратно в формат сервера
        const updatedParty = {
            title: editedParty.title,
            date_time: editedParty.date_time,
            platform: editedParty.platform,
            description: editedParty.description,
            attendees: editedParty.attendees,
        };
        onUpdate(index, updatedParty);
        setIsEditing(false);
    };

    return (
        <div className="party">
            {isEditing ? (
                <div>
                    <label>Название:</label>
                    <input
                        type="text"
                        name="title"
                        value={editedParty.title}
                        onChange={handleInputChange}
                    />
                    <label>Дата и время:</label>
                    <input
                        type="datetime-local"
                        name="date_time"
                        value={editedParty.date_time}
                        onChange={handleInputChange}
                    />
                    <label>Местоположение:</label>
                    <input
                        type="text"
                        name="platform"
                        value={editedParty.platform}
                        onChange={handleInputChange}
                    />
                    <label>Описание:</label>
                    <textarea
                        name="description"
                        value={editedParty.description}
                        onChange={handleInputChange}
                    ></textarea>
                    <label>Участники:</label>
                    <input
                        type="text"
                        name="attendees"
                        value={editedParty.attendees.join(', ')}
                        onChange={(e) =>
                            setEditedParty({
                                ...editedParty,
                                attendees: e.target.value.split(',').map((p) => p.trim()),
                            })
                        }
                    />
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={() => setIsEditing(false)}>Отмена</button>
                </div>
            ) : (
                <div>
                    <h2>Название партии: {party.title}</h2>
                    <p><strong>Дата и время:</strong> {party.date_time}</p>
                    <p><strong>Местоположение:</strong> {party.platform}</p>
                    <p><strong>Описание:</strong> {party.description}</p>
                    <p><strong>Участники:</strong> 
                        {party.attendees.length > 0
                            ? party.attendees.join(', ')
                            : 'Нет участников'}
                    </p>
                    <div className="actions">
                        <button onClick={() => setIsEditing(true)}>Редактировать</button>
                        <button onClick={() => onDelete(index, party.id)}>Удалить</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartyItem;
