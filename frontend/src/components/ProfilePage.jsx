import React from 'react';

function ProfilePage({ darkMode = false, onDownloadStatement }) {
  // Mocked customer details (replace with backend data later)
  const customerDetails = {
    name: 'Grisha Sethi',
    accountNumber: '123456789012',
    branchId: 'BR001',
    accountCreated: '2023-08-15',
    email: 'grisha@email.com',
    phone: '+91-9876543210',
  };

  // ATM Service shortcuts (mock)
  const services = [
    { label: 'Change PIN', icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#6366f1" d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-7V7a6 6 0 1 0-12 0v3a6 6 0 1 0 12 0Zm-6 8a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"/></svg> },
    { label: 'Request Cheque Book', icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="#10b981"/><rect x="7" y="9" width="10" height="2" rx="1" fill="#fff"/><rect x="7" y="13" width="6" height="2" rx="1" fill="#fff"/></svg> },
    { label: 'Block Card', icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" fill="#e63946"/><rect x="7" y="13" width="10" height="2" rx="1" fill="#fff"/><path fill="#fff" d="M7 9h10v2H7z"/></svg> },
  ];
  const cardBg = darkMode ? '#232946' : 'white';
  const cardColor = darkMode ? '#f4f4f4' : '#1d3557';
  const secondary = darkMode ? '#a5b4fc' : '#6366f1';
  const serviceCardBg = darkMode ? '#282a36' : '#f8fafc';

  return (
    <div style={{
      maxWidth: 370,
      margin: '40px auto',
      padding: 24,
      background: cardBg,
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(60,60,120,0.13)',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: cardColor,
      transition: 'background 0.3s, color 0.3s'
    }}>
      <span style={{ fontSize: 48, color: secondary, marginBottom: 12 }}>
        {/* User Icon */}
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path fill={secondary} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"/></svg>
      </span>
      <div style={{ fontWeight: 700, fontSize: 22, color: cardColor, marginBottom: 10 }}>{customerDetails.name}</div>
      <div style={{ width: '100%', fontSize: 15, color: darkMode ? '#cbd5e1' : '#64748b', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        <div><b>Account #:</b> {customerDetails.accountNumber}</div>
        <div><b>Branch ID:</b> {customerDetails.branchId}</div>
        <div><b>Email:</b> {customerDetails.email}</div>
        <div><b>Phone:</b> {customerDetails.phone}</div>
        <div><b>Created:</b> {customerDetails.accountCreated}</div>
      </div>
      {/* ATM Services/Shortcuts */}
      <div style={{ width: '100%', marginTop: 6, marginBottom: 18 }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 10, color: secondary }}>ATM Services</div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          {services.map(s => (
            <div key={s.label} style={{
              background: serviceCardBg,
              borderRadius: 12,
              boxShadow: darkMode ? '0 2px 8px #181920' : '0 2px 8px #e0e7ef',
              padding: 16,
              minWidth: 90,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: cardColor,
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background 0.2s',
              marginBottom: 6
            }}
            onClick={() => alert(`${s.label} (mock action)`) }
            >
              <div style={{ marginBottom: 6 }}>{s.icon}</div>
              {s.label}
            </div>
          ))}
        </div>
      </div>
      {/* Download Statement */}
      <button
        onClick={onDownloadStatement || (() => alert('Download Statement (mock)'))}
        style={{
          background: secondary,
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 0',
          fontWeight: 700,
          fontSize: 16,
          cursor: 'pointer',
          marginTop: 8,
          width: '100%',
          boxShadow: '0 2px 8px rgba(80,90,180,0.09)'
        }}>
        Download Statement
      </button>
    </div>
  );
}

export default ProfilePage;
