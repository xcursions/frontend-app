"use client";

import type { FC } from "react";
import { useState } from "react";
import { BsCalendar2Event, BsClock, BsSearch } from "react-icons/bs";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import styles from "./Input.module.scss";
import type InputProps from "./InputProps";

const Input: FC<InputProps> = ({
  startIcon,
  icon,
  endIcon,
  label,
  error,
  errorMsg,
  type = "text",
  helperText,
  register,
  wrapperClass,
  containerClass,
  className,
  ...rest
}) => {
  const [visible, setVisible] = useState(type !== "password");
  const inputType = type === "password" ? "text" : type;

  return (
    <div className={`${styles.wrapper} ${wrapperClass || ""}`}>
      <div className="">
        {label && <label className={styles.label}>{label} </label>}
        <div
          className={`${styles.container} ${containerClass || "rounded-2xl"} ${
            error || errorMsg ? "border !border-red-600" : ""
          } ${containerClass || ""}`}
        >
          {startIcon && (
            <div
              className={`${styles.icon} ${styles.icon__start} ml-3 rounded-lg bg-white`}
            >
              <BsSearch className={`text-xl font-extrabold`} />
            </div>
          )}
          {icon && (
            <div className={`${styles.icon} ml-3 rounded-lg bg-white`}>
              <img src={icon} alt="icon" className="" />
            </div>
          )}
          <input
            className={`${styles.input} ${className || ""}`}
            {...register}
            {...{
              type: visible ? inputType : "password",
              ...rest,
            }}
          />

          {/* These icons (with some css) replace the default html date and time
          input icons and */}
          {/* // Icons */}
          {(type === "date" || type === "datetime-local") && (
            <div className={styles.date_icon}>
              <BsCalendar2Event />
            </div>
          )}
          {type === "time" && (
            <div className={styles.date_icon}>
              <BsClock />
            </div>
          )}
          {/* // */}

          {endIcon && (
            <div className={`${styles.icon} ${styles.icon__end}`}>
              {endIcon}
            </div>
          )}
          {type === "password" && (
            <div
              className={styles.password_toggle}
              role="button"
              onClick={() => setVisible((prevState) => !prevState)}
            >
              {visible ? (
                <MdOutlineVisibilityOff size={20} className="text-gray-700" />
              ) : (
                <MdOutlineVisibility size={20} className="text-gray-700" />
              )}
            </div>
          )}
        </div>
      </div>

      {helperText || errorMsg ? (
        <span
          className={`${styles.helper_text} ${
            error || errorMsg ? "text-red-600" : ""
          }`}
        >
          {helperText} {errorMsg}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
