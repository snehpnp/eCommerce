import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sheetsets from "../pages/Tabs/Sheetsets";

import Products from "../pages/Admin/Main";

import Cart from "../pages/Tabs/Cart";

function App() {
  return (
    <>
      <Navbar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/bedsheet-sets"
            element={<Sheetsets path="bedsheet-sets" />}
          />
          <Route
            path="/pillow-covers"
            element={<Sheetsets path="pillow-covers" />}
          />
          <Route
            path="/flat-sheets"
            element={<Sheetsets path="flat-sheets" />}
          />
          <Route
            path="/blanket-covers"
            element={<Sheetsets path="blanket-covers" />}
          />
          <Route
            path="/mattress-protectors"
            element={<Sheetsets path="mattress-protectors" />}
          />
          <Route
            path="/duvet-covers"
            element={<Sheetsets path="duvet-covers" />}
          />

          <Route path="/admin/*" element={<Products />} />

          {/* <Route path="/admin/add-product" element={<AddProduct />} />

          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/dashboard" element={<Dashboard />} /> */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
