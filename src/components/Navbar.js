import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Icons from "../components/Icons";
import Button from "../components/Button";
import Logo from "../image/logo-1.png";
import { links, categories } from "../data";

const Navbar = () => {
  //
  const location = useLocation();
  const showLogo =
    location.pathname === "/" ||
    location.pathname.includes("products") ||
    location.pathname.includes("search") ||
    location.pathname.includes("category");

  const [active, setActive] = useState(false);
  const handleOpen = () => {
    setActive(true);
  };
  const handleClose = () => {
    setActive(false);
  };

  ////// category
  // const categoryRef = useRef();
  // const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   const handleMovein = (event) => {
  //     if (!categoryRef.current) return;
  //     if (categoryRef.current.contains(event.target)) setIsOpen(true);
  //   };
  //   const handleMoveOut = (event) => {
  //     if (!categoryRef.current) return;
  //     if (categoryRef.current.contains(event.target)) setIsOpen(false);
  //   };
  //   document.addEventListener("mouseover", handleMovein);
  //   document.addEventListener("mouseout", handleMoveOut);
  //   return () => {
  //     document.removeEventListener("mouseover", handleMovein);
  //     document.removeEventListener("mouseout", handleMoveOut);
  //   };
  // }, []);

  const category = (
    // <ul className="absolute top-14 left-4 z-10 border p-2 shadow-md">
    // <ul
    //   className={`${
    //     isOpen ? `lg:inline-block` : `lg:hidden`
    //   } absolute top-9 left-0 lg:top-[1.6rem] lg:border lg:shadow-md w-full lg:w-[11.5rem] uppercase z-10 p-2`}
    // >
    <ul
      className={`absolute top-9 left-0 lg:top-[1.6rem] lg:hidden group-hover:inline-block lg:border lg:shadow-md w-full lg:w-[11.5rem] uppercase z-10 p-2`}
    >
      {categories.map((category) => (
        <li key={category.id} className="cursor-pointer w-full px-2 py-1.5 hover:bg-neutral-50 tracking-wider">
          <Link to={`/category/${category.label}`}>{category.label}</Link>
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

  /*
  const list1 =
    // <div className="flex mr-auto">
    links.map((link) => {
      if (link.label !== "Category") {
        return (
          <Link key={link.label} to={link.path} className="link">
            {link.label}
          </Link>
        );
      }
      return (
        <li key={link.label} ref={categoryRef} className="relative link">
          <div>{link.label}</div>
          {category}
        </li>
      );
    });
  // </div>
  */

  const cartItems = useSelector((state) => state.cart.cartItems);

  const inputClass =
    "cursor-pointer w-12 h-12 pl-12 z-10 bg-transparent transition-opacity focus:border focus:w-full focus:cursor-text focus:pl-4 focus:pr-11";
  const input = (
    <div>
      <input
        type="text"
        name="q"
        id="search"
        // className="peer cursor-pointer relative w-12 h-12 pl-12 z-10 bg-transparent rounded-md outline-none transition-opacity tracking-wide text-neutral-500
        //  border-neutral-300 focus:border focus:w-full focus:cursor-text focus:pl-4 focus:pr-11"
        // className="peer relative rounded-md tracking-wide text-neutral-500 border-neutral-300 border w-full h-12 cursor-text pl-4 pr-11"
        className={`peer relative rounded-md tracking-wide text-neutral-500 border-neutral-300 outline-none ${
          active ? `cursor-text w-full h-12 pl-4 pr-11 border` : inputClass
        } `}
        placeholder="Search"
      />
      <Icons.Search className="cursor-pointer absolute inset-y-0 my-auto right-0 peer-focus:fill-neutral-500 m-2" />
    </div>
  );

  const nav = (
    <nav className="relative px-6 py-4 flex justify-between items-center bg-white">
      <div className="lg:hidden" onClick={handleOpen}>
        <button className="navbar-burger cursor-pointer navbar-icon" title="Mobile Menu">
          <Icons.Menu />
        </button>
      </div>
      <ul className="hidden lg:flex lg:mr-auto lg:gap-x-5">{list}</ul>
      <form method="get" action="/search" className="hidden lg:block relative w-max">
        {input}
      </form>
      <Link to="/cart" className="navbar-icon transition duration-200 group relative">
        <Icons.Cart />
        {cartItems.length > 0 && <div className="navbar-icon-notification"></div>}
      </Link>
      <Link to="/" className="hidden lg:inline-block navbar-icon transition duration-200">
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
          <button className="navbar-close text-4xl font-thin text-neutral-300 cursor-pointer hover:text-neutral-500" onClick={handleClose}>
            &times;
          </button>
        </div>
        <form method="get" action="/search" className="relative mb-4">
          {input}
        </form>
        <div>
          <ul>{list}</ul>
        </div>
        <div className="mt-auto">
          <div className="pt-6">
            <Link href="#">
              <Button secondary className="w-full normal-case my-1.5 focus:outline-none">
                Sign In
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

  /*
  const nav__old = (
    <div className="flex items-center px-4">
      <div
        className="cursor-pointer navbar-icon"
        title="Mobile Menu"
      >
        <Icons.Menu />
      </div> 
      <div className="flex mr-auto">
        {links.map((link) => {
          if (link.label !== "Category") {
            return (
              <Link key={link.label} to={link.path} className="link">
                {link.label}
              </Link>
            );
          }
          return (
            <div key={link.label} ref={categoryRef} className="relative link">
              <div>{link.label}</div>
              {isOpen && category}
            </div>
          );
        })}
      </div>
      <form method="get" action="/search" className="relative w-max">
        <input
          type="text"
          name="q"
          id="search"
          className="peer cursor-pointer relative w-12 h-12 pl-12 z-10 bg-transparent rounded-md outline-none transition-opacity tracking-wide text-neutral-500
               border-neutral-300 focus:border focus:w-full focus:cursor-text focus:pl-4 focus:pr-11"
          placeholder="Search"
        />
        <Icons.Search className="cursor-pointer absolute inset-y-0 my-auto right-0 peer-focus:fill-neutral-500 m-2" />
      </form>
      <Link to="/cart" className="navbar-icon group relative">
        <Icons.Cart />
        {cartItems.length > 0 && <div className="navbar-icon-notification"></div>}
      </Link>
      <div className="navbar-icon">
        <Icons.User />
      </div>
    </div>
  );
  */

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
