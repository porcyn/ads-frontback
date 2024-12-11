import React from "react";
import './style.css';
import lgtraffy from './assets/lgtraffy.png';

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={lgtraffy} alt="ADS TRAFFY Logo" className="lg-traffy-logo2" />
        </div>
      </nav>

      {/* Content Section */}
      <div className="dashboard-content">
        <div className="dashboard-box">Box 1</div>
        <div className="dashboard-box">Box 2</div>
        <div className="dashboard-box">Box 3</div>
      </div>
    </div>
  );
}

export default Dashboard;
