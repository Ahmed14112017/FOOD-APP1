import React, { useContext } from 'react';
import { authcontext } from '../../../Authcontext/Authcontext';

export default function Navbar() {
    const {logindata}=useContext(authcontext)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
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
        <form className="d-flex ms-auto me-2 w-100" role="search">
  <div className="input-group">
    <span className="input-group-text" id="search-icon">
      <i className="fa-solid fa-magnifying-glass"></i>
    </span>
    <input
      type="search"
      className="form-control"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="search-icon"
    />
    
  </div>
</form>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                {logindata?.userName}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}