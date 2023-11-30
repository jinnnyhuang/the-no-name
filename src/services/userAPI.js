import Axios from "axios";
Axios.defaults.withCredentials = true;

// const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080/";
const config = {
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/",
};

export const updateUser = (id, update) => {
  return Axios.patch("user/update/" + id, { name: update.name, phone: update.phone }, config);
};

export const getUser = () => {
  return Axios.get("user", config);
  // return Axios.get(baseURL + "user", { withCredentials: true });
};
