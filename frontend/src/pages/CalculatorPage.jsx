import React from 'react'
import TripForm from '../components/TripForm'
import EnergyForm from '../components/EnergyForm'
import DietForm from '../components/DietForm'
import WasteForm from '../components/WasteForm'

export default function CalculatorPage({ onAdd }){
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:20}}>
      <div>
        <div className="card">
          <h3>Calculate Emissions</h3>
          <p className="muted">Pick a form to add an entry quickly.</p>
          <TripForm onAdd={onAdd} />
          <EnergyForm onAdd={onAdd} />
          <DietForm onAdd={onAdd} />
          <WasteForm onAdd={onAdd} />
        </div>
      </div>
      <aside>
        <div className="card">
          <h3>Tips while calculating</h3>
          <div className="muted">Use realistic distances and monthly energy values for best results.</div>
        </div>
      </aside>
    </div>
  )
}
