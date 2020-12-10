import React from "react";

export default function ContactInfo({ contactInfo = {}, onDataChange }) {
  const onInputChange = (e) => {

    onDataChange({contactInfo: {
      ...contactInfo,
      [e.target.name]: e.target.value
    }});
  };

  return (
    <div className="step">
      <h3 className="step-title">Korak 3. Vaši kontakt podaci</h3>
        <form className="step-contact-form">
          <input name="name" type="text" placeholder="Ime i prezime*" required value={contactInfo.name || ""} onChange={onInputChange}/>
          <input name="email" type="email" placeholder="Email adresa*" required value={contactInfo.email || ""} onChange={onInputChange}/>
          <input name="phone" type="number" placeholder="Broj telefona*" required value={contactInfo.phone || ""} onChange={onInputChange}/>
          <textarea name="note" placeholder="Napomena (opcionalno)" value={contactInfo.note || ""} onChange={onInputChange}></textarea>
        </form>
    </div>
  );
}
