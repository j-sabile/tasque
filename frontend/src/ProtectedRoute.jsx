import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth();
  const { logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <button style={{ alignSelf: "end" }} onClick={logout}>
        Log Out
      </button>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};
