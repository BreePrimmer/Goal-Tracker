/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import SingleGoalView from "../components/SingleGoalView";
import Categories from "../components/Categories";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

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

  const goalCategory = userData.categories.filter(
    (goal) => goal.name === categoryName
  );

  const currentGoal = goalCategory[0].goals.filter(
    (goal) => goal._id === goalId
  );

  return (
    <div>
      <Link id="rtn-btn" to={`/category/${categoryName}`}>
        &lt;-
      </Link>
      <h2 id="goal-cat">{categoryName}</h2>
      <SingleGoalView goal={currentGoal} />
      {/* {JSON.stringify(currentGoal)} */}
      {/* <Categories userData={userData} /> */}
      
    </div>
  );
}
