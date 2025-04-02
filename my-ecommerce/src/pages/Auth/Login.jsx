import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Logo from "../../assets/logo-removebg-preview.png";

const AuthPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email") || "",
    password: "",
  });

  useEffect(() => {
    localStorage.setItem("email", formData.email);
  }, [formData.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in...");
    navigate("/dashboard");
  };

  return (
    <div
      className="container"
      style={{ minHeight: "100vh", marginTop: "10vh" }}
    >
      <div className="text-center my-4">
        <img src={Logo} alt="Website Logo" style={{ maxWidth: "150px" }} />
      </div>

      <div className="row m-5 no-gutters shadow-lg">
        <div className="col-md-6 d-none d-md-block">
          <img
            src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
            className="img-fluid"
            style={{ maxHeight: "40vh", objectFit: "cover", width: "100%" }}
            alt="Auth Banner"
          />
        </div>
        <div className="col-md-6 bg-white p-5">
          <h3 className="pb-3">Login</h3>
          <form onSubmit={handleSubmit}>
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
            <div className="d-flex justify-content-between pb-2">
              <a onClick={() => navigate("/forgotpassword")}>
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="btn btn-dark w-100 font-weight-bold mt-2"
            >
              Login
            </button>
          </form>

          <div className="sideline">OR</div>
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
              style={{ fontSize: "32px", color: "#FFFC00" }}
            ></i>
            <i
              className="fa-brands fa-google"
              style={{ fontSize: "32px", color: "#DB4437" }}
            ></i>
          </div>
          <div className="pt-4 text-center">
            New here? <a onClick={() => navigate("/signup")}>Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
