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

    return (
        <div className="container">
            <h1>Планировщик партий Dungeons & Dragons</h1>
            <CreatePartyForm onCreate={handleCreateParty} />
            <PartyList parties={parties} onDelete={handleDeleteParty} />
        </div>
    );
};

export default App;
