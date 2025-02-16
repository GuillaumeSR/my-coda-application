import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Accueil" },
    { name: "description", content: "Bienvenue sur l'application React PHP Coda." },
  ];
}

export default function Home() {
  return (
    <>
      <Link to="/task/add">
        Ajouter une tâche
      </Link>
      <Link to="/task/list">
        Voir la liste des tâches
      </Link>
    </>
  );
}
