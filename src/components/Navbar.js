import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icons from "../components/Icons";
import Button from "../components/Button";
import Logo from "../image/logo.png";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useFetchCartQuery } from "../store";
import useAuth from "../utils/useAuth";

const Navbar = () => {
  const [categories, setCategories] = useState(null);
  const [active, setActive] = useState(false);
  const [term, setTerm] = useState("");

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { modal, handleLogout } = useAuth();

  // Cart Page, Notfound Page 不顯示 Logo
  const location = useLocation();
  let showLogo = location.pathname === "/";
  const matchPath = ["products/", "category/", "search"];
  for (let i = 0; i < matchPath.length; i++) {
    if (showLogo) break;
    let isMatch = location.pathname.includes(matchPath[i]);
    showLogo = !isMatch ? false : true;
  }

  const links = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Category",
      path: "",
    },
  ];

  const getCategory = async () => {
    // const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080";
    await Axios.get(baseURL + "/category").then((res) => setCategories(res.data));
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleOpen = () => {
    setActive(true);
  };
  const handleClose = () => {
    active && setActive(false);
  };
  const handleClick = () => {
    handleClose();
    userInfo ? handleLogout() : navigate("/signup");
  };

  useEffect(() => {
    active && document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [active]);

  const category = (
    <ul
      className={`bg-white z-10 w-full p-2 uppercase group-hover:inline-block hover-hover:absolute hover-hover:top-[1.6rem] hover-hover:hidden hover-hover:border hover-hover:shadow-md hover-hover:w-[11.5rem]`}
    >
      {categories &&
        categories.map((category) => (
          <li
            key={category._id}
            className="cursor-pointer w-full px-2 py-1.5 hover:bg-neutral-50 tracking-wider transition-colors"
            onClick={handleClose}
          >
            <Link to={`/category/${category.label}`} className="inline-block w-full">
              {category.label}
            </Link>
          </li>
        ))}
    </ul>
  );

  const list = links.map((link) => {
    if (link.label !== "Category") {
      return (
        <li key={link.label} className="mb-1 hover-hover:mb-0">
          <Link to={link.path} className="link" onClick={handleClose}>
            {link.label}
          </Link>
        </li>
      );
    }
    return (
      <li key={link.label} className="group mb-1 hover-hover:mb-0 relative">
        <div className="category link">{link.label}</div>
        {category}
      </li>
    );
  });

  const handleFormSubmit = (event) => {
    !term && event.preventDefault();
  };
  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  // 20231121 fix search button not working
  const inputClass =
    "absolute right-10.5 transition-all w-12 pl-1 pr-11 bg-transparent border-neutral-400 focus:px-4 hover:px-4 peer-hover:px-4 focus:border-b hover:border-b peer-hover:border-b focus:w-full hover:w-full peer-hover:w-full";
  const searchInput = (id) => {
    return (
      <div className={`h-12 ${active ? "w-full" : "w-[211.5px]"}`}>
        <button className="peer absolute right-0 cursor-pointer rounded-md w-12 h-12" onClick={handleFormSubmit}>
          <Icons.Search className="mx-auto" />
        </button>
        <input
          type="text"
          name="q"
          id={id}
          className={`cursor-text h-12 tracking-wide placeholder:tracking-wide text-neutral-500 outline-none  ${
            active ? `rounded-md w-full pl-4 pr-11 border focus:border-2 border-neutral-300` : inputClass
          } `}
          placeholder="Search"
          onChange={handleChange}
        />
      </div>
    );
  };

  const { currentData, data, error, isFetching } = useFetchCartQuery(undefined, { skip: !userInfo });
  const cartItems = userInfo && !error ? (isFetching ? currentData || [] : data) : [];

  const logout = (
    <ul className={`hidden bg-white p-2 group-hover:inline-block hover:inline-block absolute top-12 right-0 border shadow-sm w-[8.5rem]`}>
      <li className="cursor-pointer px-2 py-1 hover:bg-neutral-50 tracking-wider transition-colors" onClick={handleLogout}>
        Log out
      </li>
    </ul>
  );

  const nav = (
    <nav className="relative px-6 py-4 flex justify-between items-center bg-white">
      <div className="hover-hover:hidden" onClick={handleOpen}>
        <button className="navbar-burger cursor-pointer navbar-icon" title="Mobile Menu">
          <Icons.Menu />
        </button>
      </div>
      <ul className="hidden hover-hover:flex hover-hover:mr-auto hover-hover:gap-x-5">{list}</ul>
      <form method="get" action="/search" className="hidden hover-hover:block relative w-max" id="search-product" name="search-product">
        {searchInput("nav_search")}
      </form>
      <Link to="/cart" className="navbar-icon transition duration-200 group relative mx-0.5">
        <Icons.Cart />
        {cartItems?.length > 0 && <div className="navbar-icon-notification"></div>}
      </Link>
      <div className="group hidden hover-hover:block relative">
        <Link to="/account" className="hidden hover-hover:block navbar-icon transition duration-200">
          <Icons.User />
        </Link>
        {userInfo && logout}
      </div>
    </nav>
  );

  const sideNav = (
    <div className={`navbar-menu relative z-50 ${active ? `block` : `hidden`}`}>
      <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-20" onClick={handleClose}></div>
      <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-[70%] max-w-sm py-7 px-7 bg-white border-r overflow-y-auto">
        <div className="flex items-center mb-4">
          <Link to="/" className="mr-auto text-2xl font-bold leading-none" onClick={handleClose}>
            The No Name Yet
          </Link>
          <button className="navbar-close outline-none" onClick={handleClose}>
            <Icons.Close className="fill-gray-300" />
          </button>
        </div>
        <form method="get" action="/search" className="relative mb-4">
          {searchInput("sideNav_search")}
        </form>
        <div>
          <ul>{list}</ul>
        </div>
        <div className="mt-auto">
          <div className="pt-6">
            <Link to="/account">
              <Button primary className="w-full normal-case my-1.5 focus:outline-none" onClick={handleClose}>
                {userInfo ? "Account" : "Log in"}
              </Button>
            </Link>
            <Button secondary className="w-full normal-case my-1.5 focus:outline-none" onClick={handleClick}>
              {userInfo ? "Log out" : "Sign up"}
            </Button>
          </div>
          <p className="my-4 text-sm text-center text-neutral-400">The No Name Yet &copy; 2023</p>
        </div>
      </nav>
    </div>
  );

  return (
    <div>
      {nav}
      {sideNav}
      {showLogo && (
        <Link to="/" className="m-auto mb-19 block max-w-fit">
          <img src={Logo} alt="還沒有名字" className="m-auto w-3/5 hover-hover:w-auto" />
        </Link>
      )}
      {modal}
    </div>
  );
};

export default Navbar;
