import { useState } from "react";
import Icons from "../components/Icons";

const Counter = ({ value, onChange }) => {
  const [counterValue, setCounterValue] = useState(1);

  const handleDecrement = () => {
    onChange && onChange(value, "decrease");
    setCounterValue(Number(counterValue) - 1);
  };
  const handleIncrement = () => {
    onChange && onChange(value, "increase");
    setCounterValue(Number(counterValue) + 1);
  };
  const handleChange = (event) => {
    onChange && onChange(value, "change", parseInt(event.target.value) || 1);
    setCounterValue(parseInt(event.target.value) || 1);
  };

  return (
    <div className="custom-number-input flex max-h-12 max-w-[3rem] min-w-[5rem] min-h-[2.15rem] border">
      <button className="decrement hover:bg-neutral-200" onClick={handleDecrement}>
        <Icons.Minus className="counter-icon" />
      </button>
      <input
        type="number"
        className="outline-none focus:outline-none text-center w-full text-neutral-500 hover:text-neutral-600 focus:text-neutral-600 cursor-default flex items-center"
        name="custom-input-number"
        onChange={handleChange}
        value={value ? value.quantity : counterValue}
      ></input>
      <button className="increment hover:bg-neutral-200" onClick={handleIncrement}>
        <Icons.Plus className="counter-icon" />
      </button>
    </div>
  );
};

export default Counter;
