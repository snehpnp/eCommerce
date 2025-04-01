import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Bedcovers from "../pages/Tabs/Bedcovers";
import Fittedsheets from "../pages/Tabs/Fittedsheets";
import Pillowcases from "../pages/Tabs/Pillowcase";
import Sheetsets from "../pages/Tabs/Sheetsets";
import Flatsheets from "../pages/Tabs/Flatsheets";



function App() {
  return (
    <>
      <Navbar />

      <div className="main-content">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/bed-covers" element={<Bedcovers />} />
          <Route path="/fitted-sheets" element={<Fittedsheets />} />
          <Route path="/flat-sheets" element={<Flatsheets />} />
          <Route path="/pillow-cases" element={<Pillowcases />} />
          <Route path="/sheet-sets" element={<Sheetsets />} />


        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
