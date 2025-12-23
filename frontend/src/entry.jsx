import { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import api from "./utils/api";

export default function Entry() {
  const { user, loading } = useAuth();
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  // Example form state (you can connect this to your real form)
  const [type, setType] = useState("transport");
  const [co2, setCo2] = useState(2.3);
  const [mode, setMode] = useState("bus");
  const [km, setKm] = useState(5);

  // ✅ FETCH ENTRIES FOR LOGGED-IN USER
  useEffect(() => {
    if (loading) return;
    if (!user?._id) {
      setError("User not logged in");
      return;
    }

    api
      .get(`/entries?userId=${user._id}`)
      .then((res) => {
        setEntries(res.data);
      })
      .catch((err) => {
        console.error("Fetch entries error:", err);
        setError("Failed to fetch entries");
      });
  }, [user, loading]);

  // ✅ ADD ENTRY
  const addEntry = async () => {
    if (!user?._id) {
      alert("User not logged in");
      return;
    }

    try {
      const payload = {
        userId: user._id,          // 🔥 REQUIRED
        date: new Date().toISOString().slice(0, 10),
        type,
        co2: Number(co2),
        mode,
        km: Number(km),
      };

      const res = await api.post("/entries", payload);

      // Add new entry to UI immediately
      setEntries((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Add entry error:", err);
      alert("Failed to add entry");
    }
  };

  // ⏳ Loading state
  if (loading) {
    return <p>Loading user...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Entries</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ADD ENTRY BUTTON */}
      <button onClick={addEntry} style={{ marginBottom: "20px" }}>
        Add Test Entry
      </button>

      {/* ENTRY LIST */}
      {entries.length === 0 ? (
        <p>No entries found</p>
      ) : (
        entries.map((e) => (
          <div
            key={e._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <b>{e.type}</b> — {e.co2} kg
            <br />
            Mode: {e.mode || "-"} | KM: {e.km || "-"}
          </div>
        ))
      )}
    </div>
  );
}
