import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Icons from "../components/Icons";
import Button from "../components/Button";
import Logo from "../image/logo.png";
import { links, categories } from "../data";

const Navbar = () => {
  // Cart Page, Notfound Page 不顯示 Logo
  const location = useLocation();
  let showLogo = location.pathname === "/";
  const matchPath = ["products/", "category/", "search"];
  for (let i = 0; i < matchPath.length; i++) {
    if (showLogo) break;
    let isMatch = location.pathname.includes(matchPath[i]);
    showLogo = !isMatch ? false : true;
  }

  const [active, setActive] = useState(false);
  const handleOpen = () => {
    setActive(true);
  };
  const handleClose = () => {
    setActive(false);
  };

  useEffect(() => {
    active && document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [active]);

  const category = (
    <ul
      className={`absolute top-9 left-0 lg:top-[1.6rem] bg-white lg:hidden group-hover:inline-block lg:border lg:shadow-md w-full lg:w-[11.5rem] uppercase z-10 p-2`}
    >
      {categories.map((category) => (
        <li key={category.id} className="cursor-pointer w-full px-2 py-1.5 hover:bg-neutral-50 tracking-wider">
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
        <li key={link.label} className="mb-1 lg:mb-0">
          <Link to={link.path} className="link">
            {link.label}
          </Link>
        </li>
      );
    }
    return (
      <li key={link.label} className="group mb-1 lg:mb-0 relative">
        <div className="category link">{link.label}</div>
        {category}
      </li>
    );
  });

  const cartItems = useSelector((state) => state.cart.cartItems);

  const inputClass =
    "cursor-pointer w-12 h-12 pl-12 z-10 bg-transparent transition-opacity focus:cursor-text focus:border focus:w-full focus:pl-4 focus:pr-11";
  const searchInput = (id) => {
    return (
      <div>
        <input
          type="text"
          name="q"
          id={id}
          className={`peer relative rounded-md tracking-wide text-neutral-500 border-neutral-300 outline-none placeholder:tracking-wide ${
            active ? `cursor-text w-full h-12 pl-4 pr-11 border focus:border-2` : inputClass
          } `}
          placeholder="Search"
        />
        <Icons.Search className="cursor-pointer absolute inset-y-0 my-auto right-0 peer-focus:fill-neutral-600 m-2" />
      </div>
    );
  };

  const nav = (
    <nav className="relative px-6 py-4 flex justify-between items-center bg-white">
      <div className="lg:hidden" onClick={handleOpen}>
        <button className="navbar-burger cursor-pointer navbar-icon" title="Mobile Menu">
          <Icons.Menu />
        </button>
      </div>
      <ul className="hidden lg:flex lg:mr-auto lg:gap-x-5">{list}</ul>
      <form method="get" action="/search" className="hidden lg:block relative w-max" id="search-product" name="search-product">
        {searchInput("nav_search")}
      </form>
      <Link to="/cart" className="navbar-icon transition duration-200 group relative">
        <Icons.Cart />
        {cartItems.length > 0 && <div className="navbar-icon-notification"></div>}
      </Link>
      <Link to="/account" className="hidden lg:inline-block navbar-icon transition duration-200">
        <Icons.User />
      </Link>
    </nav>
  );

  const sideNav = (
    <div className={`navbar-menu relative z-50 ${active ? `block` : `hidden`}`}>
      <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-20" onClick={handleClose}></div>
      <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-[70%] max-w-sm py-7 px-7 bg-white border-r overflow-y-auto">
        <div className="flex items-center mb-4">
          <Link to="/" className="mr-auto text-2xl font-bold leading-none">
            The No Name Yet
          </Link>
          <button
            className="cursor-pointer navbar-close text-4xl font-thin text-gray-300 hover:text-gray-500 outline-none focus:text-gray-500"
            onClick={handleClose}
          >
            &times;
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
              <Button secondary className="w-full normal-case my-1.5 focus:outline-none">
                Account
              </Button>
            </Link>
            <Link href="#">
              <Button primary className="w-full normal-case my-1.5 focus:outline-none">
                Sign Out
              </Button>
            </Link>
          </div>
          <p className="my-4 text-sm text-center text-neutral-400">The NoName Yet &copy; 2023</p>
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
          <img src={Logo} alt="還沒有名字" className="m-auto w-3/5  lg:w-auto" />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
