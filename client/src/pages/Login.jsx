import { useState } from "react";

export default function Login() {
  const [loggingIn, setLoggingIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    console.log(username, password, email);
    console.log("User logged in!");
    setUsername("");
    setEmail("");
    setPassword("");
    // window.location.replace("/");
  };
  const signupUser = (e) => {
    e.preventDefault();
    console.log(username, password, email);
    console.log("User signed up!");
    // window.location.replace("/");
  };
  return (
    <div>
      <form onSubmit={loggingIn ? loginUser : signupUser}>
        <div>
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
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
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
