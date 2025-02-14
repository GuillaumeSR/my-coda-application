import { useState, useContext } from "react";
import type { Route } from "../+types/root";
import { useNavigate } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  /**
   * L'argument params va stocker les QueryStrings (ici: id).
   */
}

export default function ShowTaskCard({ params }: Route.ComponentProps) {
  const { id } = params;
  let navigate = useNavigate();

  let [task, setTask] = useState({ name: "", status: 0, date: "" });

  const submitUpdateForm = async (e: any) => {
    e.preventDefault();

    if (!task.name || !task.date) {
      throw new Error("Le nom et la date de la tâche sont requis.");
    }

    await fetch("http://localhost:5500/tasks/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) {
          throw new Error("Le statut de la requête est invalide.");
        }

        navigate("/tasks/list");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form action="#" method="POST" onSubmit={submitUpdateForm}>
      <label htmlFor="name">Nom</label>
      <input
        type="text"
        name="name"
        defaultValue={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        required
      />
      <label htmlFor="status">Statut</label>
      <select
        name="status"
        defaultValue={task.status}
        onChange={(e) => setTask({ ...task, status: Number(e.target.value) })}
        required
      >
        <option value={0}>Non terminé</option>
        <option value={1}>Terminé</option>
      </select>
      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        defaultValue={task.date}
        onChange={(e) => setTask({ ...task, date: e.target.value })}
        required
      />
      <input type="hidden" value={id} name="id" />
      <button type="submit">Mettre à jour</button>
    </form>
  );
}