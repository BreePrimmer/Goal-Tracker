import { useParams } from "react-router-dom";
import SingleGoalView from "../components/SingleGoalView";
import Categories from "../components/Categories";

export default function GoalView() {
  let { id } = useParams();
  return (
    <div>
      <h2 id='goal-cat'>General</h2>
      <SingleGoalView />
      <Categories />
    </div>
  );
}
