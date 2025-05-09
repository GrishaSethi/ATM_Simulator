import React from 'react';
import { Link } from 'react-router-dom';

function CustomerNav() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 18,
      padding: '12px 24px 0 24px',
      background: 'transparent',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontSize: 16,
    }}>
      <Link to="/customer/dashboard" style={{ textDecoration: 'none', color: '#1d3557', fontWeight: 600 }}>Dashboard</Link>
      <Link to="/customer/profile" style={{ textDecoration: 'none', color: '#6366f1', fontWeight: 600 }}>Profile</Link>
    </nav>
  );
}

export default CustomerNav;
