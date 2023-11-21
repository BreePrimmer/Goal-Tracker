import { useState } from "react";

export default function Login() {
  const [loggingIn, setLoggingIn] = useState(true);
  return (
    <div>
      {loggingIn ? (
        <form>
          <label htmlFor="Username">Username:</label>
          <input type="text" name="Username" />
          <label htmlFor="Password">Password:</label>
          <input type="password" name="Password" />
          <button type="submit">Login</button>
        </form>
      ) : (
        <form>
          <label htmlFor="Username">Username:</label>
          <input type="text" name="Username" />
          <label htmlFor="Password">Password:</label>
          <input type="password" name="Password" />
          <button type="submit">Login</button>
        </form>
      )}
      <span>
        New to us?{" "}
        <span
          onClick={() => {
            setLoggingIn(false);
          }}>
          Sign up!
        </span>
      </span>
    </div>
  );
}
