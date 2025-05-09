import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CustomerDashboard from './components/CustomerDashboard';
import ProfilePage from './components/ProfilePage';
import Notifications from './components/Notifications';
import TransactionFilter from './components/TransactionFilter';
import AdminDashboard from './components/AdminDashboard';

function AppContent({ darkMode, setDarkMode }) {
  const location = useLocation();
  const showNav = !['/login', '/'].includes(location.pathname);

  return (
    <>
      {showNav && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 32,
          marginTop: 18
        }}>
          <nav style={{
            display: 'flex',
            gap: 28,
            background: darkMode ? '#232946' : '#f3f6fd',
            borderRadius: 18,
            boxShadow: '0 2px 12px rgba(80,90,180,0.10)',
            padding: '12px 32px',
            alignItems: 'center',
            minWidth: 400,
            border: darkMode ? '1px solid #232946' : '1px solid #e0e7ef',
            position: 'relative',
          }}>
            <a href="/customer/dashboard" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>Dashboard</a>
            <a href="/customer/profile" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>Profile</a>
            <a href="/customer/notifications" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>Notifications</a>
            <a href="/customer/transactions" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>Transactions</a>
            <button
              onClick={() => setDarkMode(dm => !dm)}
              style={{
                marginLeft: 28,
                background: darkMode ? '#6366f1' : '#e0e7ff',
                color: darkMode ? '#fff' : '#1d3557',
                border: 'none',
                borderRadius: 18,
                padding: '6px 18px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(80,90,180,0.09)',
                transition: 'background 0.3s, color 0.3s',
                fontSize: 15
              }}>
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </nav>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/customer/profile" element={<ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/customer/notifications" element={<Notifications darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/customer/transactions" element={<TransactionFilter darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/customer/*" element={<Navigate to="/customer/dashboard" />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = React.useState(() => {
    const saved = localStorage.getItem('atm_dark_mode');
    return saved === null ? false : saved === 'true';
  });
  React.useEffect(() => {
    localStorage.setItem('atm_dark_mode', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        background: darkMode ? 'linear-gradient(135deg, #22223b 0%, #232946 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        color: darkMode ? '#f4f4f4' : '#22223b',
        transition: 'background 0.3s, color 0.3s',
        fontFamily: 'Segoe UI, Arial, sans-serif',
      }}>
        <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </Router>
  );
}

export default App;
