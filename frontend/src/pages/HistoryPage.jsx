import React, { useState } from 'react'
import { calcTrip, calcEnergy } from '../utils/calculations'
import Modal from '../components/Modal'
import Snackbar from '../components/Snackbar'
import TagChip from '../components/TagChip'

export default function HistoryPage({ history = [], onEdit = () => { }, onDelete = () => { } }) {
  const [query, setQuery] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [editing, setEditing] = useState(null)
  const [snack, setSnack] = useState({ open: false, message: '', action: null })
  const [deleted, setDeleted] = useState(null)

  function inDateRange(dateStr) {
    if (!from && !to) return true
    const d = new Date(dateStr)
    if (from && d < new Date(from)) return false
    if (to && d > new Date(to)) return false
    return true
  }

  const filtered = history.filter(h => (
    JSON.stringify(h).toLowerCase().includes(query.toLowerCase()) &&
    (tagFilter ? (h.tag || '').toLowerCase() === tagFilter.toLowerCase() : true) &&
    inDateRange(h.date)
  ))

  function exportCSV() {
    console.log("Exporting CSV, history length:", history.length);
    if (history.length === 0) {
      alert("No history to export!");
      return;
    }
    // Helper to safely stringify
    const safeString = (v) => {
      if (v === null || v === undefined) return "";
      if (typeof v === 'object') return JSON.stringify(v); // Handle nested objects/arrays
      return String(v);
    }

    // Get all unique keys across all objects to ensure columns align
    const allKeys = Array.from(new Set(history.flatMap(h => Object.keys(h))));

    const headerRow = allKeys.join(',');
    const bodyRows = history.map(row => {
      return allKeys.map(k => {
        const val = row[k];
        const str = safeString(val);
        return `"${str.replace(/"/g, '""')}"`; // Escape quotes
      }).join(',');
    });

    const csvContent = [headerRow, ...bodyRows].join('\n');
    console.log("CSV content preview:", csvContent.slice(0, 100));

    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }) // Explicit charset
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a');
      a.href = url;
      a.download = 'history.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (e) {
      console.error("Export failed:", e);
      alert("Export failed: " + e.message);
    }
  }

  function exportJSON() {
    console.log("Exporting JSON");
    if (history.length === 0) {
      alert("No history to export!");
      return;
    }
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a');
    a.href = url;
    a.download = 'history.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function importJSON(file) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        if (Array.isArray(data)) {
          // call onEdit or add - here we trigger a replace by index 0..n
          // better approach: call a global handler, but we simply prompt user to confirm
          if (confirm('Import will append entries to your history. Continue?')) {
            data.slice().reverse().forEach(d => onEdit(-1, d))
          }
        } else alert('JSON must be an array of entries')
      } catch (e) { alert('Invalid JSON') }
    }
    reader.readAsText(file)
  }

  function handleEditOpen(it) {
    setEditing({ entry: { ...it } })
  }

  function handleEditSave() {
    if (editing) {
      // Recalculate CO2 if value fields changed
      const e = { ...editing.entry }
      if (e.type === 'trip') {
        const km = parseFloat(e.km || 0)
        e.co2 = calcTrip({ mode: e.mode || 'car', km, vehicle: e.vehicle || 'petrol' })
        e.km = km
      } else if (e.type === 'energy') {
        const kwh = parseFloat(e.kwh || 0)
        e.co2 = calcEnergy(kwh)
        e.kwh = kwh
      }
      // Pass the entry object (which has _id) as the first arg and the update data as second
      onEdit(e, e)
      setEditing(null)
      setSnack({ open: true, message: 'Entry updated', action: null })
    }
  }

  function handleDelete(item) {
    // remove immediately
    onDelete(item)
    setDeleted({ item })
    setSnack({ open: true, message: 'Entry deleted', action: 'Undo' })
  }

  function undoDelete() {
    if (!deleted) return
    // append back at front
    onEdit(-1, deleted.item)
    setDeleted(null)
    setSnack({ open: true, message: 'Undo successful', action: null })
  }

  return (
    <div>
      <div className="card">
        <h3>History</h3>
        <div className="form-row">
          <input placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} />
          <input placeholder="Filter tag" value={tagFilter} onChange={e => setTagFilter(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="muted">From:</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} />
          <label className="muted">To:</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button className="btn" onClick={exportCSV}>Export CSV</button>
          <button className="btn" onClick={exportJSON}>Export JSON</button>
          <label className="btn" style={{ background: '#6b7280' }}>
            Import JSON <input type="file" accept="application/json" style={{ display: 'none' }} onChange={e => importJSON(e.target.files[0])} />
          </label>
        </div>
        {filtered.length === 0 && <div className="muted">No matching entries</div>}
        {filtered.map((it) => (
          <div key={it._id || it.date} className="history-item">
            <div>
              <strong>{it.type} {it.tag ? <TagChip tag={it.tag} /> : ''}</strong>
              <div className="muted" style={{ fontSize: 12 }}>{new Date(it.date).toLocaleString()}</div>
              {it.note && <div style={{ fontSize: 13, marginTop: 6 }} className="muted">{it.note}</div>}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div>{(it.co2 || 0).toFixed(2)} kg</div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 6 }}>
                <button className="btn" onClick={() => handleEditOpen(it)}>Edit</button>
                <button className="btn" style={{ background: '#ef4444' }} onClick={() => handleDelete(it)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)}>
        {editing && (
          <div>
            <h3>Edit entry</h3>
            <div className="form-row">
              <input value={editing.entry.tag || ''} onChange={e => setEditing(prev => ({ ...prev, entry: { ...prev.entry, tag: e.target.value } }))} placeholder="Tag" />
            </div>
            <div className="form-row">
              <input value={editing.entry.note || ''} onChange={e => setEditing(prev => ({ ...prev, entry: { ...prev.entry, note: e.target.value } }))} placeholder="Note" />
            </div>
            <div className="form-row">
              <input value={editing.entry.km || editing.entry.kwh || ''} onChange={e => {
                const v = e.target.value
                setEditing(prev => ({ ...prev, entry: { ...prev.entry, km: prev.entry.km !== undefined ? parseFloat(v || 0) : prev.entry.km, kwh: prev.entry.kwh !== undefined ? parseFloat(v || 0) : prev.entry.kwh } }))
              }} placeholder="Value (km or kWh)" />
            </div>
            <div style={{ textAlign: 'right' }}>
              <button className="btn" onClick={handleEditSave}>Save</button>
            </div>
          </div>
        )}
      </Modal>

      <Snackbar open={snack.open} message={snack.message} actionLabel={snack.action} onAction={undoDelete} onClose={() => setSnack({ open: false, message: '' })} />
    </div>
  )
}
