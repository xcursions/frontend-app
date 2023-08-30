/* eslint-disable no-nested-ternary */
import type { StylesConfig } from "react-select";

export interface Option {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const colourStyles: StylesConfig<Option, true> = {
  container: () => ({
    width: "100%",
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    width: "100%",
    border: "none",
    padding: ".4rem .5rem",
    fontSize: "0.875rem",
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#F2F4F7",
      border: "1px solid rgba(209, 213, 219, 0.3)",
      borderRadius: "0.375rem",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#554F4F",
    fontFamily: "DM Sans",
    fontSize: "0.875rem",
    minWidth: 70,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "rgba(75, 85, 99, 60%)",
    ":hover": {
      backgroundColor: "#0A83FF",
      color: "white",
      fontSize: "0.875rem",
    },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "rgba(75, 85, 99, 60%)",
  }),
};

export default colourStyles;
