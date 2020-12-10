import React from "react";

export default function CarSelection({ selectedItem, onDataSelection }) {
  const onChangeSelection = (e) => {
    onDataSelection({ car: e.target.value });
  };

  return (
    <div className="step">
      <h3 className="step-title">Korak 1. Odaberite proizvođača vašeg vozila</h3>
      <div className="step-car-selection">
        {cars.map(car => (
          <React.Fragment key={car}>
          <div>
            <input 
              type="radio" 
              value={car} 
              name="car-selection" 
              checked={selectedItem === car} 
              onChange={onChangeSelection}
            /> {car}
          </div>
          </React.Fragment>)
        )}
      </div>
    </div>
  );
}

const cars = ["Peugeot", "Volkswagen", "Citroen", "Audi", "Bmw", "Seat", "Alfa Romeo", "Kia", "Hyundai", "Honda", "Toyota"];
