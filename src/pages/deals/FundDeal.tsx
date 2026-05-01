import React, { useState } from "react";

const FundDeal = () => {
  const [amount, setAmount] = useState("");

  const handleFund = () => {
    alert(`Investor funded $${amount} to Entrepreneur`);
  };

  return (
    <div>
      <h2>Fund Deal</h2>

      <input
        type="number"
        placeholder="Enter amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleFund}>Fund</button>
    </div>
  );
};

export default FundDeal;