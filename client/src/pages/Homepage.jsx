import CreateGoal from "../components/CreateGoal";
import Categories from "../components/Categories";
import Todos from "../components/Todos";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

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
  if (data) {
    console.log(userData);
  }
  return (
    <div>
      <Categories />
      <CreateGoal />
      <Todos userData={userData} />
    </div>
  );
}
