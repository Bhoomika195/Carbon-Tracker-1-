import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const { user, login } = useAuth()
  const nav = useNavigate()

  React.useEffect(() => {
    if (user) nav('/')
  }, [user, nav])

  async function submit(e) {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')

    const result = await login({ email, password })

    setSubmitting(false)

    if (result.error) {
      setErrorMsg(result.error.msg || result.error.message || 'Login failed')
      return
    }

    nav('/')
  }

  return (
    <div className="card" style={{ maxWidth: 480, margin: '20px auto' }}>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div className="form-row">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && (
          <div className="error" style={{ color: 'red', marginBottom: 8 }}>
            {errorMsg}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Login'}
          </button>
          <Link
            to="/signup"
            style={{ alignSelf: 'center' }}
            className="muted"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  )
}
