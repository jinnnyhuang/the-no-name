import { useState } from "react";
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
      <div key={index}>
        <div onClick={() => handleClick(index)} className="cursor-pointer flex items-center border-b border-black p-3">
          {item.heading}
          {icon}
        </div>
        {isExpanded && <div className="border-b border-black px-2 py-5 whitespace-pre-line">{item.content}</div>}
      </div>
    );
  });

  return <div className={className}>{renderedItems}</div>;
};

export default Accordion;
