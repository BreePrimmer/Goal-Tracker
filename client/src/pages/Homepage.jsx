import CreateGoal from "../components/CreateGoal";
import Categories from "../components/Categories";
import Todos from "../components/Todos";
import { LOGIN_USER } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import { QUERY_ME } from "../utils/queries";

export default function Homepage() {
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
  return (
    <div>
      <Categories userData={userData.categories} />
      <CreateGoal />
      <Todos userData={userData.todos} />
      {JSON.stringify(userData.categories[0].goals)}
    </div>
  );
}
