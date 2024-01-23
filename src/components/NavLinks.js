import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import CategoryMenu from "../components/CategoryMenu";

const NavLinks = ({ links, onClose }) => {
  const [categories, setCategories] = useState(null);
  const getCategory = async () => {
    try {
      const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080";
      const res = await Axios.get(baseURL + "/category");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      {links.map((link) => (
        <li key={link.label} className={`nav-item${link.label === "Category" ? " group relative" : ""}`}>
          {link.label !== "Category" ? (
            <Link to={link.path} className="nav-link" onClick={onClose}>
              {link.label}
            </Link>
          ) : (
            <>
              <div className="nav-link">{link.label}</div>
              <CategoryMenu categories={categories} onClose={onClose} />
            </>
          )}
        </li>
      ))}
    </>
  );
};

export default NavLinks;
