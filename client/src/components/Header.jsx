import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-container">
      <Link to="/">
        <h1 className="title">Goal Tracker</h1>
      </Link>

      <nav>
        <ul>
          <li className="login">Login</li>
        </ul>
      </nav>
    </header>
  );
}
