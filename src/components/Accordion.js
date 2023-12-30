import { useState, Fragment } from "react";
import Icons from "../components/Icons";

const Accordion = ({ items, className }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1); // 預設摺疊
  const handleClick = (nextIndex) => {
    nextIndex === expandedIndex ? setExpandedIndex(-1) : setExpandedIndex(nextIndex);
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;
    const icon = <span className="ml-auto">{isExpanded ? <Icons.Minus className="svg-icon" /> : <Icons.Plus className="svg-icon" />}</span>;

    return (
      <Fragment key={index}>
        <button
          onClick={() => handleClick(index)}
          className="w-full tracking-wider cursor-pointer flex items-center border-b border-primary focus-visible:border-transparent p-3"
        >
          {item.label}
          {icon}
        </button>
        {isExpanded && <div className="tracking-wider border-b border-primary px-2 py-5 whitespace-pre-line">{item.content}</div>}
      </Fragment>
    );
  });

  return <div className={className}>{renderedItems}</div>;
};

export default Accordion;
