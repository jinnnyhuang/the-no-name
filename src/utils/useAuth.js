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
      .then(() => {
        setError(null);
        dispatch(setCredentials());
      })
      .catch((err) => setError({ field: err.data?.field, message: err.data?.message }));
  };

  const handleGoogleLogin = () => {
    window.open(
      `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/auth/login/google`,
      "mywindow",
      "location=1, status=1, scrollbars=1, width=800, height=800"
    );
    window.addEventListener("message", (message) => {
      message.data.code === 200 && dispatch(setCredentials());
    });
  };

  const handleLogout = () => {
    logoutUser().then(() => {
      dispatch(logout());
      navigate("/");
      dispatch(openModal({ title: "已登出" }));
    });
  };

  return { error, setError, handleLogout, handleLogin, handleGoogleLogin };
};

export default useAuth;
