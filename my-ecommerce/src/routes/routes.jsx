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
            path="/bedsheets"
            element={<Sheetsets path="bedsheets" />}
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

         
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
