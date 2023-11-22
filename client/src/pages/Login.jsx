import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { NEW_USER, LOGIN_USER } from "../utils/mutations";

export default function Login() {
  const [loggingIn, setLoggingIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [createUser, { error }] = useMutation(NEW_USER);
  const [loginUser, { err }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formData },
      });
    } catch (err) {
      console.error(err);
    }

    console.log(formData);
    console.log("User logged in!");
    // window.location.replace("/");
  };
  const signupFormHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formData },
      });
    } catch (err) {
      console.error(err);
    }

    console.log(formData);
    console.log("User signed up!");
    // window.location.replace("/");
  };
  return (
    <div>
      {JSON.stringify(formData)}
      <form onSubmit={loggingIn ? loginFormHandler : signupFormHandler}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{loggingIn ? `Log in` : `Sign up`}</button>
      </form>
      {loggingIn ? (
        <span>
          New to us?{" "}
          <span
            onClick={() => {
              setLoggingIn(false);
            }}>
            Sign up!
          </span>
        </span>
      ) : (
        <span>
          Already have an account?{" "}
          <span
            onClick={() => {
              setLoggingIn(true);
            }}>
            Log in!
          </span>
        </span>
      )}
    </div>
  );
}
