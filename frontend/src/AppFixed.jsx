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
import api from './utils/api'
import { useAuth } from './contexts/AuthContext'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <p>Loading...</p>
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function AppFixed() {
  const [history, setHistory] = useState([])
  const { user } = useAuth()

  // Load history from backend when user is authenticated
  useEffect(() => {
    if (user) {
      api.get('/entries')
        .then(res => setHistory(res.data))
        .catch(err => {
          console.error("Error loading history:", err);
          setHistory([]);
        });
    } else {
      setHistory([]);
    }
  }, [user])

  function addEntry(entry) {
    api.post('/entries', entry)
      .then(res => {
        setHistory(prev => [res.data, ...prev])
      })
      .catch(err => {
        console.error("Error adding entry:", err);
        alert("Failed to add entry. Please check your connection.");
      });
  }

  function updateEntry(itemOrIdx, entry) {
    // If it's a new entry (e.g., from Undo or Import)
    if (itemOrIdx === -1) {
      addEntry(entry);
      return;
    }

    const itemToUpdate = typeof itemOrIdx === 'object' ? itemOrIdx : history[itemOrIdx];
    if (!itemToUpdate || !itemToUpdate._id) {
      console.error("Invalid item to update");
      return;
    }

    api.put(`/entries/${itemToUpdate._id}`, entry)
      .then(res => {
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
          <Route path="/" element={<PrivateRoute><Dashboard history={history} /></PrivateRoute>} />
          <Route path="/calculator" element={<PrivateRoute><CalculatorPage onAdd={addEntry} /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><HistoryPage history={history} onEdit={updateEntry} onDelete={deleteEntry} /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
