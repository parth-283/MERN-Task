import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  let token = localStorage.getItem("login-token");

  const HandleLogOut = async () => {
    localStorage.setItem("login-token", "");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg   navbar-dark bg-primary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <h4>
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </h4>
              </li>
            </ul>
            <form className="d-flex">
              {!token ? (
                <div>
                  <Link className="btn btn-secondary me-2" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-secondary" to="/registration">
                    registration
                  </Link>
                </div>
              ) : (
                <div>
                  <Link
                    className="btn btn-secondary me-2"
                    to="/login"
                    onClick={() => HandleLogOut()}
                  >
                    LogOut
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navigation;
