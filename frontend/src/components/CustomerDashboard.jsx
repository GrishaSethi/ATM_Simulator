import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, Paper } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Grid from '@mui/material/Grid';

// Sound effect imports (use public URLs for now)
const CARD_SOUND = 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae6b2.mp3'; // Card insert
const CASH_SOUND = 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae6b2.mp3'; // Cash dispense (placeholder)
const BUTTON_SOUND = 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae6b2.mp3'; // Button click (placeholder)

function CustomerDashboard({ darkMode, setDarkMode }) {
  // Dark mode state


  // Personalized welcome and mock info
  const userName = 'Grisha Sethi';
  const lastLogin = '2025-05-04 22:30';
  const [balance, setBalance] = useState(5000);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Deposit', amount: 2000, date: '2025-05-01' },
    { id: 2, type: 'Withdraw', amount: 500, date: '2025-05-03' },
    { id: 3, type: 'Deposit', amount: 1000, date: '2025-05-04' },
  ]);
  const [message, setMessage] = useState('');

  // Last transaction summary
  const lastTx = transactions[0];

  // Animation states
  const [cardInserted, setCardInserted] = useState(false);
  const [cashDispensed, setCashDispensed] = useState(false);

  // Play sound helper
  const playSound = (url) => {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play();
  };

  // For logo glow animation
  const logoGlowKeyframes = `
    @keyframes logoGlow {
      0% { box-shadow: 0 0 8px #6366f1, 0 0 0 #fff0; }
      50% { box-shadow: 0 0 32px #6366f1, 0 0 16px #fff8; }
      100% { box-shadow: 0 0 8px #6366f1, 0 0 0 #fff0; }
    }
  `;
  // For animated screen reflection
  const screenReflectionKeyframes = `
    @keyframes screenReflection {
      0% { left: -60%; opacity: 0.1; }
      20% { left: 110%; opacity: 0.18; }
      100% { left: 110%; opacity: 0; }
    }
  `;
  // Inject keyframes into the document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = logoGlowKeyframes + screenReflectionKeyframes;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Card slides in on mount
  useEffect(() => {
    setTimeout(() => {
      setCardInserted(true);
      playSound(CARD_SOUND);
    }, 400);
  }, []);

  // Cash slides out on successful withdrawal
  useEffect(() => {
    if (message === 'Withdrawal successful!') {
      setCashDispensed(true);
      playSound(CASH_SOUND);
      setTimeout(() => setCashDispensed(false), 1800);
    }
  }, [message]);

  // Download statement as CSV
  const downloadStatement = () => {
    const csv = [
      ['Date', 'Type', 'Amount'],
      ...transactions.map(t => [t.date, t.type, t.amount])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'statement.csv';
    a.click();
    URL.revokeObjectURL(url);
  };


  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseInt(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage('Enter a valid amount.');
      return;
    }
    if (amount > balance) {
      setMessage('Insufficient funds.');
      return;
    }
    setBalance(balance - amount);
    setTransactions([
      { id: transactions.length + 1, type: 'Withdraw', amount, date: new Date().toISOString().slice(0, 10) },
      ...transactions,
    ]);
    setMessage('Withdrawal successful!');
    setWithdrawAmount('');
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseInt(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage('Enter a valid amount.');
      return;
    }
    setBalance(balance + amount);
    setTransactions([
      { id: transactions.length + 1, type: 'Deposit', amount, date: new Date().toISOString().slice(0, 10) },
      ...transactions,
    ]);
    setMessage('Deposit successful!');
    setDepositAmount('');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #b0b4bb 0%, #e0e7ef 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      py: 6,
    }}>
      {/* ATM Frame */}
      <Box sx={{
        width: 540,
        borderRadius: '28px',
        boxShadow: '0 16px 64px 12px #8888aa55',
        background: 'linear-gradient(160deg, #e0e7ef 60%, #b0b4bb 100%)',
        border: '8px solid #b0b4bb',
        p: 0,
        position: 'relative',
        overflow: 'visible',
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        {/* BANK LOGO with animated glow */}
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 2,
          pb: 1,
          position: 'relative',
          zIndex: 10,
        }}>
          <Box sx={{
            width: 120,
            height: 38,
            background: 'linear-gradient(90deg, #232946 60%, #6366f1 100%)',
            borderRadius: '12px',
            boxShadow: '0 2px 12px #23294655',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #b0b4bb',
            animation: 'logoGlow 2.5s infinite',
          }}>
            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 22, letterSpacing: 2, fontFamily: 'Segoe UI, Arial, sans-serif' }}>
              BANK
            </Typography>
          </Box>
        </Box>
        {/* Card Slot - animated, 3D */}
        <Box sx={{
          position: 'absolute',
          left: -48,
          top: 80,
          width: 44,
          height: 90,
          background: 'linear-gradient(90deg, #232946 60%, #6366f1 100%)',
          borderRadius: '12px 0 0 12px',
          boxShadow: '4px 0 16px #23294644',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
          border: '2px solid #b0b4bb',
          overflow: 'hidden',
          perspective: 400,
        }}>
          <CreditCardIcon sx={{
            color: cardInserted ? '#fff' : '#fff8',
            fontSize: 36,
            position: 'relative',
            left: cardInserted ? 0 : -60,
            transition: 'left 0.8s cubic-bezier(.77,0,.18,1), transform 0.5s cubic-bezier(.77,0,.18,1)',
            filter: cardInserted ? 'drop-shadow(0 0 8px #6366f1)' : 'none',
            transform: cardInserted ? 'rotateY(0deg) scale(1)' : 'rotateY(-60deg) scale(0.8)',
          }} />
        </Box>
        {/* Side Buttons (left/right) - adjust for new width */}
        <Box sx={{ position: 'absolute', left: 0, top: 170, height: 240, width: 0, zIndex: 2 }}>
          {[...Array(4)].map((_, i) => (
            <Box key={i} sx={{
              position: 'absolute',
              left: -22,
              top: 18 + i * 56,
              width: 20,
              height: 32,
              background: 'linear-gradient(90deg, #b0b4bb 60%, #e0e7ef 100%)',
              borderRadius: '12px 0 0 12px',
              boxShadow: '2px 0 8px #23294622',
            }} />
          ))}
        </Box>
        <Box sx={{ position: 'absolute', right: 0, top: 170, height: 240, width: 0, zIndex: 2 }}>
          {[...Array(4)].map((_, i) => (
            <Box key={i} sx={{
              position: 'absolute',
              right: -22,
              top: 18 + i * 56,
              width: 20,
              height: 32,
              background: 'linear-gradient(270deg, #b0b4bb 60%, #e0e7ef 100%)',
              borderRadius: '0 12px 12px 0',
              boxShadow: '-2px 0 8px #23294622',
            }} />
          ))}
        </Box>
        {/* ATM Screen Area - wider, glassy/3D, with animated reflection */}
        <Box sx={{
          background: 'linear-gradient(120deg, #232946 80%, #6366f1 100%)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px #23294688, 0 2px 24px #fff4 inset',
          width: 420,
          mx: 'auto',
          mt: 8,
          mb: 3,
          p: 0,
          position: 'relative',
          zIndex: 1,
          border: '3px solid #b0b4bb',
          overflow: 'hidden',
        }}>
          {/* Animated screen reflection */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: '-60%',
            width: '60%',
            height: '100%',
            background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.01) 100%)',
            pointerEvents: 'none',
            zIndex: 10,
            animation: 'screenReflection 3.5s linear infinite',
          }} />
          <Paper elevation={0} sx={{
            width: '100%',
            borderRadius: '20px',
            background: 'rgba(244,246,251,0.97)',
            boxShadow: '0 2px 12px #23294622',
            p: 0,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <Box sx={{ background: '#e0e7ff', p: 2, textAlign: 'center', borderBottom: '2px solid #6366f1', borderRadius: '20px 20px 0 0' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#6366f1', letterSpacing: 1, mb: 0.5, fontFamily: 'Digital-7, monospace' }}>
                ATM Simulator
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontFamily: 'Digital-7, monospace' }}>
                Welcome, {userName}!<br />Last login: {lastLogin}
              </Typography>
            </Box>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AccountBalanceWalletIcon sx={{ color: '#0e7490', fontSize: 32 }} />
                <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 500, fontFamily: 'Digital-7, monospace' }}>Balance</Typography>
                <Typography variant="h5" sx={{ fontFamily: 'Digital-7, monospace', color: '#0e7490', fontWeight: 700, ml: 1 }}>
                  ₹ {balance}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
                {/* Withdraw */}
                <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <TextField
                    type="number"
                    label="Withdraw"
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1, width: 120, background: '#fff', borderRadius: 1 }}
                    InputProps={{ startAdornment: <ArrowDownwardIcon sx={{ color: '#e63946' }} /> }}
                  />
                  <Button type="submit" variant="contained" color="error" size="small" sx={{ fontWeight: 600, borderRadius: 2 }}>
                    Withdraw
                  </Button>
                </form>
                {/* Deposit */}
                <form onSubmit={handleDeposit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <TextField
                    type="number"
                    label="Deposit"
                    value={depositAmount}
                    onChange={e => setDepositAmount(e.target.value)}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1, width: 120, background: '#fff', borderRadius: 1 }}
                    InputProps={{ startAdornment: <ArrowUpwardIcon sx={{ color: '#10b981' }} /> }}
                  />
                  <Button type="submit" variant="contained" color="success" size="small" sx={{ fontWeight: 600, borderRadius: 2 }}>
                    Deposit
                  </Button>
                </form>
              </Box>
              {message && <Typography sx={{ color: '#0e7490', fontWeight: 600, mt: 1, fontFamily: 'Digital-7, monospace' }}>{message}</Typography>}
              <Box sx={{ mt: 2, width: '100%' }}>
                <Typography variant="subtitle2" sx={{ color: '#6366f1', fontWeight: 600, mb: 1, textAlign: 'center', fontFamily: 'Digital-7, monospace' }}>
                  Transaction History
                </Typography>
                <Box sx={{ maxHeight: 140, overflowY: 'auto', borderRadius: 1, background: '#fff', p: 1, boxShadow: 1 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, fontFamily: 'Digital-7, monospace' }}>
                    <thead>
                      <tr style={{ color: '#64748b', fontWeight: 500 }}>
                        <th style={{ textAlign: 'left', padding: '2px 6px' }}>Date</th>
                        <th style={{ textAlign: 'left', padding: '2px 6px' }}>Type</th>
                        <th style={{ textAlign: 'left', padding: '2px 6px' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(tx => (
                        <tr key={tx.id}>
                          <td style={{ padding: '2px 6px' }}>{tx.date}</td>
                          <td style={{ padding: '2px 6px', color: tx.type === 'Deposit' ? '#10b981' : '#e63946', fontWeight: 600 }}>{tx.type}</td>
                          <td style={{ padding: '2px 6px' }}>₹ {tx.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </Box>
              <Button onClick={downloadStatement} variant="outlined" color="primary" sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}>
                Download Statement
              </Button>
            </CardContent>
          </Paper>
        </Box>
        {/* Cash Slot - animated, 3D */}
        <Box sx={{
          position: 'absolute',
          left: '50%',
          bottom: -48,
          transform: 'translateX(-50%)',
          width: 180,
          height: 36,
          background: 'linear-gradient(180deg, #232946 60%, #10b981 100%)',
          borderRadius: '0 0 18px 18px',
          boxShadow: '0 8px 24px #23294644',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
          border: '2px solid #b0b4bb',
          overflow: 'hidden',
          perspective: 400,
        }}>
          <AccountBalanceWalletIcon sx={{
            color: '#fff',
            fontSize: 40,
            position: 'relative',
            top: cashDispensed ? -36 : 0,
            opacity: cashDispensed ? 1 : 0.85,
            transition: 'top 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)',
            filter: cashDispensed ? 'drop-shadow(0 0 12px #10b981)' : 'none',
            transform: cashDispensed ? 'rotateX(25deg) scale(1.1)' : 'rotateX(0deg) scale(1)',
          }} />
        </Box>
        {/* Keypad - 3D press effect and sound */}
        <Box sx={{
          width: 260,
          mx: 'auto',
          mt: 3,
          mb: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          justifyItems: 'center',
          alignItems: 'center',
          background: 'linear-gradient(120deg, #b0b4bb 60%, #e0e7ef 100%)',
          borderRadius: 3,
          boxShadow: '0 2px 8px #23294622',
          p: 2,
        }}>
          {[1,2,3,4,5,6,7,8,9,'',0,''].map((n, i) => (
            <Box key={i} sx={{
              width: 48,
              height: 48,
              background: n === '' ? 'transparent' : 'linear-gradient(120deg, #e0e7ef 60%, #b0b4bb 100%)',
              borderRadius: '12px',
              boxShadow: n === '' ? 'none' : '0 1px 4px #23294622',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 22,
              color: '#232946',
              fontFamily: 'Digital-7, monospace',
              cursor: n === '' ? 'default' : 'pointer',
              transition: 'box-shadow 0.2s, transform 0.2s',
              '&:active': n === '' ? {} : {
                boxShadow: '0 0 0 #23294622',
                transform: 'translateY(2px) scale(0.96)',
              },
            }}
            onClick={() => { if(n !== '') playSound(BUTTON_SOUND); }}
            >{n}</Box>
          ))}
        </Box>
        <Typography sx={{ color: '#64748b', fontSize: 15, mt: 2, mb: 1, textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} ATM Simulator
        </Typography>
      </Box>
    </Box>
  );
}

export default CustomerDashboard;
