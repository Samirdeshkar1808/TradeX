import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/baseUrl";
import Navbar from "./Navbar";
import "./signup.css"

import { toast } from "react-toastify";

export default function Signup() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // If already logged in, go to dashboard
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        }

    }, [navigate]);


    const handleSignup = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/signup", { fullName, email, password });

            localStorage.setItem("token", response.data.token);

            localStorage.setItem( "user", JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

            toast.success("SignUp Successfull");

        } catch (err) {

            console.log(err);

            toast.error("SignUp Failed");

        }

    };

    return (

        <>  
          <Navbar/>  

          <div className="signup-container d-flex justify-content-center align-items-center  vh-100">

            <div className="signup-card p-4 shadow" style={{ width: "420px" }}>

                <h2 className="text-center mb-4">Create Account</h2>

                <form onSubmit={handleSignup}>

                    <div className="mb-3">

                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        className="btn btn-primary w-100"
                        type="submit"
                    >
                        Sign Up
                    </button>

                </form>

                <p className="text-center mt-3 mb-0">
                    Already have an account? &nbsp;
                  
                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
        </>

        

    );

}