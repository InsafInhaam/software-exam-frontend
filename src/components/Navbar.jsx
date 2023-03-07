import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const history = useNavigate();
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* Container wrapper */}
        <div className="container">
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              {user && user.userType === 1 && (
                <li className="nav-item">
                <a className="nav-link" href="/approvepost">
                  Approve/Reject Post
                </a>
              </li>
              )}    
            </ul>
            {/* Left links */}
            <div className="d-flex align-items-center">
              <h5 className="pr-4">{user.name}</h5>
              <button
                type="button"
                className="btn btn-primary me-3"
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "LOGOUT" })
                  history("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>
      {/* Navbar */}
    </>
  );
};

export default Navbar;
