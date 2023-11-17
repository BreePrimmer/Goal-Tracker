import CreateGoal from "../components/CreateGoal";
import Categories from "../components/Categories";
import Todos from "../components/Todos";

export default function Homepage() {
  return (
    <div>
      <Categories />
      <CreateGoal />
      <Todos />
    </div>
  );
}
