import React from 'react';
import { Link } from 'react-router-dom';

// Cross-book participant profiles are parked for a future phase.
const ParticipantDetails: React.FC = () => {
  return (
    <div className="container">
      <Link to="/" className="button button-secondary">← Back to Dashboard</Link>
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <h1>Participant Profiles</h1>
        <p style={{ color: '#6c757d' }}>Coming soon — cross-book participant profiles are on the roadmap.</p>
      </div>
    </div>
  );
};

export default ParticipantDetails;
