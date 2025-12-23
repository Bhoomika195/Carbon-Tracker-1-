import React from 'react'

export default function Snackbar({ open, message, actionLabel, onAction, onClose }){
  if(!open) return null
  return (
    <div style={{position:'fixed',left:12,right:12,bottom:12,display:'flex',justifyContent:'center',zIndex:60}}>
      <div style={{background:'#111827',color:'white',padding:'12px 16px',borderRadius:10,display:'flex',gap:12,alignItems:'center',boxShadow:'0 8px 30px rgba(2,6,23,0.4)',animation:'slideUp .28s ease'}}>
        <div style={{flex:1}}>{message}</div>
        {actionLabel && <button className="btn" style={{background:'#10b981'}} onClick={onAction}>{actionLabel}</button>}
        <button className="btn" style={{background:'#ef4444'}} onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
