import { useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store";
import Icons from "../components/Icons";
import Button from "../components/Button";
import useTrapFocus from "../utils/useTrapFocus";

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
  useTrapFocus(modalRef, modal || isOpen, onClose, "last");

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
