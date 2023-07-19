import "react-dropdown/style.css";

import type { FC } from "react";
import Dropdown from "react-dropdown";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import styles from "./Select.module.scss";
import type SelectProps from "./SelectProps";

const Select: FC<SelectProps> = ({
  startIcon,
  label,
  error,
  helperText,
  className,
  controlClassName,
  menuClassName,
  containerClass,
  showArrow,
  ...rest
}) => {
  return (
    <div>
      <div className="">
        {label && <label className={styles.label}>{label} </label>}

        <div className={`${styles.container} ${containerClass || ""}`}>
          {startIcon && (
            <div className={`${styles.icon} ml-3 rounded-lg bg-white`}>
              <img src={startIcon} alt="icon" className="" />
            </div>
          )}

          <Dropdown
            controlClassName={`${styles.input} ${
              error ? "border !bg-red-600" : ""
            } ${controlClassName || ""} `}
            className={`${styles.wrapper} ${className || ""}`}
            menuClassName={`${styles.menu} ${menuClassName || ""}`}
            arrowClosed={
              <MdKeyboardArrowDown
                className={`text-xl ${
                  showArrow ? "opacity-100" : "opacity-0"
                } `}
              />
            }
            arrowOpen={
              <MdKeyboardArrowUp
                className={`text-xl ${
                  showArrow ? "opacity-100" : "opacity-0"
                } `}
              />
            }
            {...rest}
          />
        </div>
      </div>

      {helperText && (
        <span
          className={`${styles.helper_text} ${error ? "text-red-600" : ""}`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Select;
