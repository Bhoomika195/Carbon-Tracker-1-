import React, { useState } from 'react'
import { calcDiet } from '../utils/calculations'
import Icon from './Icon'

export default function DietForm({ onAdd }){
  const [diet, setDiet] = useState('omnivore')
  const [mealsPerDay, setMealsPerDay] = useState('2')
  const [tag, setTag] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function submit(e){
    e.preventDefault()
    setError('')
    const m = parseFloat(mealsPerDay||0)
    if(!(m > 0)){
      setError('Please enter meals per day greater than 0.')
      return
    }
    const value = calcDiet({ diet, mealsPerDay: m })
    const entry = { type:'diet', diet, mealsPerDay: parseFloat(mealsPerDay||0), co2: value, tag: tag || 'food', note: note || '', date: new Date().toISOString() }
    onAdd(entry)
    setMealsPerDay('')
    setTag('')
    setNote('')
  }

  return (
    <div className="card">
      <h3>Diet</h3>
      <form onSubmit={submit}>
        <div className="form-row">
          <div className="input-with-icon"><Icon name="diet" className="input-icon" title="diet" size={16} />
            <select value={diet} onChange={e=>setDiet(e.target.value)}>
              <option value="omnivore">Omnivore</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
          <input type="number" min="0" step="any" placeholder="Meals per day" value={mealsPerDay} onChange={e=>setMealsPerDay(e.target.value)} />
        </div>
        <div className="form-row">
          <input placeholder="Tag (e.g., home, eating out)" value={tag} onChange={e=>setTag(e.target.value)} />
        </div>
        <div className="form-row">
          <input placeholder="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button className="btn">Add Diet Estimate</button>
      </form>
    </div>
  )
}
