import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css"

import Navbar from "./Navbar";

import api from "../services/baseUrl";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });

      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");

      toast.success("Login Successful");
    } catch (err) {
      console.log(err.response);

      toast.error(`${err.response.data.message}`);
    }
  };

  return (
    <>
      <Navbar/>

      <div className="login-container d-flex justify-content-center align-items-center vh-100">
        <div className="login-card p-4" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">Login</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Email</label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-100">Login</button>

            <p className="text-center mt-3 mb-0">
              Don't have an account?
              <Link to="/signup"> Create Account ! </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
