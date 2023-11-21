import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-container">
      <Link to="/">
        <h1 className="title">Goal Tracker</h1>
        {/* <FontAwesomeIcon icon="fa-solid fa-trophy" /> */}
      </Link>

      <nav>
        <ul>
          <li className="login">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
