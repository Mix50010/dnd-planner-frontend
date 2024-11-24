import React from 'react';

const PartyList = ({ parties, onDelete }) => {
    return (
		<div className="party-list">
			<h2>Мои партии</h2>
			{parties.length === 0 ? (
				<p>Нет доступных партий.</p>
			) : (
				parties.map((party, index) => (
					<div key={index} className="party">
						<h2>Название партии: {party.partyName}</h2>
						<p><strong>Дата и время:</strong> {party.partyDate}</p>
						<p><strong>Местоположение:</strong> {party.partyLocation}</p>
						<p><strong>Описание:</strong> {party.partyDescription}</p>
						<p><strong>Участники:</strong> {party.participants.join(', ')}</p>
						<div className="actions">
							<button onClick={() => onDelete(index)}>Удалить</button>
						</div>
					</div>
				))
			)}
		</div>
	);
	
};

export default PartyList;
