/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import CreateGoal from "../components/CreateGoal";

import { QUERY_ME } from "../utils/queries";
import { DELETE_CATEGORY } from "../utils/mutations";

export default function CategoryView() {
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

  // console.log(goalCategory)

  const goalList = goalCategory[0].goals;
  // console.log(goalCategory[0].goals);

  const handleCategoryDelete = async () => {
    const [deleteCategoryMutation] = useMutation(DELETE_CATEGORY);
    try {
      const { data } = await deleteCategoryMutation({
        variables: {
          user: userData._id,
          categoryId: goalCategory[0]._id,
        },
      });
      console.log("Deleted Category - rerouting");
      window.location.assign(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="goal-list-cont">
      <h2 style={{ color: "black" }}>{categoryName}</h2>
      <ul id="goal-list">
        {goalList.map((goal) => {
          return (
            <li key={goal._id} className="form-title" id="goal-name">
              <Link to={`/Category/${categoryName}/${goal._id}`}>
                <span>
                  {goal.completed ? (
                    <>{goal.title} - completed</>
                  ) : (
                    <>{goal.title}</>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <CreateGoal userData={userData} category={goalCategory[0]._id} />
        </li>
        <li>
          <button style={{ color: "red" }} onClick={handleCategoryDelete}>
            Delete Category
          </button>
        </li>
      </ul>
      <Link id="rtn-btn" to={"/"}>
        &lt;-
      </Link>
    </div>
  );
}
