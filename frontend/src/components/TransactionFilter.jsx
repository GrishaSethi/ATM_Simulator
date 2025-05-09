import React, { useState } from 'react';

// Mock transactions. In real app, fetch from backend
const mockTransactions = [
  { id: 1, type: 'Deposit', amount: 2000, date: '2025-05-01' },
  { id: 2, type: 'Withdraw', amount: 500, date: '2025-05-03' },
  { id: 3, type: 'Deposit', amount: 1000, date: '2025-05-04' },
  { id: 4, type: 'Withdraw', amount: 1500, date: '2025-05-04' },
  { id: 5, type: 'Deposit', amount: 500, date: '2025-05-05' },
];

export default function TransactionFilter({ darkMode }) {
  const [type, setType] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filtered = mockTransactions.filter(tx => {
    if (type && tx.type !== type) return false;
    if (minAmount && tx.amount < parseInt(minAmount)) return false;
    if (maxAmount && tx.amount > parseInt(maxAmount)) return false;
    if (fromDate && tx.date < fromDate) return false;
    if (toDate && tx.date > toDate) return false;
    return true;
  });

  return (
    <div style={{
      maxWidth: 540,
      margin: '0 auto',
      padding: 24,
      fontFamily: 'Segoe UI, Arial, sans-serif',
    }}>
      <h2 style={{ color: '#6366f1', marginBottom: 24 }}>Transaction Filters & Search</h2>
      <form style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <select value={type} onChange={e => setType(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #e0e7ef', minWidth: 120 }}>
          <option value="">All Types</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
        </select>
        <input type="number" placeholder="Min Amount" value={minAmount} onChange={e => setMinAmount(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #e0e7ef', minWidth: 120 }} />
        <input type="number" placeholder="Max Amount" value={maxAmount} onChange={e => setMaxAmount(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #e0e7ef', minWidth: 120 }} />
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #e0e7ef' }} />
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #e0e7ef' }} />
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
        <thead>
          <tr style={{ color: '#64748b', fontWeight: 500 }}>
            <th style={{ textAlign: 'left', padding: '4px 8px' }}>Date</th>
            <th style={{ textAlign: 'left', padding: '4px 8px' }}>Type</th>
            <th style={{ textAlign: 'left', padding: '4px 8px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan={3} style={{ color: '#e63946', textAlign: 'center', padding: 16 }}>No transactions found.</td></tr>
          )}
          {filtered.map(tx => (
            <tr key={tx.id}>
              <td style={{ padding: '4px 8px' }}>{tx.date}</td>
              <td style={{ padding: '4px 8px', color: tx.type === 'Deposit' ? '#10b981' : '#e63946', fontWeight: 600 }}>{tx.type}</td>
              <td style={{ padding: '4px 8px' }}>₹ {tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
