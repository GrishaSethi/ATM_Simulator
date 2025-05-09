import React from 'react';

// Mock notifications. In real app, fetch from backend
const mockNotifications = [
  { id: 1, message: 'Your ATM card was used for a withdrawal of ₹500.', date: '2025-05-04 22:31' },
  { id: 2, message: 'Deposit of ₹2000 received.', date: '2025-05-03 11:05' },
  { id: 3, message: 'Low balance alert: Your account balance is below ₹1000.', date: '2025-05-02 08:10' },
];

export default function Notifications({ darkMode }) {
  return (
    <div style={{
      maxWidth: 480,
      margin: '0 auto',
      padding: 24,
      fontFamily: 'Segoe UI, Arial, sans-serif',
    }}>
      <h2 style={{ color: '#6366f1', marginBottom: 24 }}>Notifications & Alerts</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {mockNotifications.map(n => (
          <li key={n.id} style={{
            background: '#f3f6fd',
            borderRadius: 10,
            padding: 16,
            marginBottom: 14,
            boxShadow: '0 2px 8px rgba(80,90,180,0.08)'
          }}>
            <div style={{ fontWeight: 600 }}>{n.message}</div>
            <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{n.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
