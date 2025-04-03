import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-removebg-preview.png"

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
      <div className="container" style={{ minHeight: "100vh",marginTop:"10vh" }}>
  
  <div className="text-center my-4">
      <img
        src={Logo}
        alt="Website Logo"
        style={{ maxWidth: "150px" }}
      />
    </div>

      <div className="row m-5 no-gutters shadow-lg">
        <div className="col-md-6 d-none d-md-block">
          <img
            src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
            className="img-fluid"
            style={{ maxHeight: "40vh", objectFit: "cover" ,width:"100%" }}
            alt="Forgot Password Banner"
          />
        </div>
        <div className="col-md-6 bg-white p-5">
          <h3 className="pb-3">Forgot Password</h3>
          <p>Enter your email to receive a password reset link.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group pb-3">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="pb-2">
              <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2">
                Reset Password
              </button>
            </div>
          </form>

          <div className="sideline">OR</div>

          <div className="pt-4 text-center">
            <p>
              Remembered your password?{" "}
              <a  onClick={() => navigate("/login")}>
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
