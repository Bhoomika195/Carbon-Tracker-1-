import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  async function handleLogout() {
    await logout()
  }

  return (
    <header className="site">
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: '#2b8aef',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
            }}
          >
            CT
          </div>
          <div>
            <h1 style={{ margin: 0 }}>Carbon Tracker</h1>
            <div className="muted">Track and reduce your emissions</div>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/" className="muted">
            Dashboard
          </Link>
          <Link to="/calculator" className="muted">
            Calculator
          </Link>
          <Link to="/history" className="muted">
            History
          </Link>
          <Link to="/profile" className="muted">
            Profile
          </Link>

          {user ? (
            <>
              <span className="muted">{user.email}</span>
              <button
                onClick={handleLogout}
                className="btn"
                style={{
                  padding: '4px 10px',
                  fontSize: '0.85rem',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="muted">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
