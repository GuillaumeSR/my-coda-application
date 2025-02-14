import { useState, useContext } from "react";
import type { Route } from "../+types/root";
import type { TaskI } from "~/shared/interfaces/Task.interface";
import { TaskContext } from "~/shared/contexts/TaskContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  /**
   * L'argument params va stocker les QueryStrings (ici: id).
   */
}

export default function ShowTaskCard({ params }: Route.ComponentProps) {
  const { id } = params;
  let navigate = useNavigate();

  let { task, setTask } = useContext(TaskContext);

  const submitUpdateForm = async (e: any) => {
    e.preventDefault();

    if (!task.name || !task.date) {
      throw new Error("Le nom et la date de la tâche sont requis.");
    }

    await fetch("http://localhost:5500/task/update", {
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

        navigate("/task/list");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Link to="/">Retour à l'accueil</Link>
      <form action="#" method="POST" onSubmit={submitUpdateForm}>
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          name="name"
          defaultValue={task.name}
          onChange={(e) => {
            let newName = e.target.value ?? null;
            setTask((task: TaskI) => {
              task.name = newName;
              return task;
            });
          }}
          
          required
        />
        <label htmlFor="status">Statut</label>
        <select
          name="status"
          defaultValue={task.status}
          onChange={(e) => {
            setTask((task: TaskI) => {
              task.status = Boolean(e.target.value);
              return task;
            });
          }}
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
          onChange={(e) => {
            let newDate = e.target.value ?? null;
            setTask((task: TaskI) => {
              task.date = newDate;
              return task;
            });
          }}
          required
        />
        <input type="hidden" value={id} name="id" />
        <button type="submit">Mettre à jour</button>
      </form>
    </>
    
  );
}
