const WalletCard = ({ balance }) => {
  return (
    <div className="card">
      <h3>Balance</h3>
      <h1>${balance}</h1>
    </div>
  );
};

export default WalletCard;