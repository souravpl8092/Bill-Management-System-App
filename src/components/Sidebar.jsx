import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaFileInvoice, FaBars } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-header">
        <FaBars className="menu-icon" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/bill-generator" className="sidebar-link">
            <FaFileInvoice className="sidebar-icon" />
            {isExpanded && <span>Bill Generator</span>}
          </Link>
        </li>
        <li>
          <Link to="/customers" className="sidebar-link">
            <FaUsers className="sidebar-icon" />
            {isExpanded && <span>Customers List</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
