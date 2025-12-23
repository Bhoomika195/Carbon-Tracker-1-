import React, { useState } from 'react'
import { calcWaste } from '../utils/calculations'
import Icon from './Icon'

export default function WasteForm({ onAdd }){
  const [kg, setKg] = useState('')
  const [tag, setTag] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function submit(e){
    e.preventDefault()
    setError('')
    const n = parseFloat(kg||0)
    if(!(n > 0)){
      setError('Please enter waste in kg per month greater than 0.')
      return
    }
    const value = calcWaste(n)
    const entry = { type:'waste', kg: n, co2: value, tag: tag || 'waste', note: note || '', date: new Date().toISOString() }
    onAdd(entry)
    setKg('')
    setTag('')
    setNote('')
  }

  return (
    <div className="card">
      <h3>Waste</h3>
      <form onSubmit={submit}>
        <div className="form-row">
          <div className="input-with-icon"><Icon name="waste" className="input-icon" title="waste" size={16} /><input type="number" min="0" step="any" placeholder="Kg per month" value={kg} onChange={e=>setKg(e.target.value)} /></div>
        </div>
        <div className="form-row">
          <input placeholder="Tag (e.g., recycling, landfill)" value={tag} onChange={e=>setTag(e.target.value)} />
        </div>
        <div className="form-row">
          <input placeholder="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button className="btn">Add Waste</button>
      </form>
    </div>
  )
}
