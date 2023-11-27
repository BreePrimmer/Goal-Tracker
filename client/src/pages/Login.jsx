import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { NEW_USER, LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function Login() {
  const [loggingIn, setLoggingIn] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [createUser, { error }] = useMutation(NEW_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...formData },
      });
      const { token, user } = data.login;
      // console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    // console.log(formData);
    console.log("User logged in!");
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

    // console.log(formData);
    console.log("User signed up!");
  };
  return (
    <div id="login-cont">
      <form
        id="login-form"
        onSubmit={loggingIn ? loginFormHandler : signupFormHandler}>
        <div className="login-input-cont">
          <label className="form-title" htmlFor="username">
            Username:
          </label>
          <input
            className="login-input"
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        {!loggingIn && (
          <div className="login-input-cont">
            <label className="form-title" htmlFor="email">
              Email:
            </label>
            <input
              className="login-input"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className="login-input-cont">
          <label className="form-title" htmlFor="password">
            Password:
          </label>
          <input
            className="login-input"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button id="login-btn" type="submit">
          {loggingIn ? `Log in` : `Sign up`}
        </button>
      </form>
      {loggingIn ? (
        <span className="form-title" id="new-user">
          New to us?{" "}
          <span
            onClick={() => {
              setLoggingIn(false);
            }}>
            Sign up!
          </span>
        </span>
      ) : (
        <span className="form-title">
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
