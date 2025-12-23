import React from 'react'

export default function Modal({ open, onClose, children }){
  if(!open) return null
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:40}} onClick={onClose}>
      <div style={{background:'white',padding:18,borderRadius:10,minWidth:320}} onClick={e=>e.stopPropagation()}>
        {children}
        <div style={{textAlign:'right',marginTop:12}}>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
