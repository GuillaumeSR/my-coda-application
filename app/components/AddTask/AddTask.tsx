import { useState, type FormEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { TaskContext } from "~/shared/contexts/TaskContext";
import type { TaskI } from "~/shared/interfaces/Task.interface";

export default function AddTask() {
  const navigate = useNavigate();

  let { task, setTask } = useContext(TaskContext);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!task.name || !task.date) {
      throw new Error("Le nom et la date sont requis.");
    }

    await fetch("http://127.0.0.1:5500/task/add", {
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
        onChange={(e) => {
          let newName = e.target.value ?? null;
          setTask((task: TaskI) => {
            task.name = newName;
            return task;
          });
        }}
        required
      />

      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        value={task.date}
        onChange={(e) => {
          let newDate = e.target.value ?? null;
          setTask((task: TaskI) => {
            task.date = newDate;
            return task;
          });
        }}
        required
      />

      <label htmlFor="status">Statut</label>
      <select
        name="status"
        value={task.status}
        onChange={(e) => {
          setTask((task: TaskI) => {
            task.status = Boolean(e.target.value);
            return task;
          });
        }}
        required
      >
        <option value={0}>Non complété</option>
        <option value={1}>Complété</option>
      </select>

      <button type="submit">Ajouter</button>
    </form>
  );
}
