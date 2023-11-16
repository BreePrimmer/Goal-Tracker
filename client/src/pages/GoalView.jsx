import { useParams } from "react-router-dom";
import SingleGoalView from "../components/SingleGoalView";
import Categories from "../components/Categories";

export default function GoalView() {
  let { id } = useParams();
  return (
    <div>
      <div>General</div>
      <h2>Viewing a goal??</h2>
      <SingleGoalView />
      <Categories />
    </div>
  );
}
