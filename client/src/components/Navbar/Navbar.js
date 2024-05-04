import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const [isCookie, setIsCookie] = useState(false);
  useEffect(() => {
    const token = window.localStorage.getItem("userId");
    setIsCookie(!!token);
  }, []);
  const navigate = useNavigate();
  const deleteCookie = () => {
    const token = window.localStorage.setItem("userId", "");
    setIsCookie(!!token);
    navigate("/");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container">
          <a className="navbar-brand" href="#">
            Carpool
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {isCookie && (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <Link to="/book" className="nav-link book">Book a ride</Link>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={deleteCookie}>
                      Logout
                    </a>
                  </li>
                </ul>
              )}
              {!isCookie && (
                <li className="nav-item">
                <a className="nav-link" href="#">
                  <Link to="/auth" className="nav-link">Signup/Login</Link>
                </a>
              </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
