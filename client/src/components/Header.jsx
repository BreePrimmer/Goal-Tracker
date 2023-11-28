import { Link } from "react-router-dom";
import { AiFillTrophy } from 'react-icons/ai'
import Auth from "../utils/auth";

export default function Header() {

  const onLogoutClick = async () => {
    Auth.logout();
  }

  return (
    <header className="header-container">
      <Link to="/">
        <h1 id="title">Goal Tracker <AiFillTrophy id='trophy' /></h1>
        {/* <FontAwesomeIcon icon="fa-solid fa-trophy" /> */}
      </Link>

      <nav>
        <ul>
          {Auth.loggedIn() ? (
            <li id="logout" onClick={onLogoutClick} style={{cursor: 'pointer'}}>Logout</li>
          ) : (
            <li><Link to="/login" id='login'>Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
