import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Auth/Login";
import Userroutes from "./routes/routes";
import AddProduct from "./pages/Admin/Addproduct";
import Signup from "./pages/Auth/SignUpPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import { jwtDecode } from "jwt-decode";
import { CircularProgress, Box } from "@mui/material";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // loader state
  let token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuth = () => {
      if (token) {
        try {
          let decoded = jwtDecode(token);

          if (decoded.exp && decoded.exp * 1000 < new Date().getTime()) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            if (
              ["/login", "/signup", "/forgotpassword"].includes(
                location.pathname
              )
            ) {
              navigate("/");
            }
          }
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } else {
        if (
          !["/login", "/signup", "/forgotpassword"].includes(location.pathname)
        ) {
          navigate("/login");
        }
      }

      // After auth check done
      setLoading(false);
    };

    checkAuth();
  }, [navigate, location]);

  // Show loader until loading is false
  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
