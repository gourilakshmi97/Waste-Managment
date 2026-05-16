import { Link, useLocation } from "react-router-dom"

import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaHardHat
} from "react-icons/fa"

const Sidebar = () => {

  const location = useLocation()

  return (
    <aside className="w-64 bg-gradient-to-b from-emerald-700 to-green-900 text-white p-5">

      {/* Logo */}
      <h1 className="text-3xl font-bold mb-10">
        CleanCity
      </h1>

      {/* Navigation */}
      <nav>

        <ul className="space-y-2">

          {/* Dashboard */}
          <Link to="/">
            <li
              className={`p-3 rounded-xl cursor-pointer transition font-medium ${
                location.pathname === "/"
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaTachometerAlt />
                Dashboard
              </div>
            </li>
          </Link>

          {/* Complaints */}
          <Link to="/complaints">
            <li
              className={`p-3 rounded-xl cursor-pointer transition ${
                location.pathname === "/complaints"
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaClipboardList />
                Complaints
              </div>
            </li>
          </Link>

          {/* Users */}
          <Link to="/users">
            <li
              className={`p-3 rounded-xl cursor-pointer transition ${
                location.pathname === "/users"
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaUsers />
                Users
              </div>
            </li>
          </Link>

          {/* Workers */}
          <Link to="/workers">
            <li
              className={`p-3 rounded-xl cursor-pointer transition ${
                location.pathname === "/workers"
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaHardHat />
                Workers
              </div>
            </li>
          </Link>

        </ul>

      </nav>

    </aside>
  )
}

export default Sidebar