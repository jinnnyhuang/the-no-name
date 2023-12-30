import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store";
import Icons from "../components/Icons";
import Button from "../components/Button";

// 若 Props 傳入 children，表示該 Modal 不由 redux 的 modalSlice 控制
const Modal = ({ children, isOpen, setIsOpen, action, className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.modal);
  const classes = classNames(className, `z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-auto shadow-lg animate-fadeIn`);

  const onClose = () => {
    setIsOpen && setIsOpen(false);
    dispatch(closeModal());
  };

  const modalRef = useRef(null);
  useEffect(() => {
    if (!modalRef.current) return;
    if (modal || isOpen) {
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
      const handleEscKey = (event) => {
        if (event.keyCode === 27) {
          setIsOpen && setIsOpen(false);
          dispatch(closeModal());
        }
      };

      document.body.classList.add("overflow-hidden");
      modalElement.addEventListener("keydown", handleTabKey);
      modalElement.addEventListener("keydown", handleEscKey);
      return () => {
        document.body.classList.remove("overflow-hidden");
        modalElement.removeEventListener("keydown", handleTabKey);
        modalElement.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [modal, dispatch, isOpen, setIsOpen]);

  const setActionButton = () => {
    const handleButton = (page) => {
      page && navigate(page);
      dispatch(closeModal());
    };
    switch (modal?.actionButton) {
      case "Login":
        return (
          <Button tertiary className="action-button w-80 mt-4.5" onClick={() => handleButton("/login")}>
            登入
          </Button>
        );
      case "Checkout":
        return (
          <Button tertiary transition className="action-button w-[9.7rem] mt-4.5" onClick={() => handleButton("/cart")}>
            Checkout
          </Button>
        );
      default:
        return (
          <Button secondary transition className="action-button w-[9.7rem] mt-4.5" onClick={() => handleButton()}>
            OK
          </Button>
        );
    }
  };

  const content = (
    <>
      <div className="flex flex-col items-center gap-2">
        <p className={modal?.description ? "text-xl font-medium" : "text-lg"}>{modal?.title}</p>
        {modal?.description && <p>{modal.description}</p>}
      </div>
      {action && setActionButton()}
    </>
  );

  // createPortal: 將第一個參數新增到 html class modal-container
  // Fix 父元素設定定位
  return (
    (modal || isOpen) &&
    ReactDOM.createPortal(
      <div ref={modalRef}>
        <div className="backdrop z-10 fixed inset-0 bg-black opacity-40" onClick={onClose}></div>
        <div className={classes}>
          {action && (
            <button onClick={onClose} className="close-button group p-[7px] absolute top-3 right-2.5" tabIndex={0}>
              <Icons.Close className="w-4.5 h-4.5 close-button-icon" />
            </button>
          )}
          <div className={`modal-content flex flex-col justify-center items-center${action ? " mr-1" : ""}`}>{children ? children : content}</div>
        </div>
      </div>,
      document.querySelector(".modal-container")
    )
  );
};

export default Modal;
