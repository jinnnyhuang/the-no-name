import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import NavLinks from "../components/NavLinks";
import SearchInput from "../components/SearchInput";
import SideNav from "../components/SideNav";
import Icons from "../components/Icons";
import Logo from "../image/logo.png";
import { useSelector } from "react-redux";
import { useFetchCartQuery } from "../store";
import useAuth from "../utils/useAuth";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const { isLogin } = useSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  // Cart, Account, Login, Signup, Notfound Page 不顯示 Logo
  const { pathname } = useLocation();
  const matchPath = ["products/", "category/", "search"];
  const showLogo = pathname === "/" || matchPath.some((path) => pathname.includes(path));

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

  const handleOpen = () => {
    setActive(true);
  };
  const handleClose = () => {
    active && setActive(false);
  };

  // nav 滾動時增加陰影
  const navRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      window.scrollY > 0 ? navRef.current.classList.add("shadow-md") : navRef.current.classList.remove("shadow-md");
    };
    // passive 設為 true: 告訴瀏覽器不會呼叫 preventDefault();
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll, { passive: true });
  }, []);

  const { currentData, data, error, isFetching } = useFetchCartQuery(undefined, { skip: !isLogin });
  const cartItems = isLogin && !error ? (isFetching ? currentData || [] : data) : [];

  const logout = (
    <div
      className={`navbar-logout bg-white p-2 visually-hidden group-hover:visually-hidden-focusable [&:has(:focus-visible)]:visually-hidden-focusable absolute top-12 right-0 border shadow-sm w-[8.5rem]`}
    >
      <button
        className="cursor-pointer px-2 py-1 w-full text-left hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:shadow-none tracking-wider transition-colors"
        onClick={handleLogout}
      >
        登出
      </button>
    </div>
  );

  const nav = (
    <nav className="z-10 h-navHeight w-full fixed top-0 px-6 py-4 flex justify-between items-center bg-white" ref={navRef}>
      <ul className="navbar-list hidden hover-hover:flex hover-hover:mr-auto hover-hover:gap-x-5">
        <NavLinks links={links} onClose={handleClose} />
      </ul>
      <form method="get" action="/search" className="navbar-search-form hidden hover-hover:block relative w-max" id="navbar-search-form">
        <SearchInput id="navbar-search-input" active={active} />
      </form>
      <div className="nav-cart">
        <Link to="/cart" className="nav-icon block transition duration-200 group relative mx-0.5">
          <Icons.Cart />
          {cartItems?.length > 0 && <div className="nav-icon-notification"></div>}
        </Link>
      </div>
      <div className="navbar-account group hidden hover-hover:block relative">
        <Link to="/account" className="nav-icon hidden hover-hover:block transition duration-200">
          <Icons.User />
        </Link>
        {isLogin && logout}
      </div>
      <div className="sidenav-button hover-hover:hidden order-first" onClick={handleOpen}>
        <button className="cursor-pointer nav-icon" title="Mobile Menu">
          <Icons.Menu />
        </button>
      </div>
    </nav>
  );

  return (
    <header className="pt-navHeight [&:has(img)]:pb-navHeight">
      {nav}
      <SideNav active={active} setActive={setActive} links={links} isLogin={isLogin} onClose={handleClose} onLogout={handleLogout} />
      {showLogo && (
        <Link to="/" className="logo m-auto mt-0.5 block max-w-fit">
          <img src={Logo} alt="還沒有名字" className="m-auto w-3/5 lg:w-auto" />
        </Link>
      )}
    </header>
  );
};

export default Navbar;
