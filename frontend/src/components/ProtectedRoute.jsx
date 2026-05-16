import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  // Get token

  const token = localStorage.getItem(
    "token"
  );

  // If token not found

  if (!token) {

    return <Navigate to="/" />;
  }

  // If token exists

  return children;
}

export default ProtectedRoute;