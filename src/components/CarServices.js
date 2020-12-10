import React, { useEffect, useState } from "react";

const AVAILABLE_COUPONS = [
  {
    code: "Tokic123",
    percentage: 30
  }
];

export default function CarServices({ selectedItems, onDataSelection }) {
  const [hasCoupon, setHasCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(selectedItems && selectedItems.reduce((curr, i) => curr = curr + i.price, 0));
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [basePrice, setBasePrice] = useState(0);

  const selectedItemIds = selectedItems && selectedItems.map(i => i.id);

  useEffect(() => {
    let newPrice = selectedItems && selectedItems.reduce((curr, i) => curr = curr + i.price, 0);
    if (appliedCoupon) {
      setBasePrice(newPrice);
      const discount = newPrice * (appliedCoupon.percentage / 100);
      setDiscount(discount);
      newPrice = newPrice - discount;
    }
    setTotalPrice(newPrice);
  }, [selectedItems, selectedItemIds, appliedCoupon]);

  const onChangeSelection = (service) => {
    if (selectedItemIds && selectedItemIds.includes(service.id)) {
      selectedItems = selectedItems.filter(i => i.id !== service.id);
    } else {
      selectedItems = selectedItems || [];
      selectedItems.push(service);
    }

    let discountData = {};
    if (appliedCoupon) {
      discountData = {
        servicesDiscountPercentage: appliedCoupon.percentage,
        servicesDiscount: selectedItems.reduce((curr, i) => curr = curr + i.price, 0) * (appliedCoupon.percentage / 100)
      }
    }

    onDataSelection({ services: selectedItems, ...discountData });
  };

  const onCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCoupon = () => {
    const coupon = AVAILABLE_COUPONS.find(c => c.code === couponCode);
    if (coupon) {
      const discount = totalPrice * (coupon.percentage / 100);
      setDiscount(discount);
      setBasePrice(totalPrice);
      setTotalPrice(totalPrice - discount);
      setAppliedCoupon(coupon);
      onDataSelection({
        servicesDiscountPercentage: coupon.percentage,
        servicesDiscount: discount
      });
      setCouponMessage("Hvala vam, unijeli ste ispravan kod kupona");
    } else {
      setCouponMessage("Upisali ste krivi kod kupona");
    }
    setCouponCode("");
  };

  return (
    <div className="step">
      <h3 className="step-title">Korak 2. Odaberite jednu ili više usluga za koje ste</h3>
      <div className="step-car-services">
        {services.map(service => (
          <React.Fragment key={service.id}>
          <div>
            <input 
              type="checkbox" 
              name="car-services" 
              checked={!!(selectedItemIds && selectedItemIds.includes(service.id))}
              onChange={() => onChangeSelection(service)}
            /> {`${service.label} (${service.price}kn)`}
          </div>
          </React.Fragment>
        ))}
      </div>
      <div className="price-content">
        {totalPrice > 0 &&
          <div className="coupon">
            {!hasCoupon && 
              <a className="coupon-btn" onClick={() => setHasCoupon(true)}>Imam kupon</a>
              ||
              !discount && 
                <div>
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={onCouponCodeChange}
                />
                <button 
                  className="apply-coupon"
                  onClick={applyCoupon}
                  placeholder="Unesite kod kupona ovdje"
                >Primjeni</button>
              </div>
            }
            {couponMessage && <div>{couponMessage}</div>}
            {discount > 0 && 
              <div className="price-summary">
                <div className="base">OSNOVICA: {basePrice.toFixed(2)} KN</div>
                <div className="discount">Popust ({appliedCoupon.percentage}%): -{discount.toFixed(2)} KN</div>
              </div>
            }
          </div>
        }
      </div>
        <h2 className="total-price">UKUPNO: {(totalPrice || 0).toFixed(2)} KN</h2>
    </div>
  );
}

const services = [
  {
    id: 1,
    label: "Zamjena ulja i filtera",
    price: 500
  },
  {
    id: 2,
    label: "Promjena pakni",
    price: 450
  },
  {
    id: 3,
    label: "Promjena guma",
    price: 100
  },
  {
    id: 4,
    label: "Servis klima uređaja",
    price: 299
  },
  {
    id: 5,
    label: "Balansiranje guma",
    price: 50
  },
  {
    id: 6,
    label: "Zamjena ulja u kočnicama",
    price: 229
  }
]
