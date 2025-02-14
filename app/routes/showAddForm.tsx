import { Link } from "react-router";
import AddTask from "~/components/AddTask/AddTask";

export default function ShowAddForm() {
  return (
    <>
      <Link to="/">Retour à l'accueil</Link>
      <AddTask />
    </>
  );
}