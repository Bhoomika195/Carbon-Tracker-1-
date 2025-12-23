import React, { useState } from 'react'
import { calcEnergy } from '../utils/calculations'
import Icon from './Icon'

export default function EnergyForm({ onAdd }){
  const [kwh, setKwh] = useState('')
  const [tag, setTag] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function submit(e){
    e.preventDefault()
    setError('')
    const n = parseFloat(kwh || 0)
    if(!(n > 0)){
      setError('Please enter a monthly kWh value greater than 0.')
      return
    }
    const value = calcEnergy(n)
    const entry = { type:'energy', kwh: n, co2: value, tag: tag || 'home', note: note || '', date: new Date().toISOString() }
    onAdd(entry)
    setKwh('')
    setTag('')
    setNote('')
  }

  return (
    <div className="card">
      <h3>Home Energy</h3>
      <form onSubmit={submit}>
        <div className="form-row">
          <div className="input-with-icon"><Icon name="energy" className="input-icon" title="energy" size={16} /><input type="number" min="0" step="any" placeholder="Monthly kWh" value={kwh} onChange={e=>setKwh(e.target.value)} /></div>
        </div>
        <div className="form-row">
          <input placeholder="Tag (e.g., heating, appliances)" value={tag} onChange={e=>setTag(e.target.value)} />
        </div>
        <div className="form-row">
          <input placeholder="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button className="btn">Add Energy Use</button>
      </form>
    </div>
  )
}
