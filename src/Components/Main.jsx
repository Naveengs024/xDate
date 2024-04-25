import React from 'react';

function WelcomeMessage({ userName }) {
  return (
    <div className="welcome-message">
      <h1>Welcome, {userName}!</h1>
      <p>Thank you for visiting our website. We're thrilled to have you here.</p>
    </div>
  );
}

export default WelcomeMessage;
