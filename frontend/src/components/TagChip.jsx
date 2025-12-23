import React from 'react'

const colors = ['#60a5fa','#34d399','#f59e0b','#fb7185','#a78bfa','#f97316']

export default function TagChip({ tag }){
  const idx = Math.abs(hashCode(tag)) % colors.length
  const bg = colors[idx]
  return (
    <span style={{display:'inline-block',padding:'4px 8px',background:bg,color:'white',borderRadius:99,fontSize:12,marginRight:6}}>{tag}</span>
  )
}

function hashCode(str){
  let h = 0
  for(let i=0;i<str.length;i++) h = ((h<<5)-h) + str.charCodeAt(i)
  return h
}
