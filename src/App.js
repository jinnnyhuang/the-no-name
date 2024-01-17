import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Notfound from "./pages/Notfound";
import ProductNotFound from "./pages/ProductNotFound";
import Product from "./pages/Product";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Category from "./pages/Category";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // Fix Safari/iOS textbox auto zoom
  useEffect(() => {
    if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") <= -1) {
      document.querySelector("[name=viewport]").setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/product-not-found" element={<ProductNotFound />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route exact path="/search" element={<Search />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Modal className="modal-action" action />
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
