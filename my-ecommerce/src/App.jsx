import { Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Userroutes from "./routes/routes";
import AddProduct from "./pages/Admin/Addproduct";
import Signup from "./pages/Auth/SignUpPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";

function App() {
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
