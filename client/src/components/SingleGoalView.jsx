/* eslint-disable react-hooks/rules-of-hooks */
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { COMPLETE_GOAL, DELETE_GOAL } from "../utils/mutations";
import Auth from "../utils/auth";

export default function SingleGoalView(props) {
  const goal = props.goal[0];
  const category = props.category;
  // console.log(goal);
  // console.log(category);

  const token = Auth.getToken();
  const { loading, error, data } = Auth.loggedIn()
    ? useQuery(QUERY_ME, {
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      })
    : { loading: false, error: null, data: null };

  if (loading) {
    return <h2 style={{ color: "black" }}>loading . . .</h2>;
  }
  if (error) {
    return <h2 style={{ color: "red" }}>ERROR!</h2>;
  }

  const userData = data?.me;

  const [completeGoalMutation] = useMutation(COMPLETE_GOAL, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const handleCompleteGoal = async () => {
    try {
      const data = await completeGoalMutation({
        variables: {
          user: userData._id,
          goalId: goal._id,
          completed: true,
        },
      });

      console.log("Goal completed!");
    } catch (error) {
      console.error(error);
    }
  };

  const [deleteGoalMutation] = useMutation(DELETE_GOAL);

  const handleDeleteGoal = async () => {
    try {
      const data = await deleteGoalMutation({
        variables: {
          user: userData._id,
          goalId: goal._id,
        },
      });

      console.log("Goal Deleted - rerouting");
      window.location.assign(`/Category/${category}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="one-goal-cont">
      <div>
        <h2 id="goal-title">{goal.title}</h2>
        <div id="view-goal-area">
          <div id="view-goal-text">
            <span className="form-title">Description:</span>
            <p id="view-goal-desc">{goal.text}</p>
            <div id="desc-date">
              <span className="form-title">{goal.date}</span>
            </div>
          </div>
        </div>
        <div>
          {goal.completed ? (
            <>
              <span className="form-title">Completed Goal</span>
            </>
          ) : (
            <>
              <button
                id="complete-goal-btn"
                type="submit"
                onClick={handleCompleteGoal}>
                Complete Goal
              </button>
            </>
          )}
        </div>
        <div>
          <button id='delete-goal-btn' onClick={handleDeleteGoal} className="form-title">Delete Goal</button>
        
        </div>
      </div>
    </div>
  );
}
