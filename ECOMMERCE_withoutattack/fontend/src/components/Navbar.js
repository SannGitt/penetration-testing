import React from 'react';
import './Navbar.css'; // Assuming you have a CSS file for styling

export default function Navbar() {
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/login'; // Redirect to login page
  };

  // Check if the user is logged in by looking for userData in localStorage
  const isLoggedIn = localStorage.getItem('userData');

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="/logo.png"
            alt=""
            width="70"
            height="70"
            className="d-inline-block align-text-centre"
          />
          AMEHA
        </a>
        {isLoggedIn && (
          <>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
            <button
              onClick={() => (window.location.href = '/change-password')}
              className="change-password-button"
            >
              Change Password
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
