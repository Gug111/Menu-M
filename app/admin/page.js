'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (email === 'admin@restaurant.com' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      sessionStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Wrong email or password / არასწორი მონაცემები');
    }
  }

  return (
    <main style={{
      minHeight: '100vh', background: '#F7F7F5',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '24px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '64px', height: '64px', background: '#1A3A2A',
          borderRadius: '20px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px'
        }}>
          🍽️
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 500, color: '#1A1A1A', margin: 0 }}>
          Admin Panel
        </h1>
        <p style={{ fontSize: '13px', color: '#9B9B97', marginTop: '4px' }}>
          Sign in to manage your menu
        </p>
        <p style={{ fontSize: '12px', color: '#9B9B97' }}>
          მენიუს სამართავად შედით
        </p>
      </div>

      <div style={{
        background: '#fff', border: '0.5px solid #EFEFED',
        borderRadius: '20px', padding: '28px 24px',
        width: '100%', maxWidth: '400px',
        display: 'flex', flexDirection: 'column', gap: '12px'
      }}>
        <input
          type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%', padding: '12px 16px', borderRadius: '12px',
            border: '0.5px solid #E8E8E4', background: '#F7F7F5',
            fontSize: '14px', color: '#1A1A1A', outline: 'none', fontFamily: 'inherit'
          }}
        />
        <input
          type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          style={{
            width: '100%', padding: '12px 16px', borderRadius: '12px',
            border: '0.5px solid #E8E8E4', background: '#F7F7F5',
            fontSize: '14px', color: '#1A1A1A', outline: 'none', fontFamily: 'inherit'
          }}
        />

        {error && (
          <p style={{ color: '#C03030', fontSize: '13px', textAlign: 'center', margin: 0 }}>
            {error}
          </p>
        )}

        <button onClick={handleLogin} style={{
          width: '100%', padding: '13px', borderRadius: '12px',
          border: 'none', background: '#1A3A2A', color: '#fff',
          fontSize: '15px', fontWeight: 500, cursor: 'pointer',
          fontFamily: 'inherit', marginTop: '4px'
        }}>
          Sign In / შესვლა
        </button>

        <p style={{ fontSize: '12px', color: '#9B9B97', textAlign: 'center', margin: 0 }}>
          Demo: admin@restaurant.com / admin123
        </p>
      </div>
    </main>
  );
}