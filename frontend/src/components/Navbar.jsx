import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        Smart Waste
      </div>

      <div className="nav-links">

        <Link to="/home">
          Home
        </Link>

        <Link to="/report">
          Report Issue
        </Link>

        <Link to="/complaints">
          Complaints
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <Link to="/">
          Logout
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;