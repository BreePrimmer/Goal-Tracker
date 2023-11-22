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
<<<<<<< HEAD
    <div>
      {JSON.stringify(formData)}
      <form onSubmit={loggingIn ? loginFormHandler : signupFormHandler}>
        <div>
          <label htmlFor="username">Username:</label>
=======
    <div id='login-cont'>
      <form id='login-form' onSubmit={loggingIn ? loginUser : signupUser}>
        <div className='login-input-cont'>
          <label className='form-title' htmlFor="username">Username:</label>
>>>>>>> eaf12e16ccf335510f8174651e1436fc095e6353
          <input
            className='login-input'
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className='login-input-cont'>
          <label className='form-title' htmlFor="email">Email:</label>
          <input
            className='login-input'
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='login-input-cont'>
          <label className='form-title' htmlFor="password">Password:</label>
          <input
            className='login-input'
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button id='login-btn' type="submit">{loggingIn ? `Log in` : `Sign up`}</button>
      </form>
      {loggingIn ? (
        <span className='form-title' id='new-user'>
          New to us?{" "}
          <span
            onClick={() => {
              setLoggingIn(false);
            }}>
            Sign up!
          </span>
        </span>
      ) : (
        <span className='form-title'>
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
