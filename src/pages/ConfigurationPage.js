import React, { useState } from "react";
import Modal from "react-modal";
import ConfigurationWizard from "../components/ConfigurationWizard";

Modal.setAppElement("#root");

export default function Homepage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="open-modal">
      <p>Pritisnite gumb niže kako biste pokrenuli</p>
      <button onClick={() => setModalIsOpen(true)} className="start-button">
        Pokreni konfigurator
      </button>
      <Modal
        className="container"
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <button className="close-modal" onClick={() => setModalIsOpen(false)}>X</button>
        <ConfigurationWizard closeModal={() => setModalIsOpen(false)}/>
      </Modal>
    </div>
  );
}
