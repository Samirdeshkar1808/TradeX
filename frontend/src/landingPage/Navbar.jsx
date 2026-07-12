import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
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
              <Link className="nav-link"  to={"/"}>Home</Link>
            </li>


            <li className="nav-item mx-2">
              <Link className="btn  px-4" style={{backgroundColor:"black" , color:"#7351D1" , borderColor:"grey"}} to={"/signup"}>SignUp</Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="btn px-4" style={{backgroundColor:"#7351D1" , color:"white" }} to={"/login"}>Login</Link>
            </li>
          </ul>
        </div> 
      </div>
    </nav>
  );
}
