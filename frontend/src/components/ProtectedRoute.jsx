import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles = []
}) {

  // GET TOKEN
  const token = localStorage.getItem("token");

  // SAFE USER PARSE
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Corrupted localStorage user object");
    localStorage.clear();
  }

  // NOT LOGGED IN
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ROLE PROTECTION
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {

    // REDIRECT BASED ON ROLE
    switch (user.role) {

      case "Admin":
        return <Navigate to="/admin" replace />;

      case "Worker":
        return <Navigate to="/worker" replace />;

      default:
        return <Navigate to="/home" replace />;
    }
  }

  // ACCESS GRANTED
  return children;
}

export default ProtectedRoute;