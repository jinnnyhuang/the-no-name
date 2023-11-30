import { useState } from "react";
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
import { createUser, loginUser, logoutUser, getUserInfo } from "./services/authAPI";
import { updateUser } from "./services/userAPI";

function App() {
  const [currentUser, setCurrentUser] = useState(getUserInfo());

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      localStorage.removeItem("userInfo");
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogin = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      setCurrentUser(response.data.user);
      return response;
    } catch (err) {
      // console.log(err?.response?.data || err?.message); // error message
      // return err?.response?.data || err?.message;
      return err;
    }
  };
  const handleSignup = async (email, password, name, phone) => {
    try {
      const response = await createUser(email, password, name, phone);
      return response;
    } catch (err) {
      // console.log(err?.response?.data || err?.message); // error message
      // return err?.response?.data || err?.message;
      return err;
    }
  };
  const handleUpdateUser = async (id, update) => {
    try {
      const response = await updateUser(id, update);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      setCurrentUser(response.data.user);
      console.log(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(currentUser);

  return (
    <div>
      <BrowserRouter>
        <Navbar currentUser={currentUser} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/product-not-found" element={<ProductNotFound />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route exact path="/search" element={<Search />} />
          <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />
          <Route path="/login" element={<Login currentUser={currentUser} handleLogin={handleLogin} />} />
          <Route path="/account" element={<Account currentUser={currentUser} handleLogout={handleLogout} handleUpdateUser={handleUpdateUser} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
