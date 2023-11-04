import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Notfound from "./pages/Notfound";
import Product from "./pages/Product";
import Search from "./pages/Search";
import Account from "./pages/Account";
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
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route exact path="/search" element={<Search />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
