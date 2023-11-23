import CreateGoal from "../components/CreateGoal";
import Categories from "../components/Categories";
import Todos from "../components/Todos";

export default function Homepage() {
  return (
    <div className='desktop-view'>
      <Categories />
      <CreateGoal />
      <Todos />
    </div>
  );
}
