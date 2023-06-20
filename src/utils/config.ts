import type { DefaultToastOptions } from "react-hot-toast";

export const toastOptions: DefaultToastOptions = {
  className: "z-40",
  success: {
    iconTheme: {
      primary: "white",
      secondary: "green",
    },
    style: {
      background: "green",
      color: "white",
    },
  },
  error: {
    iconTheme: {
      primary: "white",
      secondary: "red",
    },
    style: {
      background: "red",
      color: "white",
    },
  },
};
