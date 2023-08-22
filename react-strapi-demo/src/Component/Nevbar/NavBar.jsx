import React, { useState, useContext, useRef, useEffect } from "react";
import { Link ,NavLink} from "react-router-dom";
import { ContextApi } from "../Routs/ContextApi";
import {
  BsPersonFill,
  BsCart4,
  BsBoxArrowRight,
  BsBoxSeam,
} from "react-icons/bs";
import "./navbar.css"

const NavBar = () => {
  const { isLogin, setIsLogin } = useContext(ContextApi);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    const dropdownRef = useRef(null);
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    useEffect(() => {
      document.addEventListener("click", closeDropdown);
  
      return () => {
        document.removeEventListener("click", closeDropdown);
      };
    }, []);
  
    const handlelogot = () => {
      setIsLogin(false);
    };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ms-auto mb-2 mb-lg-0">
      <div className="container-fluid">
        <Link className="navbar-brand mx-4" to="/">
          Strapi Demo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link" aria-current="page" to="/product">
                Product
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2" ref={dropdownRef}>
            <div>
              <button
                className="btn btn-link nav-link"
                onClick={toggleDropdown}
              >
              
                  <img
                    src={process.env.PUBLIC_URL + "/images/account_thin.svg"}
                    alt="Profile Icon"
                    className="profile-icon profile-icon-i"
                  />
              </button>

              {isDropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-start show">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/profile"
                      onClick={toggleDropdown}
                    >
                      <BsPersonFill className="me-2" /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/cart"
                      onClick={toggleDropdown}
                    >
                      <BsCart4 className="me-2" /> Cart
                    </Link>
                  </li>

                  {isLogin && (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/order"
                          onClick={toggleDropdown}
                        >
                          <BsBoxSeam className="me-2" /> Order
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/"
                          onClick={handlelogot}
                        >
                          <BsBoxArrowRight className="me-2" /> Logout
                        </Link>
                      </li>
                    </>
                  )}
                  {!isLogin && (
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/login"
                        onClick={handlelogot}
                      >
                        <BsBoxArrowRight className="me-2" /> Login
                      </Link>
                    </li>
                  )}
                </ul>
              )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
