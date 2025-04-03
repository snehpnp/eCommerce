import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Auth/Login";
import Userroutes from "./routes/routes";
import AddProduct from "./pages/Admin/Addproduct";
import Signup from "./pages/Auth/SignUpPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import { jwtDecode } from "jwt-decode";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        let decoded = jwtDecode(token);

        if (decoded.exp && decoded.exp * 1000 < new Date().getTime()) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
       

          // Agar user restricted route par hai aur token valid hai toh home page bhejo
          if (
            ["/login", "/signup", "/forgotpassword"].includes(location.pathname)
          ) {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }else{
      // Agar token nahi hai toh login page par bhejo
      if (
        !["/login", "/signup", "/forgotpassword"].includes(location.pathname)
      ) {
        navigate("/login");
      }
    }
  }, [navigate, location]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/*" element={<Userroutes />} />
      <Route path="/addproduct" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
