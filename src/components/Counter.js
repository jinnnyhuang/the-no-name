import { useState } from "react";
import Icons from "../components/Icons";

const Counter = ({ value, onChange }) => {
  const [counterValue, setCounterValue] = useState(value.quantity);
  const [timer, setTimer] = useState(null);

  const handleDecrement = () => {
    onChange(value, "decrease");
    setCounterValue(Number(counterValue) - 1);
  };
  const handleIncrement = () => {
    onChange(value, "increase");
    setCounterValue(Number(counterValue) + 1);
  };
  const handleChange = (event) => {
    setCounterValue(() => parseInt(event.target.value) || 1);
    setCounterValue((prevCounterValue) => {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        onChange(value, "change", prevCounterValue);
      }, 600);
      setTimer(newTimer);

      return prevCounterValue;
    });
  };

  return (
    <div className="custom-number-input flex max-h-12 max-w-[3rem] min-w-[5rem] min-h-[2.15rem] border">
      <button className="decrement transition-colors hover:bg-neutral-200" onClick={handleDecrement}>
        <Icons.Minus className="counter-icon" />
      </button>
      <input
        type="number"
        className="cursor-default outline-none focus:outline-none text-center w-full text-neutral-500 hover:text-neutral-600 focus:text-neutral-600 flex items-center"
        name="custom-input-number"
        onChange={handleChange}
        defaultValue={value.quantity}
        key={value._id + value.quantity}
      ></input>
      <button className="increment transition-colors hover:bg-neutral-200" onClick={handleIncrement}>
        <Icons.Plus className="counter-icon" />
      </button>
    </div>
  );
};

export default Counter;
