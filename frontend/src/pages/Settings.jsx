import React, { useState, useEffect } from 'react'
import { loadSettings, saveSettings } from '../utils/storage'

export default function Settings(){
  const [theme, setTheme] = useState('light')

  useEffect(()=>{
    const s = loadSettings()
    if(s.theme) setTheme(s.theme)
    document.documentElement.setAttribute('data-theme', s.theme || 'light')
  }, [])

  function change(t){
    setTheme(t)
    const s = loadSettings()
    s.theme = t
    saveSettings(s)
    document.documentElement.setAttribute('data-theme', t)
  }

  return (
    <div className="card" style={{maxWidth:720}}>
      <h3>Settings</h3>
      <div className="muted">Simple app settings (local only)</div>
      <div style={{marginTop:12}}>
        <label className="muted">Theme:</label>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button className="btn" onClick={()=>change('light')}>Light</button>
          <button className="btn" style={{background:'#111827'}} onClick={()=>change('dark')}>Dark</button>
        </div>
      </div>
    </div>
  )
}
