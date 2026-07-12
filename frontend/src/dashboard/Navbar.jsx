import { Link } from "react-router-dom";
import './Navbar.css'

import { useNavigate } from "react-router-dom";


export default function Navbar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

     localStorage.removeItem("token");
     localStorage.removeItem("user");

     navigate("/");
  };


  return (
    <nav className="navbar navbar-expand-lg bg-black border-bottom py-2 ">

      <div className="container-fluid">
       
        <Link className="navbar-brand d-flex align-items-center" to={"/"}>
          <img
            src="/images/logo.png"
            alt="TradeX"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
            }}
          />

          <span
            style={{
              fontSize: "30px",
              fontWeight: "700",
              marginLeft: "10px",
              color: "#7351D1",
            }}
          >
            TradeX
          </span>
        </Link>

        <div className="collapse navbar-collapse" id="navbar">


          <ul className="navbar-nav ms-auto">
          
            <li className="nav-item mx-2">
              <Link className="nav-link"  to={"/dashboard"}>Home</Link>
            </li>

           
            <li className="nav-item mx-2">
              <Link className="nav-link"  to={"/watchlist"} >Watchlist</Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link " to={"/holdings"}>Holdings</Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link" to={"/orders"}>Order</Link>
            </li>

           <li className="user-profile">
            <Link className="nav-link" to={"/about"}>Account</Link>
           </li>

            <li className="nav-item mx-2">
              <button className="btn  btn-sm mt-2 px-4 btn-danger" style={{ color:"white" }} onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div> 
      </div>
    </nav>
  );
}