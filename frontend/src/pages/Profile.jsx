import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { loadSettings, saveSettings } from '../utils/storage'

export default function Profile(){
  const { user, logout } = useAuth()
  const settings = loadSettings()
  const [goal, setGoal] = useState(settings.annualGoal || '')

  if(!user) return <div className="card"><div className="muted">Not signed in</div></div>

  function save(){
    const s = {...settings, annualGoal: parseFloat(goal)||0}
    saveSettings(s)
    alert('Saved')
  }

  return (
    <div className="card" style={{maxWidth:640}}>
      <h3>Profile</h3>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div style={{marginTop:12}}>
        <label className="muted">Annual goal (kg CO2):</label>
        <div className="form-row">
          <input value={goal} onChange={e=>setGoal(e.target.value)} placeholder="e.g. 2000" />
          <button className="btn" onClick={save}>Save</button>
        </div>
      </div>
      <div style={{marginTop:12}}>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
