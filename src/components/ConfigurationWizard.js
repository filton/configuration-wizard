import React, { useState } from "react";
import CarSelection from "./CarSelection";
import CarServices from "./CarServices";
import ConfirmService from "./ConfirmService";
import ContactInfo from "./ContactInfo";
import Confirmation from "./Confirmation";

export default function ConfigurationWizard({ closeModal }) {
  const [configData, setConfigData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const updateConfigData = (data) => {
    console.log("New data:", data);
    setConfigData((currentData) => ({ ...currentData, ...data }));
  };

  const renderConfigComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CarSelection
            selectedItem={configData.car}
            onDataSelection={(data) => updateConfigData(data)}
          />
        );
      case 2:
        return (
          <CarServices
            selectedItems={configData.services}
            onDataSelection={(data) => updateConfigData(data)}
          />
        );
      case 3:
        return (
          <ContactInfo
            contactInfo={configData.contactInfo}
            onDataChange={(data) => updateConfigData(data)}
          />
        );
      case 4:
        return (
          <ConfirmService
            configData={configData}
            navToStep={(step) => setCurrentStep(step)}
          />
        );
      case 5:
        return <Confirmation closeModal={closeModal} />;
      default:
        return null;
    }
  };

  const enableNext = () => {
    switch (currentStep) {
      case 1:
        return !!configData.car;
      case 2:
        return configData.services && configData.services.length > 0;
      case 3:
        return (
          configData.contactInfo &&
          configData.contactInfo.name &&
          configData.contactInfo.email &&
          configData.contactInfo.phone
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  const next = () => {
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const prev = () => {
    setCurrentStep((currentStep) => currentStep - 1 || 1);
  };

  return (
    <div>
      <div className="header">
        <h3 className="title">Konfigurator servisa</h3>
      </div>

      {renderConfigComponent()}

      <div className="navbar">
        {currentStep > 1 && currentStep < 5 && (
          <button className="back" onClick={prev}>
            Nazad
          </button>
        )}
        {currentStep !== 5 && (
          <button
            className={`next ${!enableNext() ? "" : "disabled"}`}
            disabled={!enableNext()}
            onClick={next}
          >
            Dalje
          </button>
        )}
      </div>
    </div>
  );
}
