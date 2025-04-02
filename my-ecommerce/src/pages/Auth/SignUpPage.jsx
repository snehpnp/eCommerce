import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Logo from "../../assets/logo-removebg-preview.png"

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: localStorage.getItem("email") || "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    localStorage.setItem("email", formData.email);
  }, [formData.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up...", formData);
    navigate("/dashboard");
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
            src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0"
            className="img-fluid"
            style={{ maxHeight: "70vh", objectFit: "cover" }}
            alt="Sign Up Banner"
          />
        </div>
        <div className="col-md-6 bg-white p-5">
          <h3 className="pb-3">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group pb-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group pb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group pb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group pb-3">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="pb-2">
              <button
                type="submit"
                className="btn btn-dark w-100 font-weight-bold mt-2"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="sideline">OR</div>

          {/* Social Login Icons */}
          <div className="d-flex gap-3 justify-content-center">
            <i
              className="fa-brands fa-facebook"
              style={{ fontSize: "32px", color: "#4267B2" }}
            ></i>
            <i
              className="fa-brands fa-instagram"
              style={{ fontSize: "32px", color: "#C13584" }}
            ></i>
            <i
              className="fa-brands fa-snapchat"
              style={{ fontSize: "32px", color: "yellow" }}
            ></i>
            <i
              className="fa-brands fa-google"
              style={{ fontSize: "32px", color: "#DB4437" }}
            ></i>
          </div>

          <div className="pt-4 text-center">
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
