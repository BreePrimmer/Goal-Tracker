/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useParams, useLocation } from "react-router-dom";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import CreateGoal from "../components/CreateGoal";

import { QUERY_ME } from "../utils/queries";

export default function CategoryView(props) {
  // const userData = props.location.state.userData;
  let { categoryName } = useParams();

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

  const goalList = goalCategory[0].goals;
  // console.log(goalCategory[0].goals);
  return (
    <div id="goal-list-cont">
      <ul id="goal-list">
        {goalList.map((goal) => {
          return (
            <li key={goal.title} className="form-title" id="goal-name">
              <Link to={`/Category/${categoryName}/${goal._id}`}>
                <span>
                  {goal.complete ? (<>{goal.title} - completed</>) : (<>{goal.title}</>)}
                </span>
              </Link>
            </li>
          );
        })}
        <li><CreateGoal userData={userData} /></li>
      </ul>
      <Link id="rtn-btn" to={"/"}>
        &lt;-
      </Link>
    </div>
  );
}
