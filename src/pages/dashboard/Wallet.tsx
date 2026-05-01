import React, { useState } from "react";
import WalletCard from "../../components/ui/WalletCard";
import TransactionTable from "../../components/ui/TransactionTable";
import TransferModal from "../../components/ui/TransferModal";

const Wallet = () => {
  const [balance, setBalance] = useState(8000);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard-container">
      <h2>Wallet</h2>

      <WalletCard balance={balance} />

      <div className="actions">
        <button onClick={() => setBalance(balance + 1000)}>Deposit</button>
        <button onClick={() => setBalance(balance - 500)}>Withdraw</button>
        <button onClick={() => setShowModal(true)}>Transfer</button>
      </div>

      <TransactionTable />

      {showModal && <TransferModal setShowModal={setShowModal} />}
    </div>
  );
};

export default Wallet;