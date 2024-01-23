import { useState } from "react";
import Icons from "../components/Icons";

const SearchInput = ({ id, active }) => {
  const [term, setTerm] = useState("");
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

export default SearchInput;
