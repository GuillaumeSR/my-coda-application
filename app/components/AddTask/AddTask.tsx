import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

export default function AddTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    name: "",
    status: 0,
    date: "",
  });

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!task.name || !task.date) {
      throw new Error("Le nom et la date sont requis.");
    }

    await fetch("http://127.0.0.1:5500/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) {
          throw new Error("Le statut de la requête est invalide.");
        }
        navigate("/");
      })
      .catch((err) => console.error(`Erreur : ${err}`));
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="name">Nom de la tâche</label>
      <input
        type="text"
        name="name"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        required
      />

      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        value={task.date}
        onChange={(e) => setTask({ ...task, date: e.target.value })}
        required
      />

      <label htmlFor="status">Statut</label>
      <select
        name="status"
        value={task.status}
        onChange={(e) => setTask({ ...task, status: Number(e.target.value) })}
        required
      >
        <option value={0}>Non complété</option>
        <option value={1}>Complété</option>
      </select>

      <button type="submit">Ajouter</button>
    </form>
  );
}
