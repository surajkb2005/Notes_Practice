import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/notes";

function App() {

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [read, setRead] = useState(false);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    const res = await axios.get(API);
    setNotes(res.data.notes);
  }

  async function addOrUpdateNote(e) {
    e.preventDefault();

    const note = {
      title,
      content,
      read
    };

    if (editingId === null) {

      await axios.post(API, note);

    } else {

      await axios.put(`${API}/${editingId}`, note);

      setEditingId(null);

    }

    setTitle("");
    setContent("");
    setRead(false);

    getNotes();
  }

  async function deleteNote(id) {

    await axios.delete(`${API}/${id}`);

    getNotes();

  }

  function editNote(note) {

    setEditingId(note._id);

    setTitle(note.title);
    setContent(note.content);
    setRead(note.read);

  }

  return (
    <div className="container">

      <h1>Notes App</h1>

      <form onSubmit={addOrUpdateNote}>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label>

          <input
            type="checkbox"
            checked={read}
            onChange={(e) => setRead(e.target.checked)}
          />

          Read

        </label>

        <button>

          {editingId ? "Update Note" : "Add Note"}

        </button>

      </form>

      <hr />

      {notes.map((note) => (

        <div className="card" key={note._id}>

          <h2>{note.title}</h2>

          <p>{note.content}</p>

          <p>

            <b>Status :</b>{" "}
            {note.read ? "Read" : "Unread"}

          </p>

          <button onClick={() => editNote(note)}>

            Edit

          </button>

          <button
            className="delete"
            onClick={() => deleteNote(note._id)}
          >

            Delete

          </button>

        </div>

      ))}

    </div>
  );
}

export default App;