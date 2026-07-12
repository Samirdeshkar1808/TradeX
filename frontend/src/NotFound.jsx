import { Link } from "react-router-dom";
import Navbar from "./landingPage/Navbar";

export default function NotFound() {
  return (
    <div className="notfound">
      
       <Navbar/>

      <div className="container d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="fw-bold text-primary">404</h1>

          <h3>Oops! Page Not Found</h3>

          <p style={{ color: "white" }}>
            The page you are looking for doesn't exist.
          </p>

          <Link to="/" className="btn btn-primary mt-3">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
