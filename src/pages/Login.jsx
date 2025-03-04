import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../styles/Login.css";

const defaultCredentials = {
  email: "admin@example.com",
  password: "admin12345",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 5) {
      setError("Password must be at least 5 characters long.");
      return;
    }

    dispatch(loginRequest());
    setTimeout(() => {
      if (
        email === defaultCredentials.email &&
        password === defaultCredentials.password
      ) {
        dispatch(loginSuccess({ email }));
        navigate("/bill-generator");
      } else {
        dispatch(loginFailure());
        setError("Invalid Credentials");
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <p className="login-info">
          <strong>Default Credentials:</strong> <br />
          Email: <span className="login-highlight">admin@example.com</span>{" "}
          <br />
          Password: <span className="login-highlight">admin12345</span>
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {error && <p className="error-text">{error}</p>}
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
