import { Link, useParams, useLocation } from "react-router-dom";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import { QUERY_ME } from "../utils/queries";

export default function GoalView() {
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
  console.log(goalCategory[0].goals);
  return (
<<<<<<< HEAD
    <div id="goal-list-cont">
      <ul id="goal-list">
        {/* <li>{JSON.stringify(myProp)}</li> */}
        {goalList.map((goal) => {
          return (
            <li key={goal.title} className="form-title" id="goal-name">
              <span>{goal.title}</span>
            </li>
          );
        })}
      </ul>
      <Link id="rtn-btn" to={"/"}>
        &lt;-
      </Link>
=======
    <div id='goal-list-cont'>
      <ul id='goal-list'>
        <li className='form-title' id="goal-name">Goal one</li>
        <li className='form-title' id="goal-name">Goal two</li>
        <li className='form-title' id="goal-name">Goal three</li>
        <li className='form-title' id="goal-name">Goal four</li>
      </ul>
      <Link id='rtn-btn' to={"/"}>&lt;-</Link>
>>>>>>> a96b3a1b5e3c8c86f660e9810df738fdc7dc83da
    </div>
  );
}
