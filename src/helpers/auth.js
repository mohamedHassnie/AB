import { setCookie, getCookie, deleteCookie } from "./cookies";
import {
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from "./localStorage";

export const setAuthentication = (token, user) => {
  setLocalStorage("token", token);
  setLocalStorage("user", user);
};

export const isAuthenticated = () => {
  if (getLocalStorage("token") && getLocalStorage("user")) {
    return getLocalStorage("user");
  } else {
    return false;
  }
};

export const logout = () => {
  deleteLocalStorage("token");
  deleteLocalStorage("user");
};
