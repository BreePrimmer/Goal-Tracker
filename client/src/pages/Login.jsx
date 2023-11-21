import { useState } from "react";

export default function Login() {
  const [loggingIn, setLoggingIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    console.log(username, password);
    console.log("User logged in!");
  };
  const signupUser = (e) => {
    e.preventDefault();
    console.log(username, password);
    console.log("User signed up!");
  };
  return (
    <div>
      <form onSubmit={loggingIn ? loginUser : signupUser}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
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
          Logging in?{" "}
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
