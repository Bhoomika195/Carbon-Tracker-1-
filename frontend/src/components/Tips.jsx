import React from 'react'

const TIPS = [
  'Reduce car trips by combining errands and walking short distances.',
  'Switch bulbs to LED and reduce standby power use.',
  'Air dry clothes when possible to save electricity.',
  'Choose public transport or cycle for short commutes.',
  'Reduce food waste and prefer seasonal/local produce.'
]

export default function Tips(){
  return (
    <div className="card">
      <h3>Practical Tips</h3>
      <ul>
        {TIPS.map((t,i)=>(<li key={i} className="muted" style={{marginBottom:6}}>{t}</li>))}
      </ul>
    </div>
  )
}
