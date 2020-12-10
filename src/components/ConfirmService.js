import React from "react";

export default function ConfirmService({ configData = {}, navToStep }) {
  const onStepButtonClick = (step) => {
    navToStep(step);
  };

  let totalServicesPrice = configData.services.reduce((curr, s) => curr = curr + s.price, 0);
  if (configData.servicesDiscount) {
    totalServicesPrice = totalServicesPrice - configData.servicesDiscount;
  }

  return (
    <div className="step">
      <h3 className="step-title-confirm-service">Korak 4. Pregled i potvrda vašeg odabira</h3>
      <div className="step-info">Molimo vas da još jednom pregledate i potvrdite unesene podatke. Ukoliko želite promjeniti neki od podataka, možete pritisnuti gumb za uređivanje pored svake od kategorija. Kada ste provjerili i potvrdili ispravnosti svojih podataka pritisnite gumb pošalji na dnu, za slanje upita za servis.</div>
      <div className="step-confirm-service">
      <div className="car-summary">
          <h3>MODEL VOZILA</h3>
          <button onClick={() => onStepButtonClick(1)} className="confirm-service-button">Uredi</button>
          <p>{configData.car}</p>
        </div>
        <div className="services-summary">
          <h3>ODABRANE USLUGE</h3>
          <button onClick={() => onStepButtonClick(2)} className="confirm-service-button">Uredi</button>
          <ul>
            {configData.services.map(s => (
              <li key={s.id}>
                <div>{s.label}</div>
                <div>{s.price.toFixed(2)} KN</div>
              </li>
            ))}
          </ul>
          {configData.servicesDiscountPercentage && 
            <div className="services-summary-discount">POPUST ({configData.servicesDiscountPercentage}%): -{configData.servicesDiscount.toFixed(2)} KN</div>
          }
          <div className="services-summary-total">UKUPNO: {totalServicesPrice.toFixed(2)} KN</div>
        </div>
        <div className="contact-summary">
          <h3>KONTAKT PODACI</h3>
          <button onClick={() => onStepButtonClick(3)} className="confirm-service-button">Uredi</button>
          <div className="contact-summary-info">
            <div>Ime i prezime: {configData.contactInfo.name}</div>
            <div>Email adresa: {configData.contactInfo.email}</div>
            <div>Broj telefona: {configData.contactInfo.phone}</div>
            <div>Napomena: {configData.contactInfo.note}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
