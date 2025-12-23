import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

export default function SummaryChart({ history=[] }){
  const byType = history.reduce((acc, it)=>{
    acc[it.type] = (acc[it.type]||0) + it.co2
    return acc
  }, {})

  const labels = Object.keys(byType)
  const data = labels.map(l => byType[l])

  return (
    <div className="card">
      <h3>Emissions Summary</h3>
      <Bar data={{labels, datasets:[{label:'kg CO2', data}]}} options={{responsive:true}} />
    </div>
  )
}
