import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { COMPLETE_GOAL } from "../utils/mutations";

export default function SingleGoalView(props) {
  const goal = props.goal[0];
  console.log(goal);
  return (
    <div id="desc-cont">
      <div>
        <span className="form-title">Description:</span>
        <p className="goal-desc">{goal.text}</p>
        <div id="desc-date">
          <span className="form-title">{goal.date}</span>
        </div>
        <div>
          {goal.completed ? (
            <>
              <span className="form-title">Completed Goal</span>
            </>
          ) : (
            <>
              <button type="submit">Complete Goal</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
