import { useState, useEffect } from "react";
import Icons from "../components/Icons";

const Counter = ({ value, onChange, isLoading, isUpdated }) => {
  const [counterValue, setCounterValue] = useState(value.quantity);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // 已成功執行 onChange，並且已重新取得 item
    isUpdated && setCounterValue(value.quantity);
  }, [isUpdated, value]);

  const handleDecrement = () => {
    // isLoading: 確認是否正在執行 onChange
    !isLoading && onChange(value, "decrease");
    setCounterValue(Number(counterValue) - 1);
  };
  const handleIncrement = () => {
    value.productId.stock > value.quantity && !isLoading && onChange(value, "increase");
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
    <div className="custom-number-input flex max-h-12 max-w-[3rem] min-w-[5rem] min-h-[2.15rem] border border-gray-200">
      <button className="decrement transition-colors hover:bg-neutral-200" onClick={handleDecrement}>
        <Icons.Minus className={isLoading ? "loading-counter-icon" : "counter-icon"} />
      </button>
      <input
        type="number"
        className={`cursor-default outline-none focus:outline-none text-center w-full flex items-center transition-colors duration-300 ${
          isLoading ? "text-gray-200" : "text-neutral-500 hover:text-neutral-600 focus:text-neutral-600"
        }`}
        name="custom-input-number"
        onChange={handleChange}
        // defaultValue={value.quantity}
        // key={value.productId._id + value.quantity}
        value={counterValue}
        readOnly={isLoading}
      ></input>
      <button
        className={`decrement transition-colors ${value.productId.stock <= value.quantity || isLoading ? "" : "hover:bg-neutral-200"}`}
        onClick={handleIncrement}
      >
        <Icons.Plus className={value.productId.stock <= value.quantity || isLoading ? "loading-counter-icon" : "counter-icon"} />
      </button>
    </div>
  );
};

export default Counter;
