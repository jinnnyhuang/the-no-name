import Axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080/";

export const loginUser = (email, password) => {
  return Axios.post(baseURL + "auth/login", { email, password }, { withCredentials: true });
  // return await Axios.post(baseURL + "user/login", { email, password });
};

export const logoutUser = () => {
  return Axios.post(baseURL + "auth/logout");
};

export const createUser = (email, password, name, phone) => {
  return Axios.post(baseURL + "auth/signup", {
    email,
    password,
    name,
    phone,
  });
};
