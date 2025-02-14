import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import type { TaskI } from "~/shared/interfaces/Task.interface";
import DeleteTask from "~/components/deleteTask/DeleteTask";
import { TaskContext } from "~/shared/contexts/TaskContext";

export default function ShowTasks() {
  let { setTask } = useContext(TaskContext);

  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length <= 0) {
      fetchTasks();
    }
  }, [tasks]);

  const fetchTasks = async () => {
    await fetch("http://127.0.0.1:5500/task/get/list", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error("Le statut de la requête n'est pas valide.");
        }

        if (!datas.tasks) {
          throw new Error("Aucune tâche n'a été retournée.");
        }

        let tasksList = datas.tasks.map((task: TaskI) => {
          return {
            id: task.id,
            name: task.name,
            status: task.status ?? 0,
            date: task.date,
            creation_date: task.creation_date,
          };
        });

        setTasks(tasksList);
      })
      .catch((err) => console.error(err));
  };

  const updateTaskContext = (task: TaskI) => {
    setTask(task);
  };

  return (
    <section className="main-sections">
      {tasks.length > 0 &&
        tasks.map((task: TaskI) => (
          <article className="main-articles" key={task.id}>
            <h2 className="main-articles-title">{task.name}</h2>
            <p>Status: {task.status ? "Completed" : "Pending"}</p>
            <p>Date: {task.date}</p>
            <Link to={`/task/update/${task.id}`} onClick={() => updateTaskContext(task)}>
              Modifier
            </Link>

            <DeleteTask taskId={task.id} />
          </article>
        ))}
    </section>
  );
}