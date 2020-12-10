import React from "react";

export default function Confirmation({ closeModal }) {
  return (
    <div className="step-confirmation">
      <h3 className="step-title">Vaša prijava je uspješno poslana</h3>
      <div className="step-config">
        <p>Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas u najkraćem mogućem roku. Hvala vam.</p>
        <button onClick={closeModal} className="confirmation-button">Zatvori</button>        
      </div>
    </div>
  );
}
