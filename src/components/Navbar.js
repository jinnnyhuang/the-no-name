import { useEffect, useState, useRef } from "react";
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
  const { isLogin } = useSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  // Cart, Account, Login, Signup, Notfound Page 不顯示 Logo
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
    await Axios.get(baseURL + "/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
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
  const handlePrimary = () => {
    handleClose();
    navigate("/account");
  };
  const handleSecondary = () => {
    handleClose();
    isLogin ? handleLogout() : navigate("/signup");
  };

  // tab
  const sideNavRef = useRef(null);
  useEffect(() => {
    if (!sideNavRef.current) return;
    if (active) {
      const sideNavElement = sideNavRef.current;
      const focusableElements = sideNavElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      // 側邊欄 Open 時 Focus First Element
      focusableElements.length > 0 && firstElement.focus();

      const handleTabKey = (event) => {
        if (event.keyCode === 9) {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };
      const handleEscKey = (event) => event.keyCode === 27 && setActive(false);

      document.body.classList.add("overflow-hidden");
      sideNavElement.addEventListener("keydown", handleTabKey);
      sideNavElement.addEventListener("keydown", handleEscKey);
      return () => {
        document.body.classList.remove("overflow-hidden");
        sideNavElement.removeEventListener("keydown", handleTabKey);
        sideNavElement.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [active, setActive]);

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

  const category = (
    <ul
      // group hover 或 <Link> focus 時顯示 (使用 [&:has(:focus-visible)] 代替 focus-within)
      className={`nav-categories bg-white w-full p-2 uppercase hover-hover:group-hover:visually-hidden-focusable hover-hover:[&:has(:focus-visible)]:visually-hidden-focusable hover-hover:absolute hover-hover:top-[1.6rem] hover-hover:visually-hidden hover-hover:border hover-hover:shadow-md hover-hover:w-[11.5rem]`}
    >
      {categories &&
        categories.map((category) => (
          <li
            key={category._id}
            className="nav-categories-item cursor-pointer w-full px-2 py-1.5 hover-hover:hover:bg-neutral-50 tracking-wider transition-colors [&:has(:focus-visible)]:bg-neutral-50"
            onClick={handleClose}
          >
            <Link to={`/category/${category.label}`} className="inline-block w-full focus-visible:shadow-none">
              {category.label}
            </Link>
          </li>
        ))}
    </ul>
  );

  const list = links.map((link) => {
    if (link.label !== "Category") {
      return (
        <li key={link.label} className="nav-item">
          <Link to={link.path} className="nav-link" onClick={handleClose}>
            {link.label}
          </Link>
        </li>
      );
    }
    return (
      <li key={link.label} className="nav-item group relative">
        <div className="nav-link">{link.label}</div>
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
  const inputNavbarClass =
    " absolute right-10.5 transition-all w-12 pl-1 pr-11 bg-transparent border-neutral-400 focus:px-4 hover:px-4 peer-hover:px-4 focus:border-b hover:border-b peer-hover:border-b focus:w-full hover:w-full peer-hover:w-full";
  const inputSideNavClass =
    " rounded-md w-full pl-4 pr-11 bg-neutral-100 placeholder:text-neutral-500 focus:bg-neutral-200 focus:text-neutral-600 focus:placeholder:text-neutral-600";
  const searchInput = (id) => {
    return (
      <div className={`search-bar h-12${active ? " w-full" : " w-[211.5px]"}`}>
        <button className="search-button peer absolute right-0 cursor-pointer rounded-md w-12 h-12" onClick={handleFormSubmit} tabIndex={-1}>
          <Icons.Search className={`mx-auto h-[1.7rem] w-[1.7rem] hover-hover:h-auto hover-hover:w-auto${active ? " fill-neutral-500" : ""}`} />
        </button>
        <input
          type="text"
          name="q"
          id={id}
          className={`cursor-text h-12 tracking-wide placeholder:tracking-wide text-neutral-500 outline-none${
            active ? inputSideNavClass : inputNavbarClass
          } `}
          placeholder="Search"
          onChange={handleChange}
        />
      </div>
    );
  };

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
      <ul className="navbar-list hidden hover-hover:flex hover-hover:mr-auto hover-hover:gap-x-5">{list}</ul>
      <form
        method="get"
        action="/search"
        className="navbar-search-form hidden hover-hover:block relative w-max"
        id="search-product"
        name="search-product"
      >
        {searchInput("navbar-search-input")}
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

  const sideNav = (
    <div className={`sidenav relative z-30${active ? ` block` : ` hidden`}`} ref={sideNavRef}>
      <div className="sidenav-backdrop fixed inset-0 bg-gray-800 opacity-20" onClick={handleClose}></div>
      <div className="sidenav-content fixed top-0 left-0 bottom-0 flex flex-col w-[70%] max-w-sm p-7 bg-white border-r overflow-y-auto">
        <h1 className="sidenav-logo mb-4 py-[5px]">
          <Link to="/" className="text-2xl font-bold leading-none hover-none:focus-visible:shadow-none" onClick={handleClose}>
            The No Name Yet
          </Link>
        </h1>
        <button className="sidenav-close close-button group p-[5px] absolute top-7 right-7" onClick={handleClose}>
          <Icons.Close className="close-button-icon" />
        </button>
        <form method="get" action="/search" className="sidenav-search-form relative mb-4">
          {searchInput("sidenav-search-input")}
        </form>
        <ul className="sidenav-list">{list}</ul>
        <div className="sidenav-bottom mt-auto">
          <div className="sidenav-buttons pt-6">
            <Button primary transition className="w-full normal-case my-1.5" onClick={handlePrimary}>
              {isLogin ? "會員專區" : "登入"}
            </Button>
            <Button secondary className="w-full normal-case my-1.5" onClick={handleSecondary}>
              {isLogin ? "登出" : "註冊"}
            </Button>
          </div>
          <p className="sidenav-copyright my-4 text-sm text-center text-neutral-400">The No Name Yet &copy; 2023</p>
        </div>
      </div>
    </div>
  );

  return (
    <header className="pt-navHeight [&:has(img)]:pb-navHeight">
      {nav}
      {sideNav}
      {showLogo && (
        <Link to="/" className="logo m-auto mt-0.5 block max-w-fit">
          <img src={Logo} alt="還沒有名字" className="m-auto w-3/5 lg:w-auto" />
        </Link>
      )}
    </header>
  );
};

export default Navbar;
