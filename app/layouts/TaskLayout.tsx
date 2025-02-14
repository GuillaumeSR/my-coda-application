import { Outlet } from "react-router";
import TaskProvider from "~/shared/contexts/TaskContext";


export default function TaskLayout(){
  return(<>
    <TaskProvider children={<Outlet/>}/>
  </>);
}