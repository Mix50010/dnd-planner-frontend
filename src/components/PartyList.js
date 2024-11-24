import React from 'react';
import PartyItem from './PartyItem';

const PartyList = ({ parties, onDelete, onUpdate }) => {
    return (
        <div className="party-list">
            <h2>Мои партии</h2>
            {parties.length === 0 ? (
                <p>Нет доступных партий.</p>
            ) : (
                parties.map((party, index) => (
                    <PartyItem
                        key={index}
                        party={party}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        index={index}
                    />
                ))
            )}
        </div>
    );
};

export default PartyList;
