import { useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

const Modal = ({ children, onClose, actionBar, className }) => {
  const classes = classNames(className, "z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-auto");

  useEffect(() => {
    const handler = (event) => {
      event.keyCode === 27 && onClose(); // Esc
    };
    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", handler);
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.addEventListener("keydown", handler);
    };
  }, [onClose]);

  // createPortal: 將第一個參數新增到 html class modal-container
  // Fix 父元素設定定位

  return ReactDOM.createPortal(
    <div>
      {onClose && <div className="z-10 fixed inset-0 bg-black opacity-20" onClick={onClose}></div>}
      <div className={classes}>
        {onClose && (
          <div onClick={onClose} className="absolute top-3 right-5 text-xl cursor-pointer">
            &times;
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          {children}
          {actionBar && actionBar}
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
};

export default Modal;
