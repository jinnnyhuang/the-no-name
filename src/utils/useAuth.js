import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutUserMutation, logout, useLoginUserMutation, setCredentials } from "../store";
import Modal from "../components/Modal";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation(); // logoutUser()
  const [loginUser] = useLoginUserMutation(); // loginUser({ email, password })
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Modal

  const handleLogin = (email, password) => {
    loginUser({ email, password })
      .unwrap()
      .then((res) => {
        setError(null);
        dispatch(setCredentials({ ...res }));
      })
      .catch((err) => setError({ field: err.data?.field, message: err.data?.message }));
  };

  const handleLogout = () => {
    logoutUser().then(() => {
      dispatch(logout());
      navigate("/");
      setIsOpen(true);
    });
  };

  // Modal
  const modal = (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} action className="modal-content">
      <p className="text-lg">已登出</p>
    </Modal>
  );

  return { modal, error, setError, handleLogout, handleLogin };
};

export default useAuth;
