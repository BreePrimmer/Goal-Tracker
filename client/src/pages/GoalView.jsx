/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Categories from "../components/Categories";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { COMPLETE_GOAL, DELETE_GOAL } from "../utils/mutations";

export default function GoalView() {
  let { categoryName, goalId } = useParams();
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

  const [deleteGoalMutation] = useMutation(DELETE_GOAL);

  const [completeGoalMutation] = useMutation(COMPLETE_GOAL, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const handleCompleteGoal = async () => {
    try {
      const data = await completeGoalMutation({
        variables: {
          user: userData._id,
          goalId: goalId,
          completed: true,
        },
      });

      console.log("Goal completed!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGoal = async () => {
    try {
      const data = await deleteGoalMutation({
        variables: {
          user: userData._id,
          goalId: goalId,
        },
      });

      console.log("Goal Deleted - rerouting");
      window.location.assign(`/Category/${categoryName}`);
    } catch (error) {
      console.error(error);
    }
  };

  const goalCategory = userData.categories.filter(
    (goal) => goal.name === categoryName
  );

  const currentGoal = goalCategory[0].goals.filter(
    (goal) => goal._id === goalId
  );

  return (
    <div>
      <div id="view-goal-cont">
        <h2 id="goal-cat">{categoryName}</h2>
        <Link
          className="rtn-btn"
          id="single-goal-btn"
          to={`/category/${categoryName}`}>
          &lt;-
        </Link>
      </div>
      <div>
        <div id="desc-cont">
          <div>
            <h2 id="goal-title">{currentGoal[0].title}</h2>
            <div id="view-goal-area">
              <div id="view-goal-text">
                <span className="form-title">Description:</span>
                <p id="view-goal-desc">{currentGoal[0].text}</p>
                <div id="desc-date">
                  <span className="form-title">{currentGoal[0].date}</span>
                </div>
              </div>
            </div>
            <div>
              {currentGoal[0].completed ? (
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
              <button
                style={{ color: "red" }}
                onClick={handleDeleteGoal}
                className="form-title">
                Delete Goal
              </button>
            </div>
          </div>
        </div>
        {/* {JSON.stringify(currentGoal)} */}
        {/* <Categories userData={userData} /> */}
      </div>{" "}
    </div>
  );
}
