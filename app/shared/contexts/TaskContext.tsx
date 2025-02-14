import { createContext, useState } from "react";

export const TaskContext = createContext<any>();

export default function TaskProvider({ children }: any) {
  let [task, setTask] = useState({
    id: undefined,
    name: undefined,
    status: false,
    date: undefined,
    creation_date: undefined,
  });

  let [statuses, setStatuses] = useState([
    {
      value: "pending",
      name: "En attente",
    },
    {
      value: "in_progress",
      name: "En cours",
    },
    {
      value: "completed",
      name: "Terminée",
    },
  ]);

  return (
    <TaskContext.Provider
      value={{
        task,
        setTask,
        statuses,
        setStatuses,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}