import { Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Userroutes from "./routes/routes";
import AddProduct from "./pages/Admin/Addproduct";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Userroutes />} />
      <Route path="/addproduct" element={<AddProduct />} />
 

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
