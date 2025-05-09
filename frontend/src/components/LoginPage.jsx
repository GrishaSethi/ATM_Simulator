import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [passwrd, setPasswrd] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Professional project title for the portal
  const projectTitle = "ATM Simulator Portal";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/login', {
        username: username,
        password: passwrd
      });
      const user = res.data;
      if (user.Authorization === 'Customer') {
        navigate('/customer', { state: { user } });
      } else {
        navigate('/admin', { state: { user } });
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      padding: 0,
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: 32,
      }}>
        <span style={{ fontSize: 44, color: '#6366f1', verticalAlign: 'middle', marginRight: 8 }}>
          {/* ATM Icon */}
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="3" fill="#6366f1"/><rect x="6" y="10" width="12" height="4" rx="1" fill="#fff"/></svg>
        </span>
        <span style={{
          fontWeight: 800,
          fontSize: 32,
          color: '#1d3557',
          letterSpacing: 1,
          verticalAlign: 'middle',
        }}>{projectTitle}</span>
        <div style={{ color: '#64748b', fontSize: 15, marginTop: 6 }}>Secure access to your digital ATM experience</div>
      </div>
      <div style={{
        background: 'white',
        borderRadius: 16,
        boxShadow: '0 6px 32px rgba(80,90,180,0.11)',
        padding: '36px 28px 28px 28px',
        minWidth: 320,
        maxWidth: 360,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <span style={{ fontSize: 26, color: '#0e7490' }}>
            {/* Login Icon */}
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24"><path fill="#0e7490" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"/></svg>
          </span>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1d3557', marginTop: 2 }}>Sign In</div>
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{
              padding: 10,
              borderRadius: 8,
              border: '1px solid #e0e7ef',
              fontSize: 16,
              marginBottom: 2,
              outline: 'none',
              transition: 'border 0.2s',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={passwrd}
            onChange={e => setPasswrd(e.target.value)}
            required
            style={{
              padding: 10,
              borderRadius: 8,
              border: '1px solid #e0e7ef',
              fontSize: 16,
              marginBottom: 2,
              outline: 'none',
              transition: 'border 0.2s',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '10px 0',
              fontWeight: 700,
              fontSize: 17,
              cursor: 'pointer',
              marginTop: 8,
              boxShadow: '0 2px 8px rgba(80,90,180,0.09)'
            }}
          >
            Login
          </button>
        </form>
        {error && <div style={{ color: '#e63946', marginTop: 14, fontWeight: 600 }}>{error}</div>}
      </div>
      <div style={{ textAlign: 'center', color: '#64748b', fontSize: 13, marginTop: 38 }}>
        &copy; {new Date().getFullYear()} ATM Simulator Portal
      </div>
    </div>
  );
}

export default LoginPage;
