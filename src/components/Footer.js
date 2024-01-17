import Icons from "../components/Icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container m-auto pt-32 pb-20 h-footerHeight">
      <div className="flex gap-x-2.5 justify-center mb-4">
        <Link to="#" className="group focus-visible:shadow-none">
          <Icons.Facebook className="cursor-pointer fill-neutral-400 hover:fill-neutral-500 group-focus:fill-neutral-700 transition-colors" />
        </Link>
        <Link to="https://www.instagram.com/111.duck/" target="_blank" rel="noreferrer" className="group focus-visible:shadow-none">
          <Icons.Instagram className="cursor-pointer fill-neutral-400 hover:fill-neutral-500 group-focus:fill-neutral-700 transition-colors" />
        </Link>
      </div>
      <div className="text-center text-sm text-neutral-400">Copyright &copy; 2023 Jinny Huang</div>
    </footer>
  );
};

export default Footer;
