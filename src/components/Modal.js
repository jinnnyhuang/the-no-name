import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Icons from "../components/Icons";
import Button from "../components/Button";

const Modal = ({ children, isOpen, setIsOpen, action, actionButton, className }) => {
  const classes = classNames(className, `z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-auto shadow-lg animate-fadeIn`);

  const onClose = () => setIsOpen(false);

  const modalRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      const modalElement = modalRef.current;
      // Modal 所有可聚焦的元素
      const focusableElements = modalElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      // Open 時 Focus Action Button
      focusableElements.length > 0 && lastElement.focus();

      const handleTabKey = (event) => {
        if (event.keyCode === 9) {
          // Shift+Tab: 目前聚焦元素為第一個可聚焦的元素時，Focus 最後一個可聚焦元素
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
            // Tab: 目前聚焦元素為最後一個可聚焦元素時，Focus 第一個可聚焦元素
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };
      const handleEscKey = (event) => event.keyCode === 27 && setIsOpen(false);

      document.body.classList.add("overflow-hidden");
      modalElement.addEventListener("keydown", handleTabKey);
      modalElement.addEventListener("keydown", handleEscKey);
      return () => {
        document.body.classList.remove("overflow-hidden");
        modalElement.removeEventListener("keydown", handleTabKey);
        modalElement.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [isOpen, setIsOpen]);

  const defaultActionButton = (
    <Button secondary transition className="action-button w-[9.7rem]" onClick={onClose}>
      OK
    </Button>
  );

  // createPortal: 將第一個參數新增到 html class modal-container
  // Fix 父元素設定定位
  return (
    isOpen &&
    ReactDOM.createPortal(
      <div ref={modalRef}>
        <div className="z-10 fixed inset-0 bg-black opacity-40" onClick={onClose}></div>
        <div className={classes}>
          {action && (
            <button onClick={onClose} className="close-button group p-[7px] absolute top-3 right-2.5" tabIndex={0}>
              <Icons.Close className="w-4.5 h-4.5 close-button-icon" />
            </button>
          )}
          <div className={`flex flex-col justify-center items-center ${action ? "mr-1" : ""}`}>
            {children}
            {action && <div className="mt-4.5">{actionButton ? actionButton : defaultActionButton}</div>}
          </div>
        </div>
      </div>,
      document.querySelector(".modal-container")
    )
  );
};

export default Modal;
