/* eslint-disable react-hooks/rules-of-hooks */
import CreateGoal from "../components/CreateGoal";
import Categories from "../components/Categories";
import Todos from "../components/Todos";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function Homepage() {
  const token = Auth.getToken();
  // Ternary operation checks to see if the user is logged in to avoid errors later on
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
  // if (data) {
  // console.log(userData)
  // }

  return (
    <div className="desktop-view">
      {Auth.loggedIn() ? (
        <>
          {/* passing userData as props */}
          <Categories userData={userData} />
          <CreateGoal userData={userData} />
          <Todos userData={userData} />
        </>
      ) : (
        <>{window.location.assign("/login")}</>
      )}
    </div>
  );
}
