import React from 'react';

const PartyItem = ({ party, onDelete, index }) => {
    return (
        <div className="party">
            <h2>Название партии: {party.partyName}</h2>
            <p><strong>Дата и время:</strong> {party.partyDate}</p>
            <p><strong>Местоположение:</strong> {party.partyLocation}</p>
            <p><strong>Описание:</strong> {party.partyDescription}</p>
            <p><strong>Участники:</strong> {party.participants.join(', ')}</p>
            <div className="actions">
                <button onClick={() => onDelete(index)}>Удалить</button>
            </div>
        </div>
    );
};

export default PartyItem;
