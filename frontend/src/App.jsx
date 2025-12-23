import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CalculatorPage from './pages/CalculatorPage'
import HistoryPage from './pages/HistoryPage'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
// Removed loadHistory/saveHistory from localStorage
import { useAuth } from './contexts/AuthContext'
import api from './utils/api'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="container" style={{ padding: 24 }}>
        Loading...
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const [history, setHistory] = useState([])
  const { user } = useAuth()

  // Load history from backend when user is authenticated
  useEffect(() => {
    if (user) {
      api.get('/entries')
        .then(res => setHistory(res.data))
        .catch(err => console.error("Error loading history:", err));
    } else {
      setHistory([]);
    }
  }, [user])

  // No longer syncing to localStorage on change

  function addEntry(entry) {
    api.post('/entries', entry)
      .then(res => {
        setHistory(prev => [res.data, ...prev])
      })
      .catch(err => {
        console.error("Error adding entry:", err);
        alert("Failed to add entry.");
      });
  }

  function updateEntry(itemOrIdx, entry) {
    console.log("Updating entry:", itemOrIdx, entry);
    // If it's a new entry (from Import or Undo)
    if (itemOrIdx === -1) {
      addEntry(entry);
      return;
    }

    const itemToUpdate = typeof itemOrIdx === 'object' ? itemOrIdx : history[itemOrIdx];
    if (!itemToUpdate || !itemToUpdate._id) {
      console.error("Invalid item to update:", itemToUpdate);
      return;
    }

    // Prepare clean data for update - include all fields from Entry schema
    const cleanedEntry = {
      date: entry.date,
      type: entry.type,
      co2: entry.co2,
      tag: entry.tag,
      note: entry.note,
      mode: entry.mode,
      km: entry.km,
      kwh: entry.kwh,
      vehicle: entry.vehicle,
      flightClass: entry.flightClass,
      longHaul: entry.longHaul
    };

    api.put(`/entries/${itemToUpdate._id}`, cleanedEntry)
      .then(res => {
        console.log("Update successful:", res.data);
        setHistory(prev => prev.map(p => (p._id === itemToUpdate._id ? res.data : p)))
      })
      .catch(err => {
        console.error("Error updating entry:", err);
        alert("Failed to update entry.");
      });
  }

  function deleteEntry(itemOrIdx) {
    const itemToDelete = typeof itemOrIdx === 'object' ? itemOrIdx : history[itemOrIdx];
    if (!itemToDelete || !itemToDelete._id) return;

    api.delete(`/entries/${itemToDelete._id}`)
      .then(() => {
        setHistory(prev => prev.filter(p => p._id !== itemToDelete._id))
      })
      .catch(err => {
        console.error("Error deleting entry:", err);
        alert("Failed to delete entry.");
      });
  }

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard history={history} />
              </PrivateRoute>
            }
          />
          <Route
            path="/calculator"
            element={
              <PrivateRoute>
                <CalculatorPage onAdd={addEntry} />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <HistoryPage
                  history={history}
                  onEdit={updateEntry}
                  onDelete={deleteEntry}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
