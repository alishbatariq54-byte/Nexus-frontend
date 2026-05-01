import { transactions } from "../../data/transactions";

const TransactionTable = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, i) => (
          <tr key={i}>
            <td>${t.amount}</td>
            <td>{t.sender}</td>
            <td>{t.receiver}</td>
            <td>{t.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;