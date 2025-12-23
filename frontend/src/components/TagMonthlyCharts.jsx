import React, { useMemo } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, Legend } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, Legend)

export default function TagMonthlyCharts({ history=[] }){
  const { monthlyLabels, monthlyData, tagLabels, tagData } = useMemo(()=>{
    // monthly totals for last 6 months
    const now = new Date()
    const months = []
    for(let i=5;i>=0;i--){
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push({ key: `${d.getFullYear()}-${d.getMonth()+1}`, label: d.toLocaleString(undefined,{month:'short', year:'numeric'}), date: d })
    }

    const monthlyMap = Object.fromEntries(months.map(m=>[m.key,0]))
    const tagMap = {}

    history.forEach(h=>{
      const d = new Date(h.date)
      const key = `${d.getFullYear()}-${d.getMonth()+1}`
      if(monthlyMap[key] !== undefined) monthlyMap[key] += (h.co2||0)
      const t = (h.tag || 'other')
      tagMap[t] = (tagMap[t]||0) + (h.co2||0)
    })

    const monthlyLabels = months.map(m=>m.label)
    const monthlyData = months.map(m=>Number((monthlyMap[m.key]||0).toFixed(2)))
    const tagLabels = Object.keys(tagMap)
    const tagData = tagLabels.map(l=>Number((tagMap[l]||0).toFixed(2)))

    return { monthlyLabels, monthlyData, tagLabels, tagData }
  }, [history])

  return (
    <div>
      <div className="card">
        <h3>Monthly Emissions (recent 6 months)</h3>
        <Bar data={{ labels: monthlyLabels, datasets:[{ label: 'kg CO2', data: monthlyData, backgroundColor: '#60a5fa' }] }} options={{ responsive:true }} />
      </div>
      <div className="card">
        <h3>Emissions by Tag</h3>
        <Doughnut data={{ labels: tagLabels, datasets:[{ data: tagData, backgroundColor: ['#60a5fa','#34d399','#f59e0b','#fb7185','#a78bfa','#f97316'] }] }} options={{ responsive:true }} />
      </div>
    </div>
  )
}
