import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const { user, signup } = useAuth()
  const nav = useNavigate()

  React.useEffect(() => {
    if (user) nav('/')
  }, [user, nav])

  async function submit(e) {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')

    const result = await signup({ name, email, password })

    setSubmitting(false)

    if (result.error) {
      setErrorMsg(result.error.msg || result.error.message || 'Signup failed')
      return
    }

    nav('/')
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: '20px auto' }}>
      <h3>Create account</h3>
      <form onSubmit={submit}>
        <div className="form-row">
          <input
            placeholder="Full name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
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

        <button className="btn" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}
