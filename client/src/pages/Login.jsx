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
        <label htmlFor="Username">Username:</label>
        <input
          type="text"
          name="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="Password">Password:</label>
        <input
          type="password"
          name="Password"
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
            Sign up!
          </span>
        </span>
      )}
    </div>
  );
}
