import { Link } from "react-router-dom";

const CategoryMenu = ({ categories, onClose }) => {
  return (
    <ul
      // group hover 或 <Link> focus 時顯示 (使用 [&:has(:focus-visible)] 代替 focus-within)
      className={`nav-categories bg-white w-full p-2 uppercase hover-hover:group-hover:visually-hidden-focusable hover-hover:[&:has(:focus-visible)]:visually-hidden-focusable hover-hover:absolute hover-hover:top-[1.6rem] hover-hover:visually-hidden hover-hover:border hover-hover:shadow-md hover-hover:w-[11.5rem]`}
    >
      {categories &&
        categories.map((category) => (
          <li
            key={category._id}
            className="nav-categories-item cursor-pointer w-full px-2 py-1.5 hover-hover:hover:bg-neutral-50 tracking-wider transition-colors [&:has(:focus-visible)]:bg-neutral-50"
            onClick={onClose}
          >
            <Link to={`/category/${category.label}`} className="inline-block w-full focus-visible:shadow-none">
              {category.label}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default CategoryMenu;
