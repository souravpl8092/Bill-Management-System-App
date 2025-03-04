import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import Sidebar from "./components/Sidebar";
import CustomersTable from "./pages/CustomersTable";
import BillGenerator from "./pages/BillGenerator";
import Login from "./pages/Login";
import { logout } from "./redux/slices/authSlice";
import "./App.css";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const hideSidebarRoutes = ["/"];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app-container">
      {!hideSidebarRoutes.includes(location.pathname) && isAuthenticated && (
        <div className="sidebar">
          <Sidebar />
        </div>
      )}

      <div className="content-container">
        {/* Navbar */}
        <div className="navbar">
          <div className="navbar-brand"> Bill Management System</div>
          <div className="navbar-actions">
            {!hideSidebarRoutes.includes(location.pathname) &&
              isAuthenticated && (
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              )}
          </div>
        </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/customers"
              element={
                isAuthenticated ? <CustomersTable /> : <Navigate to="/" />
              }
            />
            <Route
              path="/bill-generator"
              element={
                isAuthenticated ? <BillGenerator /> : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
