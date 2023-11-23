import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-container">
      <Link to="/">
        <h1 id="title">Goal Tracker</h1>
        {/* <FontAwesomeIcon icon="fa-solid fa-trophy" /> */}
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/login" id='login'>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
