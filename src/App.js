import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Notfound from "./pages/Notfound";
import Product from "./pages/Product";
import Search from "./pages/Search";
import Category from "./pages/Category";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import useMediaQuery from "./utils/useMediaQuery";

function App() {
  // const bpMedium = useMediaQuery("(max-width: 48rem)");

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:id" element={<Product />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route exact path="/search" element={<Search />} />
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
