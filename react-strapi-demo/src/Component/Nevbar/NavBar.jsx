import React ,{useContext} from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
import { ContextApi } from '../Routs/ContextApi';

const NavBar = () => {
  const {isLogin,setIsLogin}=useContext(ContextApi);

  const handlelogot=()=>{
    setIsLogin(false)
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Strapi Demo</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {isLogin ? <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={handlelogot}>Logout</Link>
        </li>:<li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>}
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default NavBar
