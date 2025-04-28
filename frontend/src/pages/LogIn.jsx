import { useState } from "react";
import { useAuth } from "../AuthContext";

const LogIn = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isInLogIn, setIsInLogIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login, createAccount } = useAuth();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setError("");
      let response;
      if (isInLogIn) response = await login({ username, password });
      else response = await createAccount({ username, password, role });
      setError(response.error);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        {!isInLogIn && (
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "..." : isInLogIn ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <p>{`I ${isInLogIn ? "dont't" : ""} have an account.`}</p>
        <button onClick={() => setIsInLogIn(!isInLogIn)}>{isInLogIn ? "Create Account" : "Sign In"}</button>
      </div>
    </div>
  );
};

export default LogIn;
