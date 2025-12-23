import React from 'react'

export default function History({ history=[], onDelete=()=>{} }){
  return (
    <div className="card">
      <h3>History</h3>
      {history.length===0 && <div className="muted">No entries yet</div>}
      {history.map((it, idx)=> (
        <div key={idx} className="history-item">
          <div>
            <strong className="muted">{it.type}</strong>
            <div style={{fontSize:13}}>{new Date(it.date).toLocaleString()}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div>{it.co2.toFixed(2)} kg</div>
            <button className="btn" style={{marginTop:6,background:'#ef4444'}} onClick={()=>onDelete(idx)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
