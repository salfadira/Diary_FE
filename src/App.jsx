import React, { useEffect, useState } from "react";

export default function App() {
  const [diary, setDiary] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const ambilData = async () => {
    try {
      const response = await fetch("https://diarybe-e93479621824.herokuapp.com/");
      const data = await response.json();
      setDiary(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const tambahDiary = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/adddiary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error("Failed to post data");
      setTitle("");
      setDescription("");
      setShowForm(false);
      ambilData();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const hapusDiary = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete data");
    ambilData();
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

const simpanEdit = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, description: editDescription }),
    });
    if (!response.ok) throw new Error("Failed to update data");
    batalEdit();
    ambilData();
  } catch (error) {
    console.error("Error updating data:", error);
  }
};


  const mulaiEdit = (item) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const batalEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  useEffect(() => {
    ambilData();
  }, []);

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "40px auto",
      fontFamily: "'Patrick Hand', cursive",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 18px",
      fontSize: "16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "20px",
    },
    card: {
      padding: "20px",
      backgroundColor: "#ffd1dc",
      borderRadius: "8px",
      boxShadow: "3px 3px 8px rgba(0,0,0,0.2)",
      backgroundImage:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.23) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 75%, transparent 75%, transparent)",
      backgroundSize: "20px 20px",
      transform: "rotate(-1deg)",
      position: "relative",
    },
    formWrapper: {
      marginTop: "30px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "#fffbe6",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      fontSize: "16px",
      fontFamily: "'Patrick Hand', cursive",
    },
    submitButton: {
      padding: "10px 18px",
      backgroundColor: "green",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "10px",
    },
    editButton: {
      padding: "5px 10px",
      backgroundColor: "#ffc107",
      color: "black",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "8px",
    },
    deleteButton: {
      padding: "5px 10px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    buttonGroup: {
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>My Diary Notes</h2>
        <button style={styles.button} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Diary"}
        </button>
      </div>

      <div style={styles.grid}>
        {diary.map((item) => (
          <div key={item.id} style={styles.card}>
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={styles.input}
                />
                <textarea
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={styles.input}
                />
                <div style={styles.buttonGroup}>
                  <button
                    style={styles.submitButton}
                    onClick={() => simpanEdit(item.id)}
                  >
                    Save
                  </button>
                  <button style={styles.deleteButton} onClick={batalEdit}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>
                  🕒 Created: {new Date(item.created_at).toLocaleDateString()}
                </small>
                <br />
                <small>
                  ✏️ Modified:{" "}
                  {item.modify_at
                    ? new Date(item.modify_at).toLocaleDateString()
                    : "-"}
                </small>
                <div style={styles.buttonGroup}>
                  <button
                    style={styles.editButton}
                    onClick={() => mulaiEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => hapusDiary(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {showForm && (
        <div style={styles.formWrapper}>
          <h3>Add New Diary Entry</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={styles.input}
          />
          <button style={styles.submitButton} onClick={tambahDiary}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

