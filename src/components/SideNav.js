import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "../components/NavLinks";
import SearchInput from "../components/SearchInput";
import Icons from "../components/Icons";
import Button from "../components/Button";
import useTrapFocus from "../utils/useTrapFocus";

const SideNav = ({ active, links, isLogin, onClose, onLogout }) => {
  const navigate = useNavigate();
  const handlePrimary = () => {
    onClose();
    navigate("/account");
  };
  const handleSecondary = () => {
    onClose();
    isLogin ? onLogout() : navigate("/signup");
  };

  const sideNavRef = useRef(null);
  useTrapFocus(sideNavRef, active, onClose);

  const SIDENAV_LOGO_FOCUS =
    "relative hover-none:focus-visible:shadow-none after:absolute after:bg-gray-800 after:h-0.5 after:w-0 hover-none:focus-visible:after:w-full after:bottom-0 after:left-0 after:transition-all after:duration-500 ";
  return (
    <div className={`sidenav relative z-30${active ? ` block` : ` hidden`}`} ref={sideNavRef}>
      <div className="sidenav-backdrop fixed inset-0 bg-gray-800 opacity-20" onClick={onClose}></div>
      <div className="sidenav-content fixed top-0 left-0 bottom-0 flex flex-col w-[70%] max-w-sm p-7 bg-white border-r overflow-y-auto">
        <h1 className="sidenav-logo mb-4 py-[5px]">
          <Link to="/" className={`${SIDENAV_LOGO_FOCUS}text-2xl font-bold leading-none`} onClick={onClose}>
            The No Name Yet
          </Link>
        </h1>
        <button className="sidenav-close close-button group p-[5px] absolute top-7 right-7" onClick={onClose}>
          <Icons.Close className="close-button-icon" />
        </button>
        <form method="get" action="/search" className="sidenav-search-form relative mb-4" id="sidenav-search-form">
          <SearchInput id="sidenav-search-input" active={active} />
        </form>
        <ul className="sidenav-list">
          <NavLinks links={links} onClose={onClose} />
        </ul>
        <div className="sidenav-bottom mt-auto">
          <div className="sidenav-buttons pt-6">
            <Button primary transition className="w-full normal-case my-1.5" onClick={handlePrimary}>
              {isLogin ? "會員專區" : "登入"}
            </Button>
            <Button secondary className="w-full normal-case my-1.5" onClick={handleSecondary}>
              {isLogin ? "登出" : "註冊"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
