import { Link } from "react-router-dom";
import { AiFillTrophy } from 'react-icons/ai'

export default function Header() {
  return (
    <header className="header-container">
      <Link to="/">
        <h1 id="title">Goal Tracker <AiFillTrophy id='trophy' /></h1>
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
