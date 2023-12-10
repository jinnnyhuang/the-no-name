import { useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Icons from "../components/Icons";
import Button from "../components/Button";

const Modal = ({ children, onClose, action, actionButton, className }) => {
  const classes = classNames(className, `z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-auto shadow-lg animate-fadeIn`);
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

  const defaultActionButton = (
    <Button secondary transition className="action-button w-[9.7rem]" onClick={onClose}>
      OK
    </Button>
  );

  // createPortal: 將第一個參數新增到 html class modal-container
  // Fix 父元素設定定位
  return ReactDOM.createPortal(
    <div>
      <div className="z-10 fixed inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className={classes}>
        {action && (
          <div onClick={onClose} className="group cursor-pointer absolute top-3 right-2.5 rounded-full p-[7px] hover:bg-[#F2F2F2] transition">
            <Icons.Close className="w-4.5 h-4.5 fill-[#C8C8C8] group-hover:fill-neutral-400 transition" />
          </div>
        )}
        <div className={`flex flex-col justify-center items-center ${action ? "mr-1" : ""}`}>
          {children}
          {action && <div className="mt-4.5">{actionButton ? actionButton : defaultActionButton}</div>}
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
};

export default Modal;
