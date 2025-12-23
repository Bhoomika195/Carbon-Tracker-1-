import React from 'react'
import { Link } from 'react-router-dom'
import SummaryChart from '../components/SummaryChart'
import TagMonthlyCharts from '../components/TagMonthlyCharts'
import ProgressTracker from '../components/ProgressTracker'
import Tips from '../components/Tips'

export default function Dashboard({ history=[] }){
  return (
    <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
      <div style={{flex:1,minWidth:320}}>
        <div className="card">
          <h3>Quick Actions</h3>
          <div style={{display:'flex',gap:8}}>
            <Link to="/calculator" className="btn">New Entry</Link>
            <Link to="/history" className="btn" style={{background:'#10b981'}}>History</Link>
          </div>
        </div>
        <Tips />
        <TagMonthlyCharts history={history} />
      </div>
      <aside style={{width:420}}>
        <ProgressTracker history={history} />
        <SummaryChart history={history} />
      </aside>
    </div>
  )
}
