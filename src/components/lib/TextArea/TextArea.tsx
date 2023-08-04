import type { FC } from "react";

import styles from "./TextArea.module.scss";
import type TextAreaProps from "./TextAreaProps";

const TextArea: FC<TextAreaProps> = ({
  startIcon,
  label,
  error,
  helperText,
  wrapperClass,
  containerClass,
  className,
  labelStyle,
  ...rest
}) => {
  return (
    <div className={`${styles.wrapper} ${wrapperClass || ""}`}>
      <div className="">
        {label && (
          <label className={`${styles.label} ${labelStyle || ""}`}>
            {label}{" "}
          </label>
        )}
        <div
          className={`${styles.container} ${
            error ? "border !border-red-600" : ""
          } ${containerClass || ""}`}
        >
          {startIcon && (
            <div className={`${styles.icon} ${styles.icon__start}`}>
              {startIcon}
            </div>
          )}
          <textarea
            className={`${styles.input} ${className || ""}`}
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

export default TextArea;
