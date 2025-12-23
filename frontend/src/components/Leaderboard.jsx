import React from 'react'

export default function Leaderboard({ history=[] }){
  // Simple local leaderboard: rank users by lowest emissions in last 7 days
  const users = [
    {name:'You', score: Math.max(0, Math.round((history.reduce((s,e)=>s+e.co2,0)) ))},
    {name:'Community A', score: 1420},
    {name:'Community B', score: 1890}
  ]

  return (
    <div className="card">
      <h3>Leaderboard (sample)</h3>
      <ol>
        {users.map((u,i)=>(<li key={i} className="muted">{u.name} — {u.score} kg</li>))}
      </ol>
    </div>
  )
}
