import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutUserMutation, logout, useLoginUserMutation, setCredentials, openModal } from "../store";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation(); // logoutUser()
  const [loginUser] = useLoginUserMutation(); // loginUser({ email, password })
  const [error, setError] = useState(null);

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
      dispatch(openModal({ title: "已登出" }));
    });
  };

  return { error, setError, handleLogout, handleLogin };
};

export default useAuth;
