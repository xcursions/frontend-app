import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const checkAuth = () => {
  let tokenIsValid: boolean;
  let authData: any;

  const token = Cookies.get("xcursions-token");
  const userData = localStorage.getItem("xcursions-user");

  if (token) {
    const parsedToken: any = jwtDecode(token);

    if (parsedToken) {
      if (parsedToken.exp * 1000 < Date.now()) {
        tokenIsValid = false;
        localStorage.removeItem("xcursions-token");
        localStorage.removeItem("xcursions-user");
      } else {
        tokenIsValid = true;
      }
    } else {
      tokenIsValid = false;
    }
  } else {
    tokenIsValid = false;
  }

  if (userData) {
    authData = JSON.parse(userData);
  }

  return {
    isAuthenticated: tokenIsValid && !!authData,
    authData,
  };
};
