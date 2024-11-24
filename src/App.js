import React, { useState } from 'react';
import CreatePartyForm from './components/CreatePartyForm';
import PartyList from './components/PartyList';
import './App.css';

const App = () => {
    const [parties, setParties] = useState([]);

    const handleCreateParty = (party) => {
        setParties([...parties, party]);
    };

    const handleDeleteParty = (index) => {
        setParties(parties.filter((_, i) => i !== index));
    };

    const handleUpdateParty = (index, updatedParty) => {
        setParties(
            parties.map((party, i) => (i === index ? updatedParty : party))
        );
    };

    return (
        <div className="container">
            <h1>Планировщик партий Dungeons & Dragons</h1>
            <CreatePartyForm onCreate={handleCreateParty} />
            <PartyList
                parties={parties}
                onDelete={handleDeleteParty}
                onUpdate={handleUpdateParty}
            />
        </div>
    );
};

export default App;
