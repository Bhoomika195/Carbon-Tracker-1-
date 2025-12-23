import React, { useState } from 'react'
import { calcTrip } from '../utils/calculations'
import Icon from './Icon'

export default function TripForm({ onAdd }){
  const [mode, setMode] = useState('car')
  const [distance, setDistance] = useState('')
  const [vehicle, setVehicle] = useState('petrol')
  const [tag, setTag] = useState('')
  const [note, setNote] = useState('')
  const [flightClass, setFlightClass] = useState('economy')
  const [longHaul, setLongHaul] = useState(false)
  const [error, setError] = useState('')

  function submit(e){
    e.preventDefault()
    setError('')
    const km = parseFloat(distance || 0)
    // validation: require positive distance for motorized modes
    if((mode === 'car' || mode === 'flight' || mode === 'train') && !(km > 0)){
      setError('Please enter a distance greater than 0 km for the selected mode.')
      return
    }
    const value = calcTrip({ mode, km, vehicle, flightClass, longHaul })
    const entry = { type: 'trip', mode, km, vehicle, flightClass, longHaul, co2: value, tag: tag || 'transport', note: note || '', date: new Date().toISOString() }
    onAdd(entry)
    setDistance('')
    setTag('')
    setNote('')
  }

  return (
    <div className="card">
      <h3>Trip Calculator</h3>
      <form onSubmit={submit}>
        <div className="form-row">
          <div className="input-with-icon">
            <Icon name={mode} className="input-icon" title={mode} size={16} />
            <select value={mode} onChange={e=>setMode(e.target.value)}>
              <option value="car">Car</option>
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="bike">Bicycle</option>
              <option value="walk">Walk</option>
            </select>
          </div>
          <input type="number" min="0" step="any" placeholder="Distance (km)" value={distance} onChange={e=>setDistance(e.target.value)} />
        </div>

        {mode==='car' && (
          <div className="form-row">
            <select value={vehicle} onChange={e=>setVehicle(e.target.value)}>
              <option value="petrol">Petrol car</option>
              <option value="diesel">Diesel car</option>
              <option value="ev">Electric (grid mix)</option>
            </select>
          </div>
        )}

        {mode==='flight' && (
          <div className="form-row">
            <select value={flightClass} onChange={e=>setFlightClass(e.target.value)}>
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
            <label style={{display:'flex',alignItems:'center',gap:8}}>
              <input type="checkbox" checked={longHaul} onChange={e=>setLongHaul(e.target.checked)} /> Long-haul
            </label>
          </div>
        )}

        <div className="form-row">
          <input placeholder="Tag (e.g., commute, business)" value={tag} onChange={e=>setTag(e.target.value)} />
        </div>
        <div className="form-row">
          <input placeholder="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button className="btn" disabled={!!error}>Add Trip</button>
      </form>
    </div>
  )
}
