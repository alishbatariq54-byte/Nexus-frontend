import React, { useState } from "react";

const TransferModal = ({ setShowModal }) => {
  const [amount, setAmount] = useState("");

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Transfer</h3>

        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={() => alert(`Sent $${amount}`)}>Send</button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default TransferModal;